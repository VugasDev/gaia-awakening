# Complete Enchantment System

> Three mods, three roles — no mod does everything alone.

```
Create: Enchantment Industry  →  Automation, copying, combining, Liquid XP
Enchantment Library Standalone →  Store & retrieve progress
PneumaticCraft Pressure Chamber →  Large jumps to extreme levels
```

---

## Overview: Tier System

```
Level 1–5     Vanilla / Apotheosis Enchanting Table
Level 6–10    Apotheosis (cap removed) + Create EI Blaze Forger automation
Level 11–25   PneumaticCraft Pressure Chamber Tier 1  (2.5 bar)
Level 26–50   Create EI pipeline: Library → Printer → Blaze Forger → Library
Level 51–100  PneumaticCraft Pressure Chamber Tier 2  (6.0 bar)
```

---

## The Three Building Blocks

### Building Block 1 — Create: Enchantment Industry

**Status**: ✓ NeoForge 1.21.1 (v2.2.4)

**Relevant machines:**

| Machine | Function |
|----------|---------|
| **Experience Hatch** | Player XP → Liquid Experience (fluid) |
| **Blaze Forger** | Automated anvil — combines books + Liquid XP |
| **Blaze Enchanter** | Raises an enchantment level by +1 with Liquid Hyper XP |
| **Printer** | Copies an enchanted book (book + Liquid XP → 2 books) |
| **Disenchanter** | Pulls enchantments out of items → Liquid XP |
| **Mechanical Grindstone** | Automated grindstone (remove enchants) |

**Liquid Hyper Experience:**
- Production: 100 mB Liquid XP + Mechanical Mixer → 10 mB Hyper XP
- Ratio: 10:1 — expensive, but necessary for levels > vanilla cap
- Blaze Enchanter: 1 book + Hyper XP → book with level +1

---

### Building Block 2 — Enchantment Library Standalone

**Status**: ✓ NeoForge 1.21.1

**Function:**
- Insert books → converted into "Enchantment Points"
- Retrieve points → extract any book at any stored level
- XP cost on extraction (scales quadratically with level)
- Direct disenchanting of items possible

**Controls:**
| Action | Key combination |
|--------|------------------|
| Extract 1 level | Left-click |
| Extract max level | Shift + Left-click |
| Return 1 level | Ctrl + Left-click |

**Role in the system**: the "savings account" for enchantment progress.

---

### Building Block 3 — PneumaticCraft Pressure Chamber

From `planning/quests/pneumaticraft-enchantment-path.md` — large jumps:
- **2.5 bar**: Level 10 → Level 25 (T1 jump)
- **6.0 bar**: Level 50 → Level 100 (T2 jump)

---

## The Complete Workflow

### Phase 1: Foundation (Level 1–10)

```
Apotheosis Enchanting Table (with more bookshelves)
        ↓
Sharpness V book (max vanilla)
        ↓
Create EI: Blaze Forger + Liquid XP
  2× Sharpness V → Sharpness VI
  2× Sharpness VI → Sharpness VII
  ...
  → Sharpness X
        ↓
Enchantment Library: Sharpness X stored ✓
```

*Automation here is simple: Blaze Forger on a conveyor with pairs, XP tank next to it.*

---

### Phase 2: The Big Jump (Level 10 → 25)

```
Enchantment Library: retrieve Sharpness X
        ↓
PneumaticCraft Pressure Chamber (2.5 bar)
  + Mekanism Refined Obsidian (4×)
  + Apotheosis Normal Gem (2×)
        ↓
Sharpness XXV (1 book)
        ↓
Enchantment Library: Sharpness XXV stored ✓
```

---

### Phase 3: Granular Increase (Level 25–50)

```
Enchantment Library: retrieve Sharpness XXV
        ↓
Create EI: Printer + Liquid XP
  1× Sharpness XXV → 2× Sharpness XXV (copy)
        ↓
Create EI: Blaze Enchanter + Liquid Hyper XP
  2× Sharpness XXV → Sharpness XXVI
  (Apotheosis level cap removed → works above vanilla max)
        ↓
Enchantment Library: store Sharpness XXVI ✓
        ↓
Repeat until Sharpness L (Level 50)
```

**XP demand per step grows** → requires an automated XP farm:
- Industrial Foregoing: Mob Factory → XP drops
- Create EI Experience Hatch: player XP → Liquid XP
- Create EI Disenchanter: recycle old items → Liquid XP

---

### Phase 4: Endgame Jump (Level 50 → 100)

```
Enchantment Library: retrieve Sharpness L
        ↓
PneumaticCraft Pressure Chamber (6.0 bar)
  + AE2 Charged Certus Quartz (16×)
  + Apotheosis Mythic Gem (1×)
  + Mekanism Refined Glowstone Ingot (8×)
  + Create: Precision Mechanism (4×)
        ↓
Sharpness C (Level 100) — 1 book
        ↓
Create EI: Printer → copy
        ↓
Anvil onto a Netherite item (Blaze Forger)
```

---

## Automation Pipeline (AE2 + Create EI)

```
[Mob Farm (IF)]
      ↓ XP drops
[Experience Hatch]
      ↓ Liquid XP
[Mechanical Mixer + Basin]
      ↓ Liquid Hyper XP (10:1)
[Fluid Tank (Create)]
      ↓
      ├──→ [Blaze Forger]    ← 2× books from the AE2 network
      │         ↓ combined book
      └──→ [Blaze Enchanter] ← 1 book + Hyper XP
                ↓ level+1 book
           [Enchantment Library] ← AE2 Pattern Provider controls
                ↓ on request
           [Printer]  ← produces 2 copies
                ↓
           back to the Blaze Forger (loop)
```

With AE2 auto-crafting the loop can be fully automated:
- Pattern: `Sharpness(n) × 2 + Hyper XP → Sharpness(n+1)`
- Loop runs until the target level is reached

---

## XP Generation — Stack Synergies

| Source | XP/min (approx.) | Gate |
|--------|-------------|------|
| Manual mob fights | Low | Immediately |
| Iron's Spells fights | Medium | Tier 2 |
| Industrial Foregoing Mob Factory | High | Tier 3 |
| Mystical Agriculture XP crops (via Agradditions) | Medium-high | Tier 3 |
| Apotheosis dungeon bosses | Very high (burst) | Tier 4 |
| Disenchanter: old items → recycling | Variable | From Tier 2 |

---

## KubeJS — Level-Cap Removal (Apotheosis Config)

So the Blaze Forger / Blaze Enchanter works beyond level 5-10:

```javascript
// src/kubejs/startup_scripts/apotheosis_config.js
// Disable Apotheosis level caps per enchantment
// (alternatively via the apotheosis/enchanting.json config file)

// Most Apotheosis caps are controlled via config:
// apotheosis-common.toml → evilcraft.enchantment_max_level = false
// Or via the KubeJS enchantment registry event (check 1.21.1 API)
```

---

## Quest Chapter: "Master of Enchantment"

1. **"Liquid Experience"** — build an Experience Hatch
2. **"The Automatic Anvil"** — get the Blaze Forger running
3. **"Library of Power"** — set up the Enchantment Library
4. **"Sharpness X"** — first manually combined enchantment level 10
5. **"The Jump"** — Pressure Chamber: level 25 in one step
6. **"Printing House"** — Printer: copy your first book
7. **"The Loop"** — automated combining pipeline level 25→50
8. **"Godlike"** — first level 100 enchantment
9. **"The Perfect Sword"** — Netherite sword with Sharpness 100 + further OP enchants

---

## Mod Checklist

| Mod | Role | Status |
|-----|-------|--------|
| Create: Enchantment Industry | Automation, Liquid XP, Printer, Blaze Forger/Enchanter | ✓ 1.21.1 |
| Enchantment Library Standalone | Store & retrieve enchantment progress | ✓ 1.21.1 |
| Apotheosis | Level-cap removal, base enchanting T1-T2 | ✓ 1.21.1 |
| PneumaticCraft: Repressurized | Large jumps (level 10→25, 50→100) | ✓ 1.21.1 |
| Industrial Foregoing | XP farm via Mob Factory | ✓ 1.21.1 |

---

## Open Questions

- [ ] Apotheosis level-cap config: verify the exact key for "remove all caps"
- [ ] Does the Blaze Forger accept books above level 5 without a config change?
- [ ] Enchantment Library: can it interact with the AE2 ME interface (automatically fill/empty)?
- [ ] Liquid Hyper XP: can it be stored in Create fluid tanks?
