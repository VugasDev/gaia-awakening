#!/usr/bin/env python3
"""CurseForge availability check for all Modrinth-sourced mods.

Evaluates whether the pack could be released on CurseForge: for each Modrinth
mod it queries the CurseForge API (filtered to MODS only, MC version and
NeoForge) and reports whether a compatible file exists.

API key: read from env CF_API_KEY, else from ~/.config/curseforge/api-key.
The key is NEVER written to the repo (CLAUDE.md: keine Secrets im Repo).

Usage:
  CF_API_KEY=... python3 tools/cf_availability_check.py [--limit N]
Report: ai-workflows/outputs/cf-availability-report.md
"""
import json
import os
import re
import sys
import time
import tomllib
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODS = os.path.join(ROOT, "mods")
REPORT = os.path.join(ROOT, "ai-workflows", "outputs", "cf-availability-report.md")

CF_API = "https://api.curseforge.com/v1/mods/search"
GAME_ID = 432           # Minecraft
CLASS_MODS = 6          # "Mods" class (excludes modpacks / resourcepacks)
LOADER_NEOFORGE = 6     # modLoaderType


def get_key():
    key = os.environ.get("CF_API_KEY")
    if key:
        return key.strip()
    path = os.path.expanduser("~/.config/curseforge/api-key")
    if os.path.exists(path):
        with open(path) as f:
            return f.read().strip()
    sys.exit("Kein CF-API-Key. Setze CF_API_KEY oder lege ~/.config/curseforge/api-key an.")


def norm(s):
    """Normalise a name/slug for fuzzy comparison."""
    return re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()


def tokens(s):
    return set(norm(s).split())


def read_mods():
    mods = []
    for fn in sorted(os.listdir(MODS)):
        if not fn.endswith(".pw.toml"):
            continue
        with open(os.path.join(MODS, fn), "rb") as f:
            data = tomllib.load(f)
        if "modrinth" not in data.get("update", {}):
            continue
        # filename stem is packwiz's slug (usually the Modrinth slug)
        slug = fn[:-len(".pw.toml")]
        mods.append((fn, data.get("name", slug), slug))
    return mods


def cf_search(key, name, mc, loader=True):
    params = {
        "gameId": GAME_ID,
        "classId": CLASS_MODS,
        "searchFilter": name,
        "sortField": 2,        # popularity
        "sortOrder": "desc",
        "pageSize": 20,
    }
    if loader:
        params["gameVersion"] = mc
        params["modLoaderType"] = LOADER_NEOFORGE
    url = CF_API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={
        "X-API-Key": key,
        "Accept": "application/json",
    })
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r).get("data", [])
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(2 * (attempt + 1))
                continue
            raise
        except urllib.error.URLError:
            time.sleep(1)
    return []


def best_match(query_name, query_slug, results):
    """Return (score, result) for the best name/slug match, or (0, None)."""
    qt = tokens(query_name)
    qslug = norm(query_slug)
    best = (0.0, None)
    for r in results:
        rname, rslug = r.get("name", ""), r.get("slug", "")
        if norm(rslug) == qslug or norm(rname) == norm(query_name):
            return (1.0, r)            # exact slug or name match
        rt = tokens(rname)
        if not qt or not rt:
            continue
        overlap = len(qt & rt) / len(qt | rt)   # Jaccard
        if overlap > best[0]:
            best = (overlap, r)
    return best


def classify(key, name, slug, mc):
    results = cf_search(key, name, mc, loader=True)
    score, match = best_match(name, slug, results)
    if score >= 0.6 and match:
        return "AVAILABLE", f"{match['name']} (cf-slug: {match['slug']})"
    # Found something loosely - flag for manual review
    if score >= 0.3 and match:
        cand = f"bester Treffer: {match['name']} (cf-slug: {match['slug']}, score {score:.2f})"
    else:
        cand = ""
    # Maybe it exists on CF but not for 1.21.1/NeoForge?
    any_results = cf_search(key, name, mc, loader=False)
    s2, m2 = best_match(name, slug, any_results)
    if s2 >= 0.6 and m2:
        return "NO_COMPAT_VERSION", f"{m2['name']} (cf-slug: {m2['slug']})"
    if cand:
        return "UNCERTAIN", cand
    if s2 >= 0.3 and m2:
        return "UNCERTAIN", f"nur loser Treffer ohne Version: {m2['name']} (score {s2:.2f})"
    return "NOT_FOUND", ""


def main():
    limit = None
    if "--limit" in sys.argv:
        limit = int(sys.argv[sys.argv.index("--limit") + 1])

    key = get_key()
    with open(os.path.join(ROOT, "pack.toml"), "rb") as f:
        mc = tomllib.load(f)["versions"]["minecraft"]

    mods = read_mods()
    if limit:
        mods = mods[:limit]
    print(f"Prüfe {len(mods)} Modrinth-Mods gegen CurseForge (Mods-only, MC {mc}, NeoForge)\n")

    results = []
    for i, (fn, name, slug) in enumerate(mods, 1):
        status, detail = classify(key, name, slug, mc)
        results.append((fn, name, status, detail))
        print(f"  [{i:>3}/{len(mods)}] {status:<17} {name}"
              + (f"  ({detail})" if detail else ""))
        time.sleep(0.15)

    write_report(mc, results)


def write_report(mc, results):
    order = ["AVAILABLE", "NO_COMPAT_VERSION", "UNCERTAIN", "NOT_FOUND"]
    titles = {
        "AVAILABLE": "✅ Auf CurseForge verfügbar (1.21.1 / NeoForge)",
        "NO_COMPAT_VERSION": "⚠️ Auf CF, aber keine 1.21.1/NeoForge-Datei",
        "UNCERTAIN": "❓ Unsicher — manuell prüfen",
        "NOT_FOUND": "❌ Nicht auf CurseForge gefunden (Modrinth-exklusiv?)",
    }
    buckets = {k: [] for k in order}
    for r in results:
        buckets.setdefault(r[2], []).append(r)

    n = len(results)
    avail = len(buckets["AVAILABLE"])
    blockers = len(buckets["NOT_FOUND"]) + len(buckets["NO_COMPAT_VERSION"])
    lines = [
        "# CurseForge-Verfügbarkeits-Check",
        "",
        f"Pack-Ziel: Minecraft {mc} / NeoForge  ",
        f"Geprüfte Modrinth-Mods: **{n}**  ",
        f"Davon migrierbar: **{avail}** · Blocker: **{blockers}** · unsicher: **{len(buckets['UNCERTAIN'])}**",
        "",
        "Methode: CurseForge-API, gefiltert auf Mods (classId 6), MC-Version und "
        "NeoForge. Match per Slug-/Namensvergleich (Jaccard ≥ 0,6 = sicher).",
        "",
        "## Zusammenfassung",
        "",
        "| Status | Anzahl |",
        "|---|---|",
        f"| ✅ AVAILABLE | {avail} |",
        f"| ⚠️ NO_COMPAT_VERSION | {len(buckets['NO_COMPAT_VERSION'])} |",
        f"| ❓ UNCERTAIN | {len(buckets['UNCERTAIN'])} |",
        f"| ❌ NOT_FOUND | {len(buckets['NOT_FOUND'])} |",
        "",
    ]
    for k in order:
        if not buckets[k]:
            continue
        lines.append(f"## {titles[k]} ({len(buckets[k])})")
        lines.append("")
        for fn, name, _, detail in sorted(buckets[k], key=lambda x: x[1].lower()):
            suffix = f" — {detail}" if detail else ""
            lines.append(f"- **{name}** (`{fn}`){suffix}")
        lines.append("")

    os.makedirs(os.path.dirname(REPORT), exist_ok=True)
    with open(REPORT, "w") as f:
        f.write("\n".join(lines))
    print(f"\nReport: {REPORT}")
    print(f"Migrierbar: {avail}/{n}  |  Blocker: {blockers}  |  unsicher: {len(buckets['UNCERTAIN'])}")


if __name__ == "__main__":
    main()
