# The Catalyst System

Two custom items gate progression into Tier 3 and Tier 4 Mystical Agriculture seeds: the **Resource Catalyst** and the **Mythic Catalyst**. Both are implemented in `kubejs/server_scripts/08_catalyst_system.js`.

---

## Resource Catalyst (`gaia:resource_catalyst`)

The Resource Catalyst is required as the center ingredient in every T3 Mystical Agriculture seed recipe. It replaces the vanilla center item in the standard MA crafting pattern.

**T3 seeds gated by Resource Catalyst:**

| Seed | Base Ingredient |
|------|-----------------|
| `mysticalagriculture:gold_seeds` | `minecraft:gold_ingot` |
| `mysticalagriculture:diamond_seeds` | `minecraft:diamond` |
| `mysticalagriculture:emerald_seeds` | `minecraft:emerald` |
| `mysticalagriculture:glowstone_seeds` | `minecraft:glowstone_dust` |

**Recipe pattern:**

```
I B I
B C B
I B I
```

Where `I` = `mysticalagriculture:inferium_essence`, `B` = the base material, `C` = `gaia:resource_catalyst`.

### Acquisition Paths

There are three legitimate ways to obtain a Resource Catalyst:

#### Path 1 — Passive (Ore Excavation)

Resource Catalysts drop from Create Ore Excavation vein blocks as a background bonus. Approximate yield with a mid-size setup is 5–10 catalysts per 12 hours of operation.

| Source | Drop Rate |
|--------|-----------|
| Ore Excavation vein (any ore) | 0.5% per ore block |

#### Path 2 — Mechanical (MA Essence Crafter)

Craft a Resource Catalyst in the Create Mechanical Crafter using Tier 2 Mystical Agriculture essences and an Apotheosis gem. This path scales with farm size (roughly 12–95 catalysts per hour depending on setup).

**Mechanical Crafter pattern:**

```
I I I
L G L
Q Q Q
```

| Key | Item |
|-----|------|
| `I` | `mysticalagriculture:iron_essence` |
| `L` | `mysticalagriculture:lapis_essence` |
| `Q` | `mysticalagriculture:nether_quartz_essence` |
| `G` | `apotheosis:common_gem` |

This recipe requires a Mechanical Crafter — a standard crafting table cannot be used.

#### Path 3 — Active (Various)

| Source | Drop / Rate |
|--------|-------------|
| Mowzie's Mobs bosses (Ferrous Wroughtnaut, Frostmaw, Naga, Barako) | 1× guaranteed per kill (100%) |
| Cataclysm Netherite Monstrosity | 1× guaranteed per kill (100%) |
| When Dungeons Arise chest | 8% per chest |
| YUNG's Better Dungeons chest | 8% per chest |
| YUNG's Better Strongholds chest | 10% per chest |
| Catalyst Altar (Create:EI Spout) | 1× per 1000 mB Hyper Experience |

!!! warning "Planned — not yet available in-game"
    The **Wandering Trader** trade (≈15% chance per trade slot) is designed but currently deactivated. The KubeJS trade-injection event for this Minecraft version has not been confirmed and the hook is commented out in `06_loot_modifications.js`. This path will be re-enabled once the correct event API is identified.

**Catalyst Altar recipe** (`gaia:catalyst_altar` + `create_enchantment_industry:hyper_experience` at 1000 mB via Spout):

```
gaia:catalyst_altar  +  1000 mB Hyper Experience  →  gaia:resource_catalyst
```

---

## Mythic Catalyst (`gaia:mythic_catalyst`)

The Mythic Catalyst is required as the center ingredient in every T4 Mystical Agriculture seed recipe. It has only one source and one automation path.

**T4 seeds gated by Mythic Catalyst:**

| Seed | Base Ingredient |
|------|-----------------|
| `mysticalagriculture:osmium_seeds` | `mekanism:ingot_osmium` |
| `mysticalagriculture:tin_seeds` | `mekanism:ingot_tin` |
| `mysticalagriculture:lead_seeds` | `mekanism:ingot_lead` |
| `mysticalagriculture:uranium_seeds` | `mekanism:ingot_uranium` |
| `mysticalagriculture:fluorite_seeds` | `mekanism:fluorite_gem` |

**Recipe pattern:**

```
I B I
B M B
I B I
```

Where `I` = `mysticalagriculture:prudentium_essence`, `B` = the base material, `M` = `gaia:mythic_catalyst`.

### Acquisition Paths

**There is no alternative crafting path for the Mythic Catalyst.** The only source is the three Cataclysm Apex end-bosses:

| Boss | Drop |
|------|------|
| Ignis (Cataclysm) | 1× `gaia:mythic_catalyst` (100%) |
| Harbinger (Cataclysm) | 1× `gaia:mythic_catalyst` (100%) |
| Ender Guardian (Cataclysm) | 1× `gaia:mythic_catalyst` (100%) |

!!! note "Note"
    The Netherite Monstrosity drops a **Resource Catalyst**, not a Mythic Catalyst.

### Automation — Drygmy Farm (Ars Nouveau)

The only way to automate Mythic Catalyst production is with **Drygmys** from Ars Nouveau combined with a mob effigy of an Apex boss. Drygmys passively generate boss drops when a matching mob statue is placed nearby. This is a late T4 unlock, requiring Ars Nouveau Apprentice rank or higher.

### Catalyst Altar — Mythic Liquid XP Path

A Mythic Catalyst can also be produced at the Catalyst Altar using Mythic Liquid XP:

```
gaia:catalyst_altar  +  500 mB gaia:mythic_liquid_xp  →  gaia:mythic_catalyst
```

See the [XP Economy](xp-economy.md) page for how to produce Mythic Liquid XP.

---

## Drop Rate Summary

| Source | Item | Rate |
|--------|------|------|
| Ore Excavation vein | `gaia:resource_catalyst` | 0.5% per ore |
| When Dungeons Arise chest | `gaia:resource_catalyst` | 8% per chest |
| YUNG's Better Dungeons chest | `gaia:resource_catalyst` | 8% per chest |
| YUNG's Better Strongholds chest | `gaia:resource_catalyst` | 10% per chest |
| Mowzie's Mobs — Ferrous Wroughtnaut (`mowziesmobs:ferrous_wroughtnaut`) | `gaia:resource_catalyst` | 100% (1× per kill) |
| Mowzie's Mobs — Frostmaw (`mowziesmobs:frostmaw`) | `gaia:resource_catalyst` | 100% (1× per kill) |
| Mowzie's Mobs — Naga (`mowziesmobs:naga`) | `gaia:resource_catalyst` | 100% (1× per kill) |
| Mowzie's Mobs — Barako (`mowziesmobs:barakoa`) | `gaia:resource_catalyst` | 100% (1× per kill) |
| Cataclysm Netherite Monstrosity | `gaia:resource_catalyst` | 100% (1× per kill) |
| Cataclysm Apex bosses (Ignis, Harbinger, Ender Guardian) | `gaia:mythic_catalyst` | 100% (1× per kill) |
| Catalyst Altar + 1000 mB Hyper Experience | `gaia:resource_catalyst` | 1× per use |
| Catalyst Altar + 500 mB Mythic Liquid XP | `gaia:mythic_catalyst` | 1× per use |

---

## Place in Progression

| Tier | Gate | What it unlocks |
|------|------|-----------------|
| T3 | `gaia:resource_catalyst` | Gold, Diamond, Emerald, Glowstone MA seeds |
| T4 | `gaia:mythic_catalyst` | Osmium, Tin, Lead, Uranium, Fluorite MA seeds |

The Catalyst System is the primary reason to defeat Cataclysm bosses even for players focused on tech progression. Defeating the three Apex bosses is the only way to access T4 crop automation without relying on Drygmys.
