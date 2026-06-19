# Ore Distribution — Gaia Awakening

> **Status**: Implemented on branch `feat/crimsite-ore-progression` (as of 2026-06-19).
> This document reflects the full-COE model. The earlier "super-rare / reduction / node-table"
> planning content has been superseded and removed.

---

## Core Concept: COE as the Sole Ore Source

**All real ore worldgen is disabled.** Every ore is obtained exclusively through
**Create Ore Excavation (COE)** drilling veins. The four Create tinted decorative stones
(Crimsite, Veridium, Ochrum, Asurine) provide the pre-drill bootstrap.

---

## Worldgen Disable — Implementation

| Source | Mechanism |
|---|---|
| Vanilla ores (overworld + nether) | `kubejs/data/minecraft/worldgen/placed_feature/*.json` overrides → `rarity_filter` `chance: 1000000` (effectively zero) |
| Mekanism (osmium, tin, lead, uranium, fluorite) | `config/Mekanism/world.toml` → `shouldGenerate = false` for all five ores |
| Create zinc + striated ores | placed_feature override (`create:` namespace) → `chance: 1000000` |
| Powah uraninite (×3 variants) | placed_feature override (`powah:` namespace) |
| Create New Age thorium | placed_feature override (`create_new_age:` namespace) |
| Mystical Agriculture inferium / prosperity | placed_feature override (`mysticalagriculture:` namespace) |

### Exceptions (left in worldgen, no COE vein)

| Resource | Reason |
|---|---|
| AE2 Certus / Charged Certus | Comes from meteorites, not ore worldgen |
| Amethyst geodes | Crystal growth mechanic, not an ore block |

---

## Bootstrap — Tinted Stone Crush

Before the Drilling Machine is built, metals come exclusively from mining and crushing
Create's four tinted decorative stones. Renewable crafting recipes for these stones have
been removed, so they must be mined from the world.

| Create Stone | Crushing Output |
|---|---|
| Crimsite | Raw Iron |
| Veridium | Raw Copper |
| Ochrum | Raw Gold |
| Asurine | Raw Zinc |

This is sufficient to craft the Drilling Machine (7× Iron Block, 1× Precision Mechanism,
1× Brass Casing) and the Basic Drill Head, which unlocks the full COE system.

---

## Head-Gating Model

Every ore vein is **hard-gated** by a cumulative drill-head tier tag. A lower-tier head
on a higher-tier vein produces no useful output.

### Cumulative Tier Tags

| Tag | Heads included |
|---|---|
| `gaia:drills/tier1` | Basic + all higher tiers |
| `gaia:drills/tier2` | Reinforced + all higher tiers |
| `gaia:drills/tier3` | Osmium, Nether, Crystal + higher tiers |
| `gaia:drills/tier4` | Refined Obsidian + Gaia-Infused |
| `gaia:drills/tier5` | Gaia-Infused only |

A finite vein's drilling recipe gates on `gaia:drills/tierN` where N is the ore's tier.
Its ley line gates on `gaia:drills/tier(N+1)` — one tier above.

### Tier → Ore Mapping

| Head | Tier Tag | Finite-vein ores |
|---|---|---|
| Basic Drill Head | T1 | iron, copper, coal |
| Reinforced Drill Head | T2 | gold, zinc, redstone, lapis, osmium, tin, lead, nether quartz, MA inferium |
| Osmium Drill Head | T3 | uranium, fluorite |
| Nether Drill Head | T3 | nether gold, glowstone, ancient debris |
| Crystal Drill Head | T3 | diamond, emerald, MA prosperity |
| Refined Obsidian Drill Head | T4 | thorium, uraninite |
| Gaia-Infused Drill Head | T5 | (apex — unlocks T4 ley lines) |

**Deadlock rule:** osmium and nether quartz are both head-crafting inputs and are therefore
capped at T2 — craftable before the heads that need them are made.

---

## Finite Vein + Ley Line per Ore

Every ore in the table above has exactly two COE entries:

| Entry | Type | Gate |
|---|---|---|
| Finite vein | `.alwaysFinite()` — depletes permanently | tier tag N |
| Infinite ley line | `.alwaysInfinite()` — rarer placement, unlimited | tier tag N+1 |

"Finite now, infinite once you out-tier it." Ancient debris is the one exception: its
ley line is gated at the Gaia-Infused tier (T5) rather than T4, making it the rarest
renewable resource.

---

## Downstream Multiplication (×16 preserved)

Drilled raw items feed the existing Create / Mekanism processing chain unchanged.
Nothing in the ore block itself carries multipliers.

| Processing stage | Multiplier | Route |
|---|---|---|
| Furnace only | ×1 | Direct smelt |
| Create crushing | ×2 | Crushing Wheel |
| Mekanism enrichment / purification | ×3–4 | Enrichment Chamber → Purification Chamber |
| Full Mekanism chemical chain | up to ×16+ | Chemical Dissolution + Crystallizer + Injection |

**Planned (not yet implemented):** a fluid-boost at the Drilling Machine using a NeoForge
fluid (e.g. lubricant or a custom Gaia fluid). Mekanism chemicals are not NeoForge fluids
and cannot be used here; this enhancement is deferred to a future iteration.

---

## Implementation Files

| File | Purpose |
|---|---|
| `kubejs/server_scripts/15_ore_progression.js` | Data-driven generator: ORES table → veins, ley lines, drilling recipes |
| `kubejs/server_scripts/14_drill_tier_tags.js` | Defines `gaia:drills/tier1..5` cumulative tags |
| `kubejs/data/minecraft/worldgen/placed_feature/` | Vanilla ore worldgen overrides (chance: 1000000) |
| `config/Mekanism/world.toml` | `shouldGenerate = false` for all Mekanism ores |
| placed_feature overrides (`create:`, `powah:`, `create_new_age:`, `mysticalagriculture:`) | Modded ore worldgen overrides |
