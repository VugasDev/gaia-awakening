# Balancing Notes

> **Status**: In planning — implemented with KubeJS

---

## Critical Balancing Problems (out of the box)

### 1. Apotheosis — Enchanting as the foundation, PneumaticCraft as the ceiling-breaker
**Design**: Apotheosis is the normal enchanting system (T1-T2, level 1-10).
Levels above 10 are **exclusively** possible via the PneumaticCraft Pressure Chamber.
**Config**:
- Apotheosis: enable level-cap removal (for Pressure Chamber outputs)
- Apotheosis: limit max level in the normal enchanting table to 10
- High-value gems (Epic, Mythic) only in high-tier dungeons (When Dungeons Arise, YUNG's)
- Gem socketing only unlocked after a Mekanism tier (config or quest gate)

### 2. AE2 — Available too early
**Problem**: players can skip Create automation right after Certus Quartz with AE2.
**Solution**: the ME Controller requires `create:precision_mechanism` and `create:propeller` in the recipe.

### 3. Mekanism ore tripling — Breaks resource balance
**Problem**: 3x yield too early = all other mods lose meaning.
**Solution**: Enrichment Chamber only after Create Tier 2 (precision-mechanism gate).

### 4. Mekanism Fusion Reactor — Infinite energy too easy
**Problem**: the Fusion Reactor makes all other energy sources obsolete.
**Solution**:
- Extremely expensive custom recipe for hohlraum cells
- Quest lock: only unlocked after the "Aeronautics" quest chapter

### 5. Create: Crafts & Additions — FE generation too cheap
**Problem**: electric motors quickly generate massive FE.
**Solution**: config adjustment of the FE/RPM efficiency, not too early in the quest tree.

### 6. Botania Mana Infinity (if chosen)
**Problem**: Endoflame spam trivially generates infinite mana.
**Solution**: config: reduce the Endoflame mana output.

---

## Custom Recipe Plans (KubeJS)

### AE2 ME Controller
```
Vanilla: 8x Iron Block + ME Controller
Custom:  + 4x Create:Precision_Mechanism + 2x Create:Propeller
```

### Mekanism Enrichment Chamber
```
Custom: requires Create:Mechanical_Press in the inventory (via FTB Quests flag, no recipe gate)
Alternatively: custom ingredient = Create gears of Tier 2
```

### Apotheosis Gem Socketing (Vial of Expungement)
```
Custom: + Mekanism:Refined_Obsidian_Ingot as an additional ingredient
```

### Mekanism Fusion Reactor (hohlraum cells)
```
Custom: each hohlraum cell requires AE2:Fluix_Crystal + Create:Precision_Mechanism
```

---

## Config Changes (no KubeJS needed)

| Mod | Config file | Change |
|-----|-------------|---------|
| Mekanism | mekanism/mekanism.toml | Increase Fusion Reactor minimum temp |
| Create | create-common.toml | Contraption entity limit |
| Apotheosis | apotheosis/enchanting.toml | Level-cap removal on, normal table to max 10 |
| Apotheosis | apotheosis/gems.toml | Epic/Mythic gems only in elite dungeon loot |
| Create: C&A | createaddition-common.toml | FE/RPM ratio |
| PneumaticCraft | pneumaticcraft.toml | Max pressure to 10+ bar (for T5) |
| Botania | botania.toml | Reduce Endoflame mana output |

---

## Loot Table Adjustments

- Apotheosis gems (high): only in "When Dungeons Arise" + YUNG's Better Dungeons
- AE2 Meteorite Compass: increase spawn rate (QoL for new players)
- Mekanism schematics: in high-tier dungeon chests
