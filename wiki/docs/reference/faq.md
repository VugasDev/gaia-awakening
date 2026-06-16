# Frequently Asked Questions

---

## Installation & Setup

### How much RAM do I need?

**Minimum: 8 GB allocated. Recommended: 12 GB.**

The pack includes high-resolution terrain generation (896-block world height with Terralith + Tectonic), Distant Horizons LoD rendering, and over 130 mods — all of which add memory pressure. Allocating less than 8 GB will result in frequent garbage-collection pauses and likely crashes.

To change the allocated RAM, open your launcher's instance settings and set the JVM maximum heap (`-Xmx`) to `8192m` (8 GB) or `12288m` (12 GB).

### What Java version do I need?

Java 21 or newer. NeoForge 21.1.x requires Java 21. Most launchers (Modrinth App, Prism Launcher, ATLauncher) will download and use the correct Java version automatically.

### How do I install the pack?

Download the latest `.mrpack` file from the [Releases page](https://github.com/VugasDev/gaia-awakening/releases) and import it into your launcher:

- **Modrinth App** — drag the `.mrpack` onto the launcher window, or use *Add Instance → From file*.
- **Prism Launcher / ATLauncher** — *Add Instance → Import from zip*, then select the `.mrpack` file.
- **CurseForge App** — *Create Custom Profile → Import*, then select the `.mrpack` file.

---

## Updating

### How do I update to a new version?

Download the new `.mrpack` from the [Releases page](https://github.com/VugasDev/gaia-awakening/releases) and import it as a new instance rather than overwriting your existing one. This preserves your world saves and config changes in the old instance.

After importing, copy your world save folder from the old instance's `saves/` directory to the new instance's `saves/` directory before launching.

!!! warning "Always back up your world before updating."
    Major version updates can include changes to world generation, custom recipes, or quest data that may affect existing worlds.

### Will my world work after an update?

For patch-level updates (e.g. v0.1.39 → v0.1.40), existing worlds are generally safe. Larger updates may add new biomes or structures to ungenerated chunks without breaking existing ones. Check the [Changelog](changelog.md) for notes on breaking changes.

---

## Multiplayer

### Can I play on a server?

Yes. Gaia Awakening is fully multiplayer-compatible. To run a dedicated server:

1. Download the server files — NeoForge 21.1.x server jar plus the pack's mod list.
2. Use packwiz to export server-side files, or manually copy the `mods/` folder (all mods marked `side = "both"` or `side = "server"` in their `.pw.toml`).
3. Allocate at least 8 GB RAM to the server JVM.

FTB Chunks allows players to claim chunks to protect their builds. FTB Teams enables shared team claims.

### Do client-only mods cause issues on a vanilla server?

The pack does not support connecting to a vanilla server. All players must be running the same version of Gaia Awakening.

---

## Performance

### The game is running slowly. What should I try?

**In-game settings:**

- Lower *Render Distance* to 8–12 chunks. Distant Horizons handles the visual distance beyond that.
- In *Distant Horizons* settings, reduce the LoD quality or LoD render distance if you have less than 8 GB VRAM.
- Disable shaders if you have them enabled (Iris Shaders) — shaders significantly increase GPU load.
- Lower *Entity Distance* and *Simulation Distance* in vanilla Video Settings.

**JVM flags:**

Use Aikar's JVM flags (widely documented) or the flags recommended by your launcher's performance guide. Ensure you are not running with `-Xms` equal to `-Xmx` unless you have 16+ GB to spare.

**Server-side:**

- Pre-generate chunks with **Chunky** before players join (run `/chunky radius 1000 start` on the server console).
- **ServerCore** applies dynamic optimisations automatically once the server is running.

### Can I add shaders?

Yes. The pack includes **Iris Shaders**, which is compatible with OptiFine-style shader packs. Download a shader pack (e.g. Complementary Reimagined, BSL, SEUS) and place the `.zip` in the `shaderpacks/` folder inside your instance directory. Enable it via *Video Settings → Shaders*.

---

## Issues & Bug Reports

### Where do I report bugs or crashes?

Open an issue on the [GitHub repository](https://github.com/VugasDev/gaia-awakening/issues). Include:

- The full crash log or latest.log (from the instance's `logs/` folder).
- The pack version (shown in the title screen or in `pack.toml`).
- Steps to reproduce the problem.
- Whether the issue occurs in singleplayer, multiplayer, or both.

### A quest is not completing. What do I do?

First check the quest description carefully — some quests require you to hold the item, others require you to craft or place it. If the quest still does not complete, try the `/ftbquests reload` command (requires server operator permission) to refresh the quest data. If the problem persists, report it on GitHub.

### A recipe is missing or different from what I expected.

Many vanilla and modded recipes are modified by KubeJS scripts to fit the pack's progression. Check the **REI recipe browser** (press `R` on an item) for the actual in-pack recipe. If REI shows no recipe and you believe one should exist, report it as a bug.
