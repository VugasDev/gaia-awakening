# PneumaticCraft — Enchantment Escalation Path

> **Design goal**: PneumaticCraft as an optional but rewarding endgame path.
> The Pressure Chamber is the only way to raise enchantments beyond Apotheosis limits.
> Players can use normal Apotheosis enchants — but whoever wants OP must master PneumaticCraft.

---

## Enchantment Tier System

| Tier | Level range | Crafting station | Pressure | Gate |
|------|------------|-----------------|-------|------|
| T1 — Normal | 1–5 | Vanilla anvil | — | Immediately |
| T2 — Enhanced | 6–10 | Apotheosis Enchanting | — | Apotheosis table Tier 3 |
| T3 — Advanced | 11–25 | Pressure Chamber | 2–4 bar | PneumaticCraft unlocked |
| T4 — Elite | 26–50 | Pressure Chamber | 4–6 bar | High-pressure upgrade |
| T5 — Godlike | 51–100 | Pressure Chamber | 6–8+ bar | Endgame materials |

---

## Apotheosis Config Adjustments

In `src/config/apotheosis/enchanting.json` (or similar):

```json
{
  "enchantment_caps": {
    "enabled": true,
    "remove_max_level_cap": true,
    "allow_above_max_on_anvil": true
  }
}
```

> Apotheosis allows removing the enchantment level caps via config.
> Without this config change, the game ignores levels > vanilla max on the anvil.

---

## KubeJS — Pressure Chamber Recipes

File: `src/kubejs/server_scripts/pneumaticraft_enchantments.js`

### Principle

Every upgrade combines:
- N×  book (current level)
- Special materials (increase with tier)
- Pressure requirement (increases with tier)

### Tier 3: Level 6-10 → Level 25 (pressure: 3.5 bar)

```javascript
// Example: Sharpness X → Sharpness XXV
// Materials: Mekanism Refined Obsidian + Apotheosis Gem (Normal)
ServerEvents.recipes(event => {

  // Helper function: Pressure Chamber recipe
  const pressureChamber = (inputs, outputs, pressure) => {
    event.custom({
      type: "pneumaticcraft:pressure_chamber",
      inputs: inputs,
      outputs: outputs,
      pressure: pressure
    })
  }

  // Sharpness: T2 (X) → T3 (XXV)
  pressureChamber(
    [
      { item: "minecraft:enchanted_book", count: 3,
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":10}]}' },
      { item: "mekanism:ingot_refined_obsidian", count: 4 },
      { item: "apotheosis:gem_normal", count: 2 }
    ],
    [
      { item: "minecraft:enchanted_book",
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":25}]}' }
    ],
    3.5
  )

  // Protection: T2 (X) → T3 (XXV)
  pressureChamber(
    [
      { item: "minecraft:enchanted_book", count: 3,
        nbt: '{"StoredEnchantments":[{"id":"minecraft:protection","lvl":10}]}' },
      { item: "mekanism:ingot_refined_obsidian", count: 4 },
      { item: "apotheosis:gem_normal", count: 2 }
    ],
    [
      { item: "minecraft:enchanted_book",
        nbt: '{"StoredEnchantments":[{"id":"minecraft:protection","lvl":25}]}' }
    ],
    3.5
  )

  // ... further enchantments following the same pattern

})
```

### Tier 4: Level 25 → Level 50 (pressure: 5.5 bar)

```javascript
  // Sharpness: T3 (XXV) → T4 (L)
  pressureChamber(
    [
      { item: "minecraft:enchanted_book", count: 2,
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":25}]}' },
      { item: "ae2:fluix_crystal", count: 8 },
      { item: "apotheosis:gem_epic", count: 1 },
      { item: "mekanism:alloy_atomic", count: 2 }
    ],
    [
      { item: "minecraft:enchanted_book",
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":50}]}' }
    ],
    5.5
  )
```

### Tier 5: Level 50 → Level 100 (pressure: 7.5 bar)

```javascript
  // Sharpness: T4 (L) → T5 (C)
  pressureChamber(
    [
      { item: "minecraft:enchanted_book", count: 2,
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":50}]}' },
      { item: "ae2:certus_quartz_crystal_charged", count: 16 },
      { item: "apotheosis:gem_mythic", count: 1 },
      { item: "mekanism:ingot_refined_glowstone", count: 8 },
      { item: "create:precision_mechanism", count: 4 }
    ],
    [
      { item: "minecraft:enchanted_book",
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":100}]}' }
    ],
    7.5
  )
```

---

## Prioritized Enchantments for the System

These enchantments all get the 5 tier recipes:

### Offensive
| Enchantment | T3 (25) | T4 (50) | T5 (100) |
|-------------|---------|---------|----------|
| Sharpness | ✓ | ✓ | ✓ |
| Power (bow) | ✓ | ✓ | ✓ |
| Smite | ✓ | ✓ | — |
| Bane of Arthropods | ✓ | ✓ | — |

### Defensive
| Enchantment | T3 (25) | T4 (50) | T5 (100) |
|-------------|---------|---------|----------|
| Protection | ✓ | ✓ | ✓ |
| Fire Protection | ✓ | ✓ | — |
| Blast Protection | ✓ | ✓ | — |
| Feather Falling | ✓ | ✓ | — |

### Utility
| Enchantment | T3 (25) | T4 (50) | T5 (100) |
|-------------|---------|---------|----------|
| Efficiency | ✓ | ✓ | ✓ |
| Fortune | ✓ | ✓ | — |
| Looting | ✓ | ✓ | — |
| Unbreaking | ✓ | ✓ | — |
| Mending | ✓ | — | — |

> **T5 (100)** stays limited to a few iconic enchants: Sharpness, Protection, Efficiency.
> This keeps the "Godlike" character of these items.

---

## Materials Overview per Tier

| Tier | Main materials | Pressure | Acquisition |
|------|-----------------|-------|-------------|
| T3 (→25) | Mekanism Refined Obsidian, Apotheosis Gem Normal | 3.5 bar | Mid-game |
| T4 (→50) | AE2 Fluix Crystal, Apotheosis Gem Epic, Mekanism Atomic Alloy | 5.5 bar | Late-game |
| T5 (→100) | AE2 Charged Certus, Apotheosis Gem Mythic, Mekanism Glowstone, Create Precision Mech. | 7.5 bar | Endgame |

> All materials from different mod paths → prevents a single-mod rush

---

## Quest Chapter: "Under Pressure"

Planned quest chain for PneumaticCraft:

1. **"First Compression"** — build a Compressor
2. **"The Chamber"** — build a complete Pressure Chamber
3. **"Under Pressure"** — reach 4 bar
4. **"Enhanced Enchanting"** — first Tier-3 enchantment (level 25)
5. **"High-Pressure Zone"** — reach 6 bar (high-pressure upgrade)
6. **"Elite Levels"** — first Tier-4 enchantment (level 50)
7. **"God Mode"** — first Tier-5 enchantment (level 100)
8. **"Indestructible"** — put a level-100 enchantment on a Netherite item

---

## Balancing Considerations

- **Pressure Chamber ≠ beginner content**: the required materials guarantee this stays late-game
- **Pressure is the gate**: higher pressure requires better compressors (PneumaticCraft progression)
- **Materials are cross-mod**: players MUST advance AE2, Mekanism AND Apotheosis
- **Number of input books**: several books as input prevents "1 book = 1 god book"
- **No Mending T5**: Mending level 100 would be absolutely overpowered — stays limited to T3

---

## Open Implementation Questions

- [ ] Apotheosis config: check the exact config key for level-cap removal
- [ ] Verify the NBT syntax for StoredEnchantments in NeoForge 1.21.1 (possibly `"id"` as a ResourceLocation)
- [ ] Test PneumaticCraft KubeJS integration (plugin available?)
- [ ] Balance the pressure values (7.5 bar = high-pressure tier in PneumaticCraft?)
- [ ] Verify Apotheosis gem names/IDs
