# World Generation

Gaia Awakening uses **Tectonic** and **Terralith** for terrain generation, producing dramatically taller mountains, richer biome variety, and a custom ore system where **all real ore worldgen is disabled** and every ore is obtained exclusively through **Create Ore Excavation (COE)** drilling veins.

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

The Mantle zone (Y=-64 to -96) is a Blackstone and Magma dominated layer that visually and mechanically resembles a Nether antechamber.

---

## Ore Distribution

### All Ore Worldgen Disabled

**No ore spawns naturally in the world.** Every ore is obtained exclusively through
Create Ore Excavation drilling veins (see [Drill Head System](drill-heads.md)). Worldgen
is suppressed across all sources:

| Source | Suppression method |
|---|---|
| Vanilla ores (overworld + nether) | `placed_feature` overrides → `rarity_filter` `chance: 1000000` |
| Mekanism (osmium, tin, lead, uranium, fluorite) | `config/Mekanism/world.toml` → `shouldGenerate = false` |
| Create zinc + striated ores | `placed_feature` overrides (`create:` namespace) |
| Powah uraninite | `placed_feature` overrides (`powah:` namespace) |
| Create New Age thorium | `placed_feature` overrides (`create_new_age:` namespace) |
| Mystical Agriculture inferium / prosperity | `placed_feature` overrides (`mysticalagriculture:` namespace) |

### Exceptions — Left in Worldgen

Two resource types are deliberately left untouched:

| Resource | Reason |
|---|---|
| **AE2 Certus / Charged Certus** | Comes from meteorites; disabling worldgen has no effect |
| **Amethyst geodes** | Crystal growth mechanic, not a mineable ore block |

### Bootstrap — Tinted Stone Crush

Before a Drilling Machine is built, early-game metals come exclusively from mining and
crushing Create's four tinted decorative stones. Their renewable crafting recipes have
been removed, so they must be mined from the world.

| Create Stone | Crushing Yield |
|---|---|
| **Crimsite** | Raw Iron |
| **Veridium** | Raw Copper |
| **Ochrum** | Raw Gold |
| **Asurine** | Raw Zinc |

This is the *only* pre-drill metal source. It provides just enough to build the
Drilling Machine and a Basic Drill Head.

### COE Vein Model — Finite Veins and Infinite Ley Lines

Every ore in the tier table has exactly two COE entries:

| Entry | Behaviour | Access |
|---|---|---|
| **Finite vein** | Depletes permanently; larger but one-time | Tier N drill head tag |
| **Infinite ley line** | Unlimited, renewable; rarer placement | Tier N+1 drill head tag |

"Finite now, infinite once you out-tier it." Every ore becomes infinitely renewable once
the player reaches the next tier of drill head. See [Drill Head System](drill-heads.md)
for the tier→ore mapping and head-gating rules.

### Ore Multiplication Downstream

Drilled raw items feed the existing Create / Mekanism processing chain unchanged. No
multiplier lives in the ore block itself.

| Processing stage | Multiplier |
|---|---|
| Furnace only | ×1 |
| Create crushing | ×2 |
| Mekanism enrichment / purification | ×3–4 |
| Full Mekanism chemical chain | up to ×16+ |

### Design Philosophy

```
Tinted stones (Crimsite / Veridium / Ochrum / Asurine)  →  Bootstrap: only pre-drill metal source
COE finite veins (deplete permanently)                  →  Mid-game bulk source, gated by tier
COE infinite ley lines (renewable)                      →  Endgame scaling, one tier higher gate
Downstream Create / Mekanism processing                 →  ×2 – ×16+ ore multiplication
```

---

## Create Ore Excavation — Drilling Veins

COE drilling veins are the **only** long-term ore source. Every ore in scope has one
finite vein and one infinite ley line, each hard-gated by a cumulative drill-head tier tag.

For the full tier→ore mapping and gating rules, see [Drill Head System](drill-heads.md).

### Drilling Machine

The COE `drilling_machine` is an intentional mid-game gate:

- **Cost**: 6× Iron Block, 1× Precision Mechanism, 1× Brass Casing
- COE's built-in drill heads are disabled; custom heads replace them entirely

---

## Progression Through the World

| Tier | Resource strategy |
|------|-----------------|
| T1 | Mine Crimsite / Veridium / Ochrum / Asurine for first ingots; build crusher and Drilling Machine |
| T2 | Drill iron, copper, coal, gold, zinc, redstone, lapis, osmium, tin, lead, nether quartz, inferium |
| T3 | Drill uranium, fluorite, nether gold, glowstone, ancient debris, diamond, emerald, prosperity |
| T4 | Drill thorium and uraninite with Refined Obsidian head; unlock T3 ley lines |
| T5 | Gaia-Infused head unlocks T4 ley lines (thorium / uraninite infinite) and ancient debris ley line |

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
