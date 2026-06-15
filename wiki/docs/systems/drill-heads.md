# Drill Head System

Gaia Awakening adds six custom drill heads for use with **Create Ore Excavation**. These extend the standard Create Ore Excavation drill head progression (Andesite / Iron / Steel / Diamond) with three T3 specialist heads, one T4 generalist, one T4 catalyst-focused head, and one T5 mythic head.

All six custom heads are registered under the `#createoreexcavation:drills` item tag and implemented in `kubejs/server_scripts/10_drill_heads.js`.

---

## Drill Head Table

| Item | Tier | Color | Specialty |
|------|------|-------|-----------|
| `gaia:osmium_drill_head` | T3 | Steel-blue | Osmium veins; small Resource Catalyst chance |
| `gaia:crystal_drill_head` | T3 | Ice-blue | Certus Quartz / Amethyst veins; Fluix Crystal bonus |
| `gaia:nether_drill_head` | T3 | Red-orange | Nether veins only; Quartz / Gold / Blaze bonus |
| `gaia:refined_obsidian_drill_head` | T4 | Purple-black | Rich Metal veins with increased output + Catalyst chance |
| `gaia:catalyst_drill_head` | T4 | Amber (glow) | Catalyst Nodes and Catalyst Ley Lines |
| `gaia:gaia_infused_drill_head` | T5 | Emerald green (glow) | Mythic veins; guaranteed Catalyst + Singularity Shard chance |

---

## Crafting Recipes

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

Each drill head has a primary vein type it is optimised for. Using a non-specialist head on a vein still works, but gives reduced output. The Gaia Infused Drill Head unlocks bonus outputs on most vein types.

| Head | Primary Vein | Bonus Output |
|------|-------------|--------------|
| `gaia:osmium_drill_head` | `gaia:osmium_vein` | +`mekanism:raw_osmium`; 1% `gaia:resource_catalyst` chance |
| `gaia:crystal_drill_head` | `gaia:certus_vein` | 4× `ae2:certus_quartz_crystal`; 25% `ae2:fluix_crystal` chance |
| `gaia:nether_drill_head` | `gaia:nether_vein` | 6× nether quartz; gold nuggets; 30% blaze powder |
| `gaia:refined_obsidian_drill_head` | `gaia:rich_metal_vein` | Raw iron ×8, raw osmium ×2; 3% catalyst chance |
| `gaia:catalyst_drill_head` | `gaia:catalyst_node_vein`, `gaia:catalyst_ley_line` | 5× `gaia:resource_catalyst`; 8% `gaia:mythic_catalyst` (node) / 5% (ley line) |
| `gaia:gaia_infused_drill_head` | All veins | Guaranteed `gaia:resource_catalyst`; 1–10% `gaia:singularity_shard` |

### Catalyst Nodes and Ley Lines

Two special vein types exist specifically for catalyst farming:

- **Catalyst Node** (`gaia:catalyst_node_vein`) — Always finite. Any drill yields 2+ Resource Catalysts. The Catalyst Drill Head yields 5 Resource Catalysts and an 8% Mythic Catalyst chance per operation.
- **Catalyst Ley Line** (`gaia:catalyst_ley_line`) — Always infinite (renewable). Only the Catalyst Drill Head produces useful output (3 Resource Catalysts, 5% Mythic Catalyst chance). All other heads yield cobblestone.
