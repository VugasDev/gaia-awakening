# Catalyst System — Gaia Awakening

> **Status**: Planning document — 2026-05-14
> **Implemented in**: `kubejs/server_scripts/08_catalyst_system.js` + `06_loot_modifications.js`

## Design Principle

MA T3+T4 seeds require `apex:resource_catalyst` or `apex:mythic_catalyst`
as a crafting ingredient. Catalysts have **three legitimate paths**:

```
PASSIVE (Ore Excavation, background)
    │   0.5% drop per ore from a vein
    │   ~5-10 catalysts per 12h with a medium setup
    │
PATH MA-ALTERNATIVE (Farmer with brass-tier Create)
    │   Mechanical Crafter recipe from 3 essence types + Apo gem
    │   ~12-95 catalysts/h depending on farm size
    │
PATH ACTIVE (Adventurer / Endgame)
    │   a) Boss drops: 1x per Mowzie's boss / Netherite Monstrosity
    │   b) Dungeon loot: 8-10% per chest (Dungeons Arise + YUNG's)
    │   c) Catalyst Altar: 1000 mB Hyper XP → 1x catalyst (Create:EI Spout)
    │   d) Wandering Trader: 15% chance for emeralds
    │
↓
T3 MA Seeds: Gold, Diamond, Emerald, Glowstone
```

## Mythic Catalyst — Exclusive

```
SOURCE: Cataclysm apex bosses (Ignis, Harbinger, Ender Guardian)
        1x guaranteed drop per kill

AUTOMATION: Drygmies (Ars Nouveau) + Mob Effigy
        Drygmy farms boss drops passively when a mob statue is set up
        ONLY automation option

NO alternative paths: the Mythic Catalyst has only this one source.
                      Drygmy setup is late-T4 (Ars Nouveau Apprentice+)

↓
T4 MA Seeds: Osmium, Tin, Lead, Uranium, Fluorite (Mekanism via MA Agradditions)
```

## Drop Rates — Overview

| Source | Item | Rate |
|---|---|---|
| Ore Excavation vein | resource_catalyst | 0.5% per ore |
| Dungeons Arise chest | resource_catalyst | 8% per chest |
| YUNG's Better Dungeons | resource_catalyst | 8% per chest |
| YUNG's Better Strongholds | resource_catalyst | 10% per chest |
| Mowzie's Mobs boss | resource_catalyst | 100% (1x per kill) |
| Cataclysm Netherite Monstrosity | resource_catalyst | 100% (1x per kill) |
| **Cataclysm apex final bosses** | **mythic_catalyst** | **100% (1x per kill)** |
| Catalyst Altar (Spout) | resource_catalyst | 1x per 1000 mB Hyper XP |
| Wandering Trader | resource_catalyst | 15% (trade slot) |

## Gameplay Flow Examples

**Engineer (Create + Mekanism focus):**
- Path 1 dominant: drill setup at the first iron vein, accumulates catalysts passively
- Path 3c secondary: Catalyst Altar with surplus Hyper XP from a mob farm
- After 20h: ~50 catalysts → all T3 seeds accessible
- For T4: must defeat Cataclysm bosses (or build a Drygmy facility)

**Botanist (MA focus):**
- Path 2 dominant: large farm + Mechanical Crafter catalyst conversion
- After 20h: ~200+ catalysts → scales into T4 Mythic Catalyst procurement
- For T4: build Drygmies + apex Mob Effigy → passive Mythic Catalyst production

**Adventurer (boss/dungeon focus):**
- Path 3a/3b dominant: active world exploration
- After 20h: ~30 catalysts + 2-3 Mythic Catalysts from apex bosses
- Mythic Catalyst lead: can craft T4 seeds earlier than other paths

## Implementation Status

| Component | File | Status |
|---|---|---|
| Custom items registered | `startup_scripts/00_custom_items.js` | ✅ |
| Catalyst Altar block | `startup_scripts/00_custom_items.js` | ✅ |
| Ore Excavation drop | `server_scripts/06_loot_modifications.js` | ⚠️ TODO verify loot table path |
| Boss drops T3 | `server_scripts/06_loot_modifications.js` | ⚠️ TODO verify boss IDs |
| Boss drops Mythic | `server_scripts/06_loot_modifications.js` | ⚠️ TODO verify Cataclysm IDs |
| Dungeon loot | `server_scripts/06_loot_modifications.js` | ⚠️ TODO verify loot tables |
| MA Crafter recipe | `server_scripts/08_catalyst_system.js` | ⚠️ TODO verify essence IDs |
| Catalyst Altar Spout recipe | `server_scripts/08_catalyst_system.js` | ⚠️ TODO Create:EI fluid API |
| MA T3 seed overrides | `server_scripts/08_catalyst_system.js` | ⚠️ TODO verify seed IDs |
| MA T4 seed overrides | `server_scripts/08_catalyst_system.js` | ⚠️ TODO verify seed IDs |
| Wandering Trader hook | — | ❌ Not yet implemented |

## Verification on First Boot

After a pack reload, check `logs/kubejs/server.log` for the following errors:
- `Unknown item: mysticalagriculture:iron_essence` → correct the IDs
- `Unknown loot table: createoreexcavation:vein/*` → possibly BlockEvents fallback
- `Unknown fluid: create_enchantment_industry:hyper_experience` → check the ID
- `Unknown entity: cataclysm:ignis` → verify Cataclysm IDs via Jade
