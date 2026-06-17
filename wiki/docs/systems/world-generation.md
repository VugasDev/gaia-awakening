# World Generation

Gaia Awakening uses **Tectonic** and **Terralith** for terrain generation, producing dramatically taller mountains, richer biome variety, and a custom ore distribution where vanilla ores are gated behind tinted stones and Create Ore Excavation drilling veins are the scalable long-term resource source.

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

### Crimsite-Gated Early Progression

Vanilla iron, copper, and gold ores do **not** spawn in the world. Instead, early-game metals come exclusively from mining and crushing Create's four tinted decorative stones. These stones must be mined — their renewable crafting recipes (e.g. heated mixing for Veridium) have been removed.

| Create Stone | Crushing Yield |
|---|---|
| **Crimsite** | Raw Iron |
| **Veridium** | Raw Copper |
| **Ochrum** | Raw Gold |
| **Asurine** | Raw Zinc |

Until a player has a working crusher, there are no metals. This makes Create's ore processing the gate to every other tech tree.

### All Other Ores — Super-Rare

All remaining ores spawn at extreme rarity. Natural deposits exist only as an emergency fallback; **Create Ore Excavation drilling is the primary resource source**.

- Vanilla ores (diamond, coal, redstone, lapis, emerald, ancient debris): `rarity_filter` chance 96 — generating in roughly 1% of placements (1-in-96)
- Mekanism ores (osmium, tin, lead, uranium, fluorite): `perChunk = 1` — at most one vein per chunk

### Vein Model — Finite Deposits and Infinite Ley Lines

Each significant ore type has two COE vein categories:

| Category | Spawn Rate | Capacity | Renewal |
|---|---|---|---|
| Common Finite Vein | Several per region | ~1,000–3,000 raw items | Depletes permanently |
| Rare Infinite Ley Line | Very rare | Unlimited | Renewable via Create drilling |

Base metals (iron, copper, gold, zinc) and diamond each have both a common finite vein and a rare infinite ley line. Ancient Debris has a finite Nether vein only. Using a higher-tier drill head increases yield per operation and drilling speed on all vein types.

### Design Philosophy

```
Tinted stones (Crimsite/Veridium/Ochrum/Asurine)  →  Early metal source (mine & crush)
Super-rare natural ores                             →  Emergency fallback only
COE finite veins (~1,000–3,000 items, deplete)     →  Mid-game bulk source
COE infinite ley lines (base metals + diamond)      →  Scalable, renewable endgame source
```

### Natural Ore Depth Zones

Natural ore spawns are a fallback — sparse, but present across all depth zones.

#### Zone 1 — Surface (Y +64 to +192)

| Ore | Notes |
|-----|-------|
| Coal | Reduced vein count; still hand-minable early |
| (Iron, Copper, Gold absent) | Replaced by Crimsite / Veridium / Ochrum crushing |

Zinc (Create) is shifted slightly downward; a few veins remain near the surface.

#### Zone 2 — Normal Caves (Y -32 to +64)

| Ore | Notes |
|-----|-------|
| Zinc (Create) | Sparse; primary source is COE veins |
| Lapis | Reduced; sufficient for early enchanting |
| Redstone | Reduced; automation staple |
| Ars Nouveau Source Gem | Reduced |
| AE2 Certus Quartz | Reduced |

#### Zone 3 — Deep Caves (Y -48 to 0)

| Ore | Notes |
|-----|-------|
| Osmium (Mekanism) | `perChunk = 1`; one vein max |
| Tin (Mekanism) | `perChunk = 1`; one vein max |
| Certus Quartz (AE2) | Reduced |
| Diamond | `rarity_filter` chance 96 — ~1% placement rate (1-in-96) |

#### Zone 4 — Abyss (Y -96 to -48)

| Ore | Notes |
|-----|-------|
| Uranium | Extremely rare; `perChunk = 1` |
| Lead | Minimal natural occurrence |
| Fluorite | Chemicals gate; very rare |
| Osmium (peak) | Higher concentration for late T3 |

#### Zone 5 — Void Layer (Y -128 to -96)

| Ore | Notes |
|-----|-------|
| Ancient Debris | Rare finite Nether vein only; no infinite ley line |
| Osmium Mega-Cluster | Large veins for lategame bulk |

Zone 5 is only available in world presets with the extended Y range (Apex: The Grand Journey and equivalents).

---

## Create Ore Excavation — Drilling Veins

COE drilling veins are the primary long-term resource source. The two vein categories (common finite and rare infinite ley line) are described in the Vein Model section above. Base metals and diamond have both types; Ancient Debris has a finite Nether vein only.

### Drilling Machine

The COE `drilling_machine` is an expensive, intentional gate:

- **Cost**: 6× Iron Block, 1× Precision Mechanism, 1× Brass Casing
- COE's built-in drill heads are disabled; two custom heads bridge early tiers:
  - **Basic Drill Head** — T1/T2; iron + andesite alloy
  - **Reinforced Drill Head** — T2; brass + iron + basic drill head
  - Existing T3+ heads unlock at higher tiers

A higher-tier drill head increases yield per operation and drilling speed on all vein types.

---

## Progression Through the World

| Tier | Resource strategy |
|------|-----------------|
| T1 | Mine Crimsite/Veridium/Ochrum for first ingots; hand-mine coal and sparse ores |
| T2 | Build crusher; tap first iron/zinc COE finite vein with a Create drilling contraption |
| T3 | Go deeper for osmium/certus/diamond veins; find rare infinite ley lines for base metals |
| T4 | Reach Zone 4 Abyss for uranium/lead/fluorite; expand Create automation |
| T5 | Zone 5 Void Layer for Ancient Debris (finite); Shattered Outer Rim for endgame loot |

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
