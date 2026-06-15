# Custom Recipes

Gaia Awakening modifies a number of vanilla mod recipes via KubeJS to enforce progression order and encourage Create adoption. This page summarises the changes that affect gameplay progression. Full script details are in `kubejs/server_scripts/`.

---

## Progression Gates (05_progression_gates.js)

These three recipes are reworked to lock powerful machines behind prior tech investment.

### AE2 ME Controller

The ME Controller now requires a **Create Precision Mechanism**, preventing players from skipping straight to AE2 digital storage before building a Create Tier 2 setup.

```
A B A
C D C
A B A
```

| Key | Item |
|-----|------|
| `A` | `create:precision_mechanism` |
| `B` | `minecraft:iron_block` |
| `C` | `create:propeller` |
| `D` | `ae2:engineering_processor` |

### Mekanism Enrichment Chamber

The Enrichment Chamber (ore doubling) now requires Create cogwheels, ensuring ore-doubling is not available before a working Create automation setup exists.

```
A B A
C D C
A B A
```

| Key | Item |
|-----|------|
| `A` | `mekanism:ingot_osmium` |
| `B` | `create:cogwheel` |
| `C` | `create:large_cogwheel` |
| `D` | `mekanism:basic_control_circuit` |

### Mekanism Fusion Reactor Controller (T5)

The Fusion Reactor Controller requires a `gaia:singularity_shard`, which only drops from the Cataclysm Apex bosses. This firmly places the fusion reactor behind T5 boss content.

```
A B A
C D C
A B A
```

| Key | Item |
|-----|------|
| `A` | `mekanism:alloy_atomic` |
| `B` | `gaia:singularity_shard` |
| `C` | `mekanism:ingot_refined_obsidian` |
| `D` | `ae2:controller` |

---

## Recipe Harmonisation (02_recipe_harmonization.js)

### Create Addition Electric Motor

The Electric Motor (the Create-to-FE power bridge) had its Osmium gate removed so it is reachable before Mekanism is established. It now uses only Create components.

```
  A  
B C B
  A  
```

| Key | Item |
|-----|------|
| `A` | `create:shaft` |
| `B` | `create:precision_mechanism` |
| `C` | `create:electron_tube` |

### Create Crushed Ore → Mekanism Dust (Enriching)

Create's crushed ores can be processed in the Mekanism Enrichment Chamber to yield 2× metal dust. This bridges the two tech trees at the ore-processing level.

| Input | Output |
|-------|--------|
| `create:crushed_raw_iron` | `2x mekanism:dust_iron` |
| `create:crushed_raw_gold` | `2x mekanism:dust_gold` |
| `create:crushed_raw_copper` | `2x mekanism:dust_copper` |
| `create:crushed_raw_osmium` | `2x mekanism:dust_osmium` |

### PneumaticCraft Air Compressor

The Air Compressor now requires Create Andesite Casing, placing PneumaticCraft entry behind at least Create Tier 1.

```
A B A
C D C
A B A
```

| Key | Item |
|-----|------|
| `A` | `minecraft:iron_ingot` |
| `B` | `create:andesite_casing` |
| `C` | `minecraft:piston` |
| `D` | `minecraft:furnace` |

---

## Mechanical Crafter Recipes (09_mechanical_crafter_recipes.js)

These items now require the Create **Mechanical Crafter** and cannot be made in a standard crafting table. The asymmetric patterns intentionally require thinking about Mechanical Crafter layout.

### Mekanism Purification Chamber (T3 Ore-Tripling Gate)

```
O O B
O C B
O G B
```

| Key | Item |
|-----|------|
| `O` | `mekanism:ingot_osmium` |
| `C` | `mekanism:osmium_compressor` |
| `B` | `create:brass_ingot` |
| `G` | `mekanism:basic_gas_tank` |

### AE2 ME Drive (T3 Mass Storage Gate)

```
B P B
I D I
I I I
```

| Key | Item |
|-----|------|
| `B` | `create:brass_casing` |
| `P` | `create:precision_mechanism` |
| `I` | `minecraft:iron_block` |
| `D` | `ae2:logic_processor` |

### PneumaticCraft Advanced Pressure Tube (T4)

```
  P  
B C B
P   P
  I  
```

| Key | Item |
|-----|------|
| `P` | `create:fluid_pipe` |
| `B` | `create:brass_ingot` |
| `C` | `pneumaticcraft:compressed_iron_block` |
| `I` | `pneumaticcraft:pressure_tube` |

### Mekanism Digital Miner (T4 Auto-Mining Gate)

One of the strongest auto-mining tools in the pack, now locked behind Refined Obsidian and Atomic Alloy.

```
  P  
O M O
  A  
```

| Key | Item |
|-----|------|
| `P` | `create:precision_mechanism` |
| `O` | `mekanism:ingot_refined_obsidian` |
| `M` | `mekanism:steel_casing` |
| `A` | `mekanism:alloy_infused` |

---

## Resource Unification (01_resource_unification.js)

NeoForge tag unification is applied so that ore-processing recipes from different mods accept each other's outputs. Standard metals (`iron`, `gold`, `copper`) are unified under `neoforge:ingots/<metal>` and `neoforge:dusts/<metal>` tags. Mekanism's reversed naming convention (`ingot_osmium`) is also mapped to `neoforge:ingots/osmium`.

This change is transparent during play but prevents recipes from failing when a Mekanism-produced ingot is used where a Create-produced one is expected.
