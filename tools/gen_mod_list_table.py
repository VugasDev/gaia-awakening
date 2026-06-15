#!/usr/bin/env python3
"""
Generate the mod-list table rows for wiki/docs/reference/mod-list.md.
Reads all mods/*.pw.toml files and cross-references with the CF availability report.
"""

import os
import re
import sys

MODS_DIR = os.path.join(os.path.dirname(__file__), "..", "mods")
CF_REPORT = os.path.join(
    os.path.dirname(__file__), "..", "ai-workflows", "outputs", "cf-availability-report.md"
)

# CF slugs from the availability report (manually verified entries)
# Key = pw.toml filename (without path), value = CF slug
CF_SLUGS = {
    "ae2.pw.toml": "applied-energistics-2",
    "alexs-caves-(unofficial-port).pw.toml": "alexs-caves-unofficial-port",
    "alexs-mobs(1.21.1).pw.toml": "alexs-mobs-1-21-1-port",
    "apotheosis-addon-compat.pw.toml": "apotheosis-addon-compat",
    "appleskin.pw.toml": "appleskin",
    "applied-mekanistics.pw.toml": "applied-mekanistics",
    "ars-additions.pw.toml": "ars-additions",
    "ars-creo.pw.toml": "ars-creo",
    "ars-nouveau.pw.toml": "ars-nouveau",
    "artifacts.pw.toml": "artifacts",
    "athena-ctm.pw.toml": "athena",
    "balm.pw.toml": "balm",
    "caelus.pw.toml": "caelus",
    "carry-on.pw.toml": "carry-on",
    "chipped.pw.toml": "chipped",
    "chunky.pw.toml": "chunky-pregenerator-forge",
    "citadel-(1.21.1-port).pw.toml": "citadel-1-21-1-port",
    "cloth-config.pw.toml": "cloth-config",
    "clumps.pw.toml": "clumps",
    "controlling.pw.toml": "controlling",
    "copycats.pw.toml": "copycats",
    "create-deco.pw.toml": "create-deco",
    "create-diesel-generators.pw.toml": "create-diesel-generators",
    "create-dragons-plus.pw.toml": "create-dragons-plus",
    "create-dreams-and-desires.pw.toml": "create-dreams-desires",
    "create-enchantment-industry.pw.toml": "create-enchantment-industry",
    "create-garnished.pw.toml": "garnished",
    "create-new-age.pw.toml": "create-new-age",
    "create-ore-excavation.pw.toml": "create-ore-excavation",
    "create-simple-ore-doubling.pw.toml": "create-simple-ore-doubling",
    "create-steam-n-rails-1.21.1.pw.toml": "steam-n-rails-neoforge",
    "create.pw.toml": "create",
    "createaddition.pw.toml": "createaddition",
    "cucumber.pw.toml": "cucumber",
    "curios.pw.toml": "curios",
    "distanthorizons.pw.toml": "distant-horizons",
    "enchantment-library-standalone.pw.toml": "enchantment-library-standalone",
    "enigmaticlegacy+.pw.toml": "enigmatic-legacy-plus",
    "explorers-compass.pw.toml": "explorers-compass",
    "extended-ae.pw.toml": "ex-pattern-provider",
    "farmers-delight.pw.toml": "farmers-delight",
    "ferrite-core.pw.toml": "ferritecore",
    "functional-storage.pw.toml": "functional-storage",
    "geckolib.pw.toml": "geckolib",
    "glitchcore.pw.toml": "glitchcore",
    "glodium.pw.toml": "glodium",
    "guideme.pw.toml": "guideme",
    "industrial-foregoing.pw.toml": "industrial-foregoing",
    "interiors.pw.toml": "interiors",
    "inventory-profiles-next.pw.toml": "inventory-profiles-next",
    "iris.pw.toml": "irisshaders",
    "irons-lib.pw.toml": "irons-lib",
    "irons-spells-n-spellbooks.pw.toml": "irons-spells-n-spellbooks",
    "jade.pw.toml": "jade",
    "journeymap.pw.toml": "journeymap",
    "just-zoom.pw.toml": "just-zoom",
    "konkrete.pw.toml": "konkrete",
    "kotlin-for-forge.pw.toml": "kotlin-for-forge",
    "kubejs.pw.toml": "kubejs",
    "l_enders-cataclysm.pw.toml": "lenderscataclysm-delight",
    "libipn.pw.toml": "libipn",
    "lionfish-api.pw.toml": "lionfish-api",
    "lithium.pw.toml": "lithium",
    "lithostitched.pw.toml": "lithostitched",
    "lootjs.pw.toml": "lootjs",
    "lootr.pw.toml": "lootr",
    "macaws-bridges.pw.toml": "macaws-bridges",
    "macaws-doors.pw.toml": "macaws-doors",
    "macaws-fences-and-walls.pw.toml": "macaws-fences-and-walls",
    "macaws-lights-and-lamps.pw.toml": "macaws-lights-and-lamps",
    "macaws-roofs.pw.toml": "macaws-roofs",
    "macaws-trapdoors.pw.toml": "macaws-trapdoors",
    "macaws-windows.pw.toml": "macaws-windows",
    "mcjtylib.pw.toml": "mcjtylib",
    "mega.pw.toml": "mega-cells",
    "mekanism-generators.pw.toml": "mekanism-generators",
    "mekanism-tools.pw.toml": "mekanism-tools",
    "mekanism.pw.toml": "mekanism",
    "modernfix.pw.toml": "modernfix",
    "modonomicon.pw.toml": "modonomicon",
    "moonlight.pw.toml": "selene",
    "mouse-tweaks.pw.toml": "mouse-tweaks",
    "mowzies-mobs.pw.toml": "mowzies-mobs",
    "mystical-agradditions.pw.toml": "mystical-agradditions",
    "mystical-agriculture.pw.toml": "mystical-agriculture",
    "natures-compass.pw.toml": "natures-compass",
    # noisium: Modrinth-exclusive; CF uses unofficial port (see credits-licenses.md)
    "occultism.pw.toml": "occultism",
    "octo-lib.pw.toml": "shatterbyte-lib",
    "patchouli.pw.toml": "patchouli",
    "playeranimator.pw.toml": "playeranimator",
    "pneumaticcraft-repressurized.pw.toml": "pneumaticcraft-repressurized",
    "powah.pw.toml": "powah-rearchitected",
    "rei.pw.toml": "roughly-enough-items",
    "resourceful-lib.pw.toml": "resourceful-lib",
    "rftools-base.pw.toml": "rftools-base",
    "rhino.pw.toml": "rhino",
    "searchables.pw.toml": "searchables",
    "serene-seasons.pw.toml": "serene-seasons",
    "servercore.pw.toml": "servercore",
    "simple-magnets.pw.toml": "simple-magnets",
    "smartbrainlib.pw.toml": "smartbrainlib",
    "sodium.pw.toml": "sodium",
    "sophisticated-backpacks.pw.toml": "sophisticated-backpacks",
    "sophisticated-core.pw.toml": "sophisticated-core",
    "sophisticated-storage.pw.toml": "sophisticated-storage",
    "sound-physics-remastered.pw.toml": "sound-physics-remastered",
    "supermartijn642s-config-lib.pw.toml": "supermartijn642s-config-lib",
    "supermartijn642s-core-lib.pw.toml": "supermartijn642s-core-lib",
    "supplementaries.pw.toml": "supplementaries",
    "tectonic.pw.toml": "tectonic",
    "terralith.pw.toml": "terralith",
    "titanium.pw.toml": "titanium",
    "veggies-delight.pw.toml": "veggies-delight",
    "waystones.pw.toml": "waystones",
    "when-dungeons-arise.pw.toml": "when-dungeons-arise",
    "xnet-gases.pw.toml": "xnet-gases",
    "xnet.pw.toml": "xnet",
    "yungs-api.pw.toml": "yungs-api-neoforge",
    "yungs-better-dungeons.pw.toml": "yungs-better-dungeons-neoforge",
    "yungs-better-mineshafts.pw.toml": "yungs-better-mineshafts-neoforge",
    "yungs-better-strongholds.pw.toml": "yungs-better-strongholds-neoforge",
    "yungs-better-witch-huts.pw.toml": "yungs-better-witch-huts-neoforge",
    # CF-native mods (project-id in toml but no Modrinth)
    "apotheosis.pw.toml": "apotheosis",
    "apothic-attributes.pw.toml": "apothic-attributes",
    "apothic-enchanting.pw.toml": "apothic-enchanting",
    "apothic-spawners.pw.toml": "apothic-spawners",
    "architectury-api.pw.toml": "architectury-api",
    "ftb-chunks-forge.pw.toml": "ftb-chunks",
    "ftb-library-forge.pw.toml": "ftb-library",
    "ftb-quests-forge.pw.toml": "ftb-quests",
    "ftb-teams-forge.pw.toml": "ftb-teams",
    "ftb-ultimine-forge.pw.toml": "ftb-ultimine",
    "placebo.pw.toml": "placebo",
}


def parse_toml_field(content, field):
    """Extract a simple string field from TOML content."""
    m = re.search(rf'^{field}\s*=\s*"([^"]*)"', content, re.MULTILINE)
    return m.group(1) if m else ""


def parse_modrinth_id(content):
    m = re.search(r'mod-id\s*=\s*"([^"]+)"', content)
    return m.group(1) if m else ""


def get_all_mods():
    mods = []
    for fname in sorted(os.listdir(MODS_DIR)):
        if not fname.endswith(".pw.toml"):
            continue
        fpath = os.path.join(MODS_DIR, fname)
        with open(fpath) as f:
            content = f.read()
        name = parse_toml_field(content, "name")
        mr_id = parse_modrinth_id(content)
        cf_slug = CF_SLUGS.get(fname, "")
        mods.append((name, mr_id, cf_slug, fname))
    return mods


def make_row(name, mr_id, cf_slug):
    # Escape pipe chars in name for Markdown tables
    safe_name = name.replace("|", "&#124;")
    if mr_id:
        mr_link = f"[Modrinth](https://modrinth.com/mod/{mr_id})"
    else:
        mr_link = "—"
    if cf_slug:
        cf_link = f"[CurseForge](https://www.curseforge.com/minecraft/mc-mods/{cf_slug})"
    else:
        cf_link = "—"
    return f"| {safe_name} | {mr_link} | {cf_link} |"


if __name__ == "__main__":
    mods = get_all_mods()
    print(f"Total mods: {len(mods)}", file=sys.stderr)
    for name, mr_id, cf_slug, fname in mods:
        print(make_row(name, mr_id, cf_slug))
