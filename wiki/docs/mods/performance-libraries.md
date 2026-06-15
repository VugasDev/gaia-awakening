# Performance & Libraries

This page covers two related groups: mods that exist solely to make the game run better, and library/API mods that other mods depend on but that players do not interact with directly.

---

## Performance Mods

These mods are installed and require no configuration from the player. They run automatically in the background.

### Rendering

| Mod | What it does |
|---|---|
| **Sodium** | NeoForge-native chunk renderer. Rewrites the chunk rendering pipeline for significantly better GPU utilisation. The single biggest FPS improvement in the pack. |
| **Iris Shaders** | Adds shader support compatible with Sodium. Allows OptiFine-style shader packs (.zip format) to be used on NeoForge. |
| **Distant Horizons** | Generates low-detail level-of-detail (LoD) terrain for chunks far beyond the normal render distance (client-only). Provides the impression of a very large view distance without the performance cost of fully loading those chunks. |

### Memory & Game Logic

| Mod | What it does |
|---|---|
| **FerriteCore** | Reduces RAM usage by deduplicating block state data in memory. On large modpacks, this can cut memory use by several hundred MB. |
| **ModernFix** | Reduces startup time, fixes unnecessary resource reloads, and patches several Minecraft performance regressions. |
| **Lithium** | Optimises game logic — entity AI, chunk sections, block states, and lighting updates — without changing behaviour. The NeoForge build is included directly. |

### World Generation & Chunk Management

| Mod | What it does |
|---|---|
| **Noisium** | Optimises the noise-based world generation mathematics, which is especially important in a pack with an 800-block world height and custom biome layers from Terralith and Tectonic. |
| **Chunky** | Pre-generates chunks in a radius around the spawn before players join. The server should run Chunky pre-gen on initial world creation to avoid on-demand generation lag during play. |
| **ServerCore** | Dynamic server-side optimisations: reduces entity processing overhead, adjusts simulation distance based on server load, and limits pathfinding at high mob counts. |

---

## Library Mods

These are required dependencies. Players do not interact with them directly.

| Mod | Used by |
|---|---|
| **Architectury API** | Cross-loader compatibility layer used by several mods. |
| **Balm** | Cross-loader abstraction used by Waystones and others. |
| **Citadel** | Animation and entity library required by L_Ender's Cataclysm (1.21.1 port). |
| **GeckoLib** | Advanced model animation library required by Mowzie's Mobs, Iron's Spells, and others. |
| **OctoLib** | Utility library required by certain mob and animation mods. |
| **Cloth Config API** | Configuration screen library used by many mods. |
| **Patchouli** | In-game guidebook engine. Provides the Create Handbook and other mod documentation books. |
| **GuideMe** | Additional guidebook support; works alongside Patchouli. |
| **Modonomicon** | Another guidebook/codex engine, used by Occultism and Iron's Spells. |
| **GlitchCore** | Core library for several mods including Apotheosis. |
| **Glodium** | Utility library for NeoForge mods. |
| **Kotlin for Forge** | Kotlin runtime library, required by mods written in Kotlin. |
| **Curios API** | Equipment slot system — see [Storage & QoL](storage-qol.md) for player-facing details. |
| **Resourceful Lib** | Utility library used by Sophisticated mods and others. |
| **Caelus API** | Elytra flight API, lets mods add flight mechanics without copying vanilla elytra code. |
| **Moonlight Lib** | Library for Supplementaries and related mods. |
| **Cucumber** | Library for Mystical Agriculture and Mystical Agradditions. |
| **LionFish API** | API library for specific mob mods. |
| **SmartBrainLib** | Improves mob AI brain system; required by some creature mods. |
| **PlayerAnimator** | Player body animation library used by equipment and combat mods. |
| **Iron's Lib** | Library required by Iron's Spells 'n Spellbooks. |
| **MCJTYLib** | Library required by RFTools Base and XNet. |
| **MEGA Cells** | AE2 addon providing very high-capacity storage cells and drives for late-game digital storage (see [Tech](tech.md)). |
| **Titanium** | Library required by Industrial Foregoing. |
| **Placebo** | Library required by Apotheosis and several Apothic mods. |
| **Rhino** | JavaScript runtime for KubeJS. |
| **LootJS** | KubeJS extension for modifying loot tables. Used by the pack's custom boss drop scripts. |
| **KubeJS REI Integration** | Lets KubeJS scripts hide or add items in the REI item browser. |
| **FTB Library / FTB Teams** | Required dependencies for FTB Quests and FTB Chunks. |
| **Supermartijn642's Core Lib / Config Lib** | Utility libraries used by XNet and other mods. |
| **Konkrete** | Config library used by Iris Shaders. |
| **Athena CTM** | Connected Textures Method support library. |
| **libIPN** | Library required by Inventory Profiles Next. |
