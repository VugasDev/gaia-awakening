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
| Occultism silver (overworld + deepslate) | placed_feature override (`occultism:` namespace) |
| Mystical Agradditions nether/end inferium & prosperity | placed_feature override (`mysticalagradditions:` namespace) |
| Terralith fungal cave coal extra | placed_feature override (`terralith:` namespace) |
| Vanilla `ore_gold_extra` (Terralith bonus spawn) | placed_feature override (`minecraft:` namespace, `ore_gold_extra`) |

### Exceptions (left in worldgen, no COE vein)

| Resource | Reason |
|---|---|
| AE2 Certus / Charged Certus | Comes from meteorites, not ore worldgen |
| Amethyst geodes | Crystal growth mechanic, not an ore block |
| Enigmatic Legacy etherium | Intentionally left; rare decorative crystal |
| Iron's Spells mithril | Intentionally left; left as worldgen source |
| RFTools dimensional shard | Intentionally left; dimension-specific mechanic |
| Create: Garnished ores | Intentionally left; food/decoration, not progression |
| Alex's Caves cave-biome ores | Intentionally left; biome-locked, not main progression |
| Occultism iesnium (The Other) | Intentionally left; dimension-gated, not overworld |

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

A vein's drilling recipe gates on `gaia:drills/tierN` where N is the ore's tier. A lower-tier
head on a higher-tier vein produces no useful output.

### Tier → Ore Mapping

| Head | Tier Tag | Finite-vein ores |
|---|---|---|
| Basic Drill Head | T1 | iron, copper, coal |
| Reinforced Drill Head | T2 | gold, zinc, redstone, lapis, osmium, tin, lead, silver (Occultism), nether quartz, MA inferium |
| Osmium Drill Head | T3 | uranium, fluorite |
| Nether Drill Head | T3 | nether gold, glowstone, ancient debris |
| Crystal Drill Head | T3 | diamond, emerald, MA prosperity |
| Refined Obsidian Drill Head | T4 | thorium, uraninite |
| Gaia-Infused Drill Head | T5 | (apex — unlocks T4 ley lines) |

**Deadlock rule:** osmium and nether quartz are both head-crafting inputs and are therefore
capped at T2 — craftable before the heads that need them are made.

---

## One Finite Vein per Ore

COE ties finite/infinite to the recipe id (a single recipe is uniformly finite or infinite),
so each ore has exactly **one finite vein** — no separate ley line. The per-chunk `randomMul`
rolls each vein's amount across a wide range (`veinSize(0.5, 30)` x `finiteAmountBase` 1000 =
~500..30000 raw ore), so most veins are moderate and some are practically inexhaustible.
"Finite now; out-tier it and the next vein is yours." True per-instance "% infinite" would need
a custom mod (tracked as BL-022).

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

**Brine fluid-boost (implemented):** pumping Mekanism Brine (via a Rotary Condensentrator into
fluid form) into the Drilling Machine runs a higher-priority drilling recipe for ~50% more
yield. Mekanism chemicals DO have NeoForge fluid forms (`c:brine`), so they work here. Caveat:
COE only re-selects the recipe on drill-head change and checks fluid type (not amount), so a
fluid recipe and the dry base recipe on the same head can stall if brine runs partially dry —
keep the brine fed.

---

## Implementation Files

| File | Purpose |
|---|---|
| `kubejs/server_scripts/15_ore_progression.js` | Data-driven generator: ORES table → veins, ley lines, drilling recipes |
| `kubejs/server_scripts/14_drill_tier_tags.js` | Defines `gaia:drills/tier1..5` cumulative tags |
| `kubejs/data/minecraft/worldgen/placed_feature/` | Vanilla ore worldgen overrides (chance: 1000000) |
| `config/Mekanism/world.toml` | `shouldGenerate = false` for all Mekanism ores |
| placed_feature overrides (`create:`, `powah:`, `create_new_age:`, `mysticalagriculture:`) | Modded ore worldgen overrides |
