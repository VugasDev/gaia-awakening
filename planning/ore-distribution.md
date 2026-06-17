# Ore Distribution — Gaia Awakening

---

## Implemented Model (2026-06-16): Crimsite-Gated Progression

> **Status**: Implemented on branch `feat/crimsite-ore-progression`

This section documents what was actually built. The older planning content below reflects earlier design iterations.

### Core Concept

Vanilla iron, copper, and gold ore are **removed from worldgen entirely** via datapack overrides. Early-game metal production is gated behind Create's four tinted decorative stones, which must be **mined** (renewable crafting recipes for them were removed):

| Create Stone | Crushing Output |
|---|---|
| Crimsite | Raw Iron |
| Veridium | Raw Copper |
| Ochrum | Raw Gold |
| Asurine | Raw Zinc |

This forces players to engage with Create's crushing workflow before they can smelt their first ingots.

### All Other Ores — Super-Rare

All remaining ores are made extremely rare via datapack overrides, making hand-mining a last resort rather than a primary strategy:

- **Vanilla ores** (diamond, coal, redstone, lapis, emerald, ancient debris): `rarity_filter` `chance: 96` — only 1-in-96 placements succeed (~1%)
- **Mekanism ores** (osmium, tin, lead, uranium, fluorite): `perChunk` set to 1 — one vein per chunk maximum
- **COE drilling is the real source**; natural spawns are only a fallback

### Vein Model — Finite + Rare Infinite Ley Lines

Veins come in two flavours:

| Flavour | Frequency | Size | Renewal |
|---|---|---|---|
| Common Finite Vein | Multiple per world region | ~1,000–3,000 raw items total | One-time; depletes |
| Rare Infinite Ley Line | Very rare | Unlimited | Renewable via Create drilling |

Metals with both types: base metals (iron, copper, gold, zinc) and diamond. Ancient Debris has a finite Nether vein only; no infinite ley line.

A better drill head increases yield per operation and drilling speed, making ley lines significantly more productive at higher tiers.

### Drilling Machine Gate

COE's `drilling_machine` recipe is overridden to cost:

- 6× Iron Block
- 1× Precision Mechanism
- 1× Brass Casing

COE's built-in drill heads (Iron / Diamond / Netherite Drill) are **disabled**. Two new lower-tier heads bridge the gap before the custom T3+ heads:

- **Basic Drill Head** (`gaia:basic_drill_head`) — T1/T2; requires iron + andesite alloy
- **Reinforced Drill Head** (`gaia:reinforced_drill_head`) — T2; requires brass + iron + basic drill head

### New Mod: Create Ore Excavation Better Finder

Replaces the default text-based vein finder with a radar-style UI. Available on both Modrinth and CurseForge (MIT licence).

---

> **Status**: Planning document — 2026-05-01
> **Implementation**: KubeJS datapack overrides + Create Ore Excavation config

---

## Design Principle: Ore Nodes as the Core

Naturally distributed ores are a **starter aid** — they give early players enough material
to get going, but are deliberately too rare for sustainable automation.

**Create Ore Excavation nodes** are the actual resource source: large, findable
through exploration, and infinitely renewable with Create machinery. Every ore gets
a node type. Whoever doesn't find a node can't scale.

```
NATURALLY DISTRIBUTED ORES   ──── Starter aid (60-90% rarer than vanilla)
        │
        ▼
    Hand mining is enough for a Tier 1 setup
        │
        ▼
CREATE ORE EXCAVATION NODE   ──── Main source (rare, but ~500 blocks per chunk)
        │
        ▼
    Exploration → find node → build a Create drill rig
        │
        ▼
    Infinite resources (Create-powered, no further intervention needed)
```

**Gameplay flow:** T1 = hand mining → T2 = find & tap the first iron/zinc node →
T3 = deeper, osmium/certus nodes, expand Create automation → T4-T5 = abyss nodes

---

## Natural Ore Distribution — Depth Zones

**Beta phase: vanilla height (Y -64 to +320)** — Tectonic vertical_scale 2.25
**Post-beta: tall world (Y -128 to ~512)** — Tectonic increased_height + scale 3.5+

```
Beta setup (vanilla Y limit, Tectonic dramatic mountains)
Y +320  ┌─────────────────────────────────────────────────────┐  ← build limit
        │   Mountain peaks / Tectonic Peaks (Y +200 snow line)│  No ores
Y +192  ├─────────────────────────────────────────────────────┤
        │   Zone 1: Surface                                   │  Coal, Iron, Copper (reduced)
Y   +64 ├─────────────────────────────────────────────────────┤
        │   Zone 2: Normal caves                              │  Zinc, Gold, Lapis (heavily reduced)
Y     0 ├═════════════════════════════════════════════════════╡  ← sea level
        │   Zone 3: Deep caves                                │  Osmium, Certus, Diamond (very rare)
Y   -48 ├─────────────────────────────────────────────────────┤
        │   Zone 4: Abyss                                     │  Uranium, Lead, Fluorite (extremely rare)
Y   -64 └─────────────────────────────────────────────────────┘  ← bedrock (beta)

(Post-beta: the Y range expands to -128 below and ~512 above, Zone 5
"void layer" is unlocked below Y -96 for Ancient Debris + osmium mega-clusters)
```

---

## Zone 1 — Surface (Y +64 to +192)

**Tier 1 — starter aid, immediately accessible**

| Ore | Vanilla vein/chunk | New vein/chunk | Reduction | Reason |
|-----|--------------------|----------------|-----------|-------|
| Coal | 30 | 10 | -67% | Node takes over in the medium term |
| Iron | 10 | 4 | -60% | Hand mining is enough for T1 |
| Copper | 16 | 6 | -62% | Similar to iron |

Zinc (Create) is shifted slightly downward (Y 0-60 instead of 10-85) — a few veins
remain on the surface, the bulk lies in Zone 2.

---

## Zone 2 — Normal Caves (Y -32 to +64)

**Tier 2 — Create & first exploration**

| Ore | Vanilla vein/chunk | New vein/chunk | Reduction | Reason |
|-----|--------------------|----------------|-----------|-------|
| Zinc (Create) | 8 | 2 | -75% | Node focus, critical for Create |
| Gold | 4 | 1 | -75% | Rare and valuable |
| Lapis | 2 | 1 | -50% | Still needed for enchanting |
| Redstone | 8 | 3 | -62% | Automation staple |
| Ars: Source Gem | 4 | 2 | -50% | Magic entry |
| AE2: Certus (top) | 2 | 1 | -50% | First AE2 crystals |

---

## Zone 3 — Deep Caves (Y -48 to 0)

**Tier 3 — Mekanism & AE2 entry, very rare**

| Ore | Vanilla vein/chunk | New vein/chunk | Reduction | Reason |
|-----|--------------------|----------------|-----------|-------|
| Osmium | 6 | 1 | -83% | Only a starter aid for Mekanism T1 |
| Tin (Mekanism) | 5 | 1 | -80% | Bronze alloys entry |
| Certus (AE2, deep) | 3 | 1 | -67% | AE2 needs a node to scale |
| Diamond | 1 | 0.3 | -70% | Very rare, heavily node-focused |

---

## Zone 4 — Abyss (Y -96 to -48)

**Tier 4 — practically no natural occurrence**

| Ore | New vein/chunk | Notes |
|-----|----------------|---------|
| Uranium | 0.3 | Almost only accessible via node |
| Lead | 0.5 | Minimal natural |
| Fluorite | 0.3 | Chemicals gate |
| Osmium (peak) | 1 | Higher concentration for late T3 |

---

## Zone 5 — Void Layer (Y -128 to -96)

**Tier 5 — nodes only, no natural occurrence**

| Ore | New vein/chunk | Notes |
|-----|----------------|---------|
| Ancient Debris | 0.2 | Practically boss/node only |
| Osmium mega-cluster | 0.5 | Large veins for late-game bulk |

---

## Create Ore Excavation — Node System

### How It Works
Create Ore Excavation places large **ore nodes** (dense ore clusters) in the world.
A node contains ~200-500 ores bundled in one place. With a Create drill rig
(Mechanical Drill + contraption) the node is tapped **infinitely renewably**.

Hand mining a node gives ~20-30 ores (starter aid). Create automation gives hundreds
of ores per hour as long as the rig runs.

### Node Table — All Ores

| Node type | Zone | Y center | Radius between nodes | Starter aid | Create output/h |
|----------|------|-----------|----------------------|------------|-----------------|
| Coal Node | 1 | +96 | ~300 blocks | 40 units | ~800 |
| Iron Node | 1 | +48 | ~350 blocks | 30 units | ~600 |
| Copper Node | 1 | +64 | ~350 blocks | 25 units | ~500 |
| Zinc Node | 2 | +20 | ~400 blocks | 20 units | ~400 |
| Gold Node | 2 | -10 | ~500 blocks | 20 units | ~300 |
| Lapis Node | 2 | +10 | ~500 blocks | 15 units | ~250 |
| Redstone Node | 2 | -15 | ~400 blocks | 25 units | ~500 |
| Source Gem Node | 2 | +20 | ~600 blocks | 15 units | ~200 |
| Diamond Node | 3 | -35 | ~800 blocks | 10 units | ~150 |
| Osmium Node | 3 | -30 | ~600 blocks | 20 units | ~350 |
| Tin Node | 3 | -25 | ~600 blocks | 20 units | ~300 |
| Certus Node | 3 | -30 | ~700 blocks | 15 units | ~200 |
| Uranium Node | 4 | -70 | ~1200 blocks | 8 units | ~100 |
| Lead Node | 4 | -65 | ~900 blocks | 12 units | ~150 |
| Fluorite Node | 4 | -60 | ~900 blocks | 10 units | ~120 |
| Ancient Debris Node | 5 | -110 | ~2000 blocks | 5 units | ~50 |

> **Note on output/h**: a guideline value for a medium Create drill rig (4 drills,
> 128 RPM). Adjust real values after testing.

### Node Spawn Rate Configuration
```toml
# config/createoreexcavation-common.toml (generated after first start)
# Nodes rarer than default to increase exploration value
nodeSpawnRarity = 0.4        # default ~1.0 — reduced to 40%
nodeRenewable = true         # nodes infinitely renewable via Create
nodeHandMiningYield = 0.1    # hand mining gives only 10% of the node content (starter aid)
```

---

## Quest Integration

| Quest | Trigger | Reward |
|-------|---------|-----------|
| "Gaia's Veins" (T1) | First iron node found | Create Drill schematic |
| "Dig Deeper" (T2) | First zinc node tapped (Create drill rig active) | Mekanism Osmium Compass |
| "The Black Gold" (T3) | First osmium node with Create automation | Mekanism Basic Machine set |
| "From the Depths" (T4) | First uranium node found | PNC Pressure Tube kit |
| "Beneath the World" (T5) | Ancient Debris node found | Endgame crafting component |

A hypothetical "ore compass" (via KubeJS or Create Ore Excavation built-in) can
guide players to the nearest node of the desired type — important for multiplayer, so
players don't search for hours.

---

## Implementation Order

1. **Check Create Ore Excavation config** (after first start): node rarity, renewal mechanic
2. **Mekanism datapack override** for osmium/uranium/lead vein-count reduction
3. **Vanilla placed features override** for diamond/gold reduction (`kubejs/data/minecraft/worldgen/placed_feature/`)
4. **AE2 Certus override** for reduced natural distribution
5. **Testing**: validate nodes and natural ore distribution in-game with `/locate` and F3+G
