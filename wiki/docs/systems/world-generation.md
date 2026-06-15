# World Generation

Gaia Awakening uses **Tectonic** and **Terralith** for terrain generation, producing dramatically taller mountains, richer biome variety, and a custom ore distribution designed around Create Ore Excavation nodes as the primary long-term resource source.

---

## Terrain Overview

| Parameter | Value | Notes |
|-----------|-------|-------|
| Minimum Y | -128 | Deeper underground for dungeons and Mekanism resources |
| Total Height | 896 blocks | Massive vertical range for aeronautics |
| Terrain Max Y | ~512 | Mountain peaks via Tectonic |
| Build Limit | 768 | Significant airspace above the tallest peaks |
| Sea Level | 64 | Standard |

The terrain is generated with Tectonic's `vertical_scale` settings producing mountains up to Y=512. Terralith adds biome diversity across the surface. Noisium and Lithostitched are included to keep noise calculations performant at this scale.

### World Presets

Four world presets are available at world creation:

| Preset | Height | Shattered Lands | Intended for |
|--------|--------|-----------------|--------------|
| Apex: Standard Modded | -64 to 320 | No | Players who want a normal modded experience |
| Apex: The Grand Journey | -128 to 768 (896 total) | Yes, beyond 32,000 blocks | The intended modpack experience |
| Apex: Skybound Only | -128 to 768 | Flying islands only (no solid floor) | Hardcore aeronautics players |
| Apex: Eternal Mainland | -128 to 768 | No | Builders and miners preferring pure mainland |

### Zone Structure (Apex: The Grand Journey)

| Zone | Distance from Spawn | Character |
|------|---------------------|-----------|
| Apex Mainland | 0–10,000 blocks | Normal massive overworld with mountains to Y=512; Blackstone/Magma Mantle layer from Y=-64 to -96 |
| Transition | 10,000–28,000 blocks | Flatter, increasingly fractured; Bedrock progressively carved away with vertical rifts |
| Bufferzone | 28,000–32,000 blocks | Fragmented border region; partial Void underneath; dramatic visual break |
| Shattered Outer Rim | 32,000+ blocks | No continuous floor; floating archipelagos at three height layers (Low-Orbit, Cloud-Layer, High-Apex) |

The Mantle zone (Y=-64 to -96) is a Blackstone and Magma dominated layer that visually and mechanically resembles a Nether antechamber. It is the preferred zone for Ancient Debris.

---

## Ore Distribution

### Design Philosophy

Naturally spawning ores are reduced by 50–83% compared to vanilla. They provide enough material to start Tier 1 but are insufficient for sustained automation. **Create Ore Excavation Nodes** are the primary long-term resource — large clusters found through exploration that become renewable via Create drilling machinery.

```
Natural ores  →  Tier 1 hand mining (starting resource)
Ore Nodes     →  Exploration target → Create Drill setup → Unlimited output
```

### Natural Ore Zones

#### Zone 1 — Surface (Y +64 to +192)

| Ore | Vanilla Veins/Chunk | Custom Veins/Chunk | Reduction |
|-----|--------------------|--------------------|-----------|
| Coal | 30 | 10 | -67% |
| Iron | 10 | 4 | -60% |
| Copper | 16 | 6 | -62% |

Zinc (Create) is shifted slightly downward; a few veins remain on the surface but the majority is in Zone 2.

#### Zone 2 — Normal Caves (Y -32 to +64)

| Ore | Vanilla Veins/Chunk | Custom Veins/Chunk | Reduction |
|-----|--------------------|--------------------|-----------|
| Zinc (Create) | 8 | 2 | -75% |
| Gold | 4 | 1 | -75% |
| Lapis | 2 | 1 | -50% |
| Redstone | 8 | 3 | -62% |
| Ars Nouveau Source Gem | 4 | 2 | -50% |
| AE2 Certus Quartz (upper) | 2 | 1 | -50% |

#### Zone 3 — Deep Caves (Y -48 to 0)

| Ore | Vanilla Veins/Chunk | Custom Veins/Chunk | Reduction |
|-----|--------------------|--------------------|-----------|
| Osmium (Mekanism) | 6 | 1 | -83% |
| Tin (Mekanism) | 5 | 1 | -80% |
| Certus Quartz (AE2, deep) | 3 | 1 | -67% |
| Diamond | 1 | 0.3 | -70% |

#### Zone 4 — Abyss (Y -96 to -48)

| Ore | Custom Veins/Chunk | Notes |
|-----|-------------------|-------|
| Uranium | 0.3 | Almost exclusively via node |
| Lead | 0.5 | Minimal natural occurrence |
| Fluorite | 0.3 | Chemicals gate |
| Osmium (peak) | 1 | Higher concentration for late T3 |

#### Zone 5 — Void Layer (Y -128 to -96)

| Ore | Custom Veins/Chunk | Notes |
|-----|-------------------|-------|
| Ancient Debris | 0.2 | Practically only boss/node sourced |
| Osmium Mega-Cluster | 0.5 | Large veins for lategame bulk |

Zone 5 is only available in world presets with the extended Y range (Apex: The Grand Journey and equivalents).

---

## Create Ore Excavation Node System

### How Nodes Work

Create Ore Excavation places large **Ore Nodes** — dense clusters of 200–500 ore blocks — at set intervals across the world. Hand-mining a node gives roughly 20–30 ore as a starting bonus (10% of node yield). With a Create drilling contraption, the node is **infinitely renewable** and produces ore continuously as long as the machine runs.

Node spawn rarity is set to 40% of the default (`nodeSpawnRarity = 0.4`), making exploration necessary to find them.

### Node Table

| Node Type | Zone | Y Centre | Node Spacing | Hand-Mine Yield | Create Output/h |
|-----------|------|----------|-------------|-----------------|-----------------|
| Coal Node | 1 | +96 | ~300 blocks | 40 | ~800 |
| Iron Node | 1 | +48 | ~350 blocks | 30 | ~600 |
| Copper Node | 1 | +64 | ~350 blocks | 25 | ~500 |
| Zinc Node | 2 | +20 | ~400 blocks | 20 | ~400 |
| Gold Node | 2 | -10 | ~500 blocks | 20 | ~300 |
| Lapis Node | 2 | +10 | ~500 blocks | 15 | ~250 |
| Redstone Node | 2 | -15 | ~400 blocks | 25 | ~500 |
| Source Gem Node | 2 | +20 | ~600 blocks | 15 | ~200 |
| Diamond Node | 3 | -35 | ~800 blocks | 10 | ~150 |
| Osmium Node | 3 | -30 | ~600 blocks | 20 | ~350 |
| Tin Node | 3 | -25 | ~600 blocks | 20 | ~300 |
| Certus Node | 3 | -30 | ~700 blocks | 15 | ~200 |
| Uranium Node | 4 | -70 | ~1,200 blocks | 8 | ~100 |
| Lead Node | 4 | -65 | ~900 blocks | 12 | ~150 |
| Fluorite Node | 4 | -60 | ~900 blocks | 10 | ~120 |
| Ancient Debris Node | 5 | -110 | ~2,000 blocks | 5 | ~50 |

Output figures assume a mid-size Create drilling setup (4 drills, 128 RPM). Actual values depend on drill configuration and are calibrated after testing.

### Node Configuration

```toml
# config/createoreexcavation-common.toml
nodeSpawnRarity = 0.4        # 40% of default — nodes are rare, exploration matters
nodeRenewable = true         # Nodes are infinitely renewable via Create drilling
nodeHandMiningYield = 0.1    # Hand-mining gives 10% of node content (starting bonus only)
```

---

## Progression Through the World

| Tier | Mining strategy |
|------|----------------|
| T1 | Hand-mine natural ores for first machines |
| T2 | Find first Iron/Zinc Node; set up Create drilling contraption |
| T3 | Go deeper for Osmium/Certus/Diamond Nodes; expand Create automation |
| T4 | Reach Zone 4 Abyss for Uranium/Lead/Fluorite Nodes |
| T5 | Zone 5 Void Layer for Ancient Debris Nodes; Shattered Outer Rim for endgame loot |

---

## Performance

The extended world height and Tectonic terrain require additional optimisation mods included in the pack:

- **Noisium** — optimised noise calculations for on-the-fly generation at the pack's extended height
- **Lithium** — game logic optimisation (entity AI, chunk sections, lighting updates), reducing server-side tick cost
- **Chunky** — pre-generates the 10,000-block core radius around spawn; run this before hosting the server for others
- **ServerCore** — dynamic server-side adjustments: entity tick throttling and simulation distance scaling under load
- **Distant Horizons** — LOD rendering for visibility out to 32 km without loading full chunks
- **Sodium** — chunk render pipeline optimisation, reducing GPU load from the extended view distances
- **FerriteCore** / **ModernFix** — memory and startup optimisation, important given the large number of mods and biome data

Pre-generation with Chunky is recommended for the 10,000-block core radius around spawn before hosting the server for others.
