# Drill Head System

Gaia Awakening adds eight custom drill heads for use with **Create Ore Excavation**. Two lower-tier heads (T1/T2) bridge the early game before the six specialist heads unlock at T3+. COE's built-in Iron, Diamond, and Netherite Drill heads are disabled; these custom heads replace them entirely.

All custom heads are registered under the `#createoreexcavation:drills` item tag and implemented in `kubejs/server_scripts/10_drill_heads.js`.

---

## Drilling Machine Gate

The COE Drilling Machine recipe is significantly more expensive than vanilla:

| Ingredient | Quantity |
|---|---|
| Iron Block | 7 |
| Precision Mechanism | 1 |
| Brass Casing | 1 |

This gate ensures the Drilling Machine is a mid-game milestone, not a day-one build.

---

## Drill Head Tier Table

Every ore vein and ley line is **hard-gated** by a cumulative drill-head tier tag. A lower-tier head on a higher-tier vein produces no useful output. Higher-tier heads satisfy all lower-tier requirements.

### Cumulative Tier Tags

| Tag | Heads that satisfy it |
|---|---|
| `gaia:drills/tier1` | Basic + all higher tiers |
| `gaia:drills/tier2` | Reinforced + all higher tiers |
| `gaia:drills/tier3` | Osmium, Nether, Crystal + higher tiers |
| `gaia:drills/tier4` | Refined Obsidian + Gaia-Infused |
| `gaia:drills/tier5` | Gaia-Infused only |

### Head → Ore Mapping

Each ore has a **finite vein** (gated at tier N) and an **infinite ley line** (gated at tier N+1).
The ley line becomes drillable once the player reaches the next tier — "finite now, infinite once you out-tier it."

| Head | Tier | Finite-vein ores | Ley-line gate |
|---|---|---|---|
| Basic Drill Head | T1 | iron, copper, coal | T2 (Reinforced) |
| Reinforced Drill Head | T2 | gold, zinc, redstone, lapis, osmium, tin, lead, nether quartz, MA inferium | T3 (any T3 head) |
| Osmium Drill Head | T3 | uranium, fluorite | T4 (Refined Obsidian) |
| Nether Drill Head | T3 | nether gold, glowstone, ancient debris | T4 (Refined Obsidian) |
| Crystal Drill Head | T3 | diamond, emerald, MA prosperity | T4 (Refined Obsidian) |
| Refined Obsidian Drill Head | T4 | thorium, uraninite | T5 (Gaia-Infused) |
| Gaia-Infused Drill Head | T5 | (apex — unlocks all T4 ley lines) | — |

!!! note "Deadlock rule"
    Osmium and nether quartz are ingredients in higher-tier drill head recipes, so they
    are deliberately capped at T2 — always accessible before the heads that require them.

!!! note "T3 specialist heads"
    The three T3 heads (Osmium, Nether, Crystal) are parallel specialists. Any T3 head
    satisfies `gaia:drills/tier3`, so a T3 ore is drillable by whichever specialist
    the player has built first.

---

## Drill Head Reference

| Item | Tier | Specialty |
|------|------|-----------|
| `gaia:basic_drill_head` | T1 | General-purpose entry head; works on T1 finite veins |
| `gaia:reinforced_drill_head` | T2 | Improved yield and speed over Basic; works on T2 finite veins |
| `gaia:osmium_drill_head` | T3 | Uranium / fluorite veins; small Resource Catalyst chance |
| `gaia:crystal_drill_head` | T3 | Diamond / emerald / prosperity veins; Fluix Crystal bonus |
| `gaia:nether_drill_head` | T3 | Nether biome veins only; Quartz / Gold / Blaze bonus |
| `gaia:refined_obsidian_drill_head` | T4 | Thorium / uraninite veins; increased output + Catalyst chance |
| `gaia:catalyst_drill_head` | T4 | Catalyst Nodes and Catalyst Ley Lines |
| `gaia:gaia_infused_drill_head` | T5 | Apex head; unlocks T4 ley lines; bonus outputs on all vein types |

---

## Crafting Recipes

### Basic Drill Head (T1)

```
I I I
I A I
I A I
```

| Key | Item |
|-----|------|
| `I` | `minecraft:iron_ingot` |
| `A` | `create:andesite_alloy` |

### Reinforced Drill Head (T2)

```
B I B
I D I
B I B
```

| Key | Item |
|-----|------|
| `B` | `create:brass_ingot` |
| `I` | `minecraft:iron_ingot` |
| `D` | `gaia:basic_drill_head` |

### Osmium Drill Head (T3)

```
O O O
O C O
O A O
```

| Key | Item |
|-----|------|
| `O` | `mekanism:ingot_osmium` |
| `C` | `gaia:crushed_osmium` |
| `A` | `create:andesite_casing` |

### Crystal Drill Head (T3)

```
C A C
A O A
C A C
```

| Key | Item |
|-----|------|
| `C` | `ae2:certus_quartz_crystal` |
| `A` | `minecraft:amethyst_shard` |
| `O` | `mekanism:ingot_osmium` |

### Nether Drill Head (T3)

```
Q B Q
B N B
Q B Q
```

| Key | Item |
|-----|------|
| `Q` | `minecraft:nether_quartz` |
| `B` | `minecraft:blaze_rod` |
| `N` | `minecraft:magma_block` |

!!! warning "Nether-only"
    The Nether Drill Head only works on Nether biome veins. It produces cobblestone when used on Overworld veins.

### Refined Obsidian Drill Head (T4)

```
R O R
O P O
R B R
```

| Key | Item |
|-----|------|
| `R` | `mekanism:ingot_refined_obsidian` |
| `O` | `mekanism:ingot_osmium` |
| `P` | `create:precision_mechanism` |
| `B` | `create:brass_casing` |

### Catalyst Drill Head (T4)

Requires 4× Resource Catalyst as part of the recipe — the head is gated behind having already acquired some catalysts.

```
C R C
R P R
C R C
```

| Key | Item |
|-----|------|
| `C` | `gaia:resource_catalyst` |
| `R` | `mekanism:ingot_refined_obsidian` |
| `P` | `create:precision_mechanism` |

### Gaia Infused Drill Head (T5)

This is a shapeless upgrade of the Refined Obsidian Drill Head. It requires a Mythic Catalyst, which means the Cataclysm Apex bosses must have been defeated first.

**Ingredients:**

- `gaia:refined_obsidian_drill_head`
- `mekanism:alloy_atomic`
- `gaia:singularity_shard`
- `gaia:mythic_catalyst`

---

## Vein Compatibility

Each drill head has a primary vein type it is optimised for. The Gaia Infused Drill Head unlocks bonus outputs on most vein types.

| Head | Primary Vein | Bonus Output |
|------|-------------|--------------|
| `gaia:osmium_drill_head` | `gaia:osmium_vein` | +`mekanism:raw_osmium`; 1% `gaia:resource_catalyst` chance |
| `gaia:crystal_drill_head` | `gaia:certus_vein` | 4× `ae2:certus_quartz_crystal`; 25% `ae2:fluix_crystal` chance |
| `gaia:nether_drill_head` | `gaia:nether_vein` | 6× nether quartz; gold nuggets; 30% blaze powder |
| `gaia:refined_obsidian_drill_head` | `gaia:rich_metal_vein` | Raw iron ×8, raw osmium ×2; 3% catalyst chance |
| `gaia:catalyst_drill_head` | `gaia:catalyst_node_vein`, `gaia:catalyst_ley_line` | 5× `gaia:resource_catalyst`; 8% `gaia:mythic_catalyst` (node) / 5% (ley line) |
| `gaia:gaia_infused_drill_head` | `gaia:mythic_vein` (Nether-only, ancient-debris-based) | Guaranteed `gaia:mythic_catalyst` + `gaia:ancient_debris` + 10% `gaia:singularity_shard`; also provides bonus outputs on osmium, certus, nether, and rich-metal veins |

### Catalyst Nodes and Ley Lines

Two special vein types exist specifically for catalyst farming:

- **Catalyst Node** (`gaia:catalyst_node_vein`) — Always finite. Any drill yields 2+ Resource Catalysts. The Catalyst Drill Head yields 5 Resource Catalysts and an 8% Mythic Catalyst chance per operation.
- **Catalyst Ley Line** (`gaia:catalyst_ley_line`) — Always infinite (renewable). Only the Catalyst Drill Head produces useful output (3 Resource Catalysts, 5% Mythic Catalyst chance). All other heads yield cobblestone.
