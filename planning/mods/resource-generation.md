# Resource Generation — Overview

> **Design goal**: several parallel paths to resource generation that complement each other meaningfully.
> No method is inherently "the best" — context decides (early game vs. late game).

---

## Resource Generation Pyramid

```
                        [Endgame]
                    Mekanism Digital Miner
                   (targeted, automated)
                 PneumaticCraft Mining Drones
                   (programmable, precise)
              ──────────────────────────────────
                       [Late Game]
               Mystical Agriculture Tier 5-6
               (infinite, but slow & expensive)
                  Create Mining Contraptions
                   (large areas, efficient)
              ──────────────────────────────────
                       [Mid Game]
               Mystical Agriculture Tier 2-4
                 (reliable, plannable)
                  Serene Seasons Farming
                  (seasonal synergies)
              ──────────────────────────────────
                       [Early Game]
               Vanilla Mining + Apotheosis Fortune
                     Create: Deep Dark
                    (boosted drops)
```

---

## Method 1: Mystical Agriculture (main generation path)

**Status**: ✓ NeoForge 1.21.1 | ✓ Modrinth
**Add-on**: Mystical Agradditions ✓ (Tier 6 Insanium crops)

### Design

Mystical Agriculture allows growing resources as plants.
There are 6 tiers, ranging from common to extremely rare:

| Tier | Example resources | Gate |
|------|-------------------|------|
| T1 | Dirt, wood, stone | Early game |
| T2 | Coal, iron, copper | Create T1 |
| T3 | Gold, quartz, lapis lazuli | Create T2 |
| T4 | Diamond, osmium, ender pearl | Mekanism T1 |
| T5 | Netherite, certus quartz, uranium | Mekanism T3 |
| T6 (Insanium) | Netherite scrap (fast), specialties | Endgame |

### Synergies in the Stack

```
Serene Seasons   →  affects growth rate (summer = faster)
Farmer's Delight →  harvest mechanics share farmland logic
Mekanism         →  Crop Matron (automatic fertilizer/irrigation)
Create           →  Mechanical Arm harvests automatically
AE2              →  ME network stores crops automatically
```

### Crops for the Modpack Stack

We need Mystical Agradditions integration for:
- **Osmium Crop** (Mekanism)
- **Certus Quartz Crop** (AE2)
- **Compressed Iron Crop** (PneumaticCraft)
- **Refined Obsidian Crop** (Mekanism, endgame)
- **Fluix Crystal Crop** (AE2, endgame)

---

## Method 2: Create Mining Contraptions

**Built into Create (no extra mod needed)**

### Mining Drill Contraption

Create enables mechanical mining contraptions with drill heads:
- Mobile drill on rails (Steam 'n' Rails)
- Automatic mine in strip-mining style
- Resources go straight onto the Create conveyor

**Progression:**
1. First drill (early game): small manual drill
2. Rail drill (midgame): Steam 'n' Rails train with a drill front
3. Large Aeronautics drill (late): flying mining platform (Aeronautics!)

---

## Method 3: Mekanism Digital Miner

**Part of Mekanism (no extra mod)**

- Specific ore targeting (only diamonds, only osmium etc.)
- Adjustable radius (max 32 blocks)
- Requires massive FE energy
- Ideal for targeted late-game resources

**Gate**: Mekanism T3 + a large energy source

---

## Method 4: PneumaticCraft Drones

**Part of PneumaticCraft: Repressurized**

- Programmable drones with mining behavior
- Precise item filtering (only fetches certain ores)
- Drones need compressed air (PneumaticCraft infrastructure)
- Can store directly into the ME network in combination with AE2

**Gate**: PneumaticCraft T2 + drone programming unit

---

## Method 5: Serene Seasons — Seasonal Resources

**Status**: ✓ NeoForge 1.21.1 | ✓ Modrinth

Serene Seasons affects:
- Plant growth (Mystical Agriculture: summer = +20% growth rate)
- Biome-specific events (some resources seasonal)
- Farmer's Delight: seasonal ingredients

**Balancing option**: drop rare resources only in certain seasons
(via loot-table customization + KubeJS)

---

## Resource Generation Matrix

| Resource | Mystical Agri | Create Mining | Digital Miner | PNC Drones |
|-----------|:---:|:---:|:---:|:---:|
| Iron | T2 ✓ | ✓ | ✓ | ✓ |
| Gold | T3 ✓ | ✓ | ✓ | ✓ |
| Diamond | T4 ✓ | ✓ | ✓ | ✓ |
| Osmium | T4 ✓ | ✓ | ✓ | ✓ |
| Certus Quartz | T5 ✓ | — (meteors) | ✓ | ✓ |
| Netherite | T5 ✓ | Nether only | ✓ | ✓ |
| Uranium | T5 ✓ | ✓ | ✓ | ✓ |
| Ancient Debris | — | Nether | Nether | Nether |

---

## Energy Generation Overview

> Resource generation needs energy — here's the stack:

| Mod | Source | Tier | FE/t |
|-----|--------|------|------|
| Create: C&A | Rotating machines | T2 | medium |
| Create: Diesel | Oil combustion | T2-3 | medium-high |
| Powah: Rebooted | Solar, thermo, reactor | T2-4 | medium-very high |
| Mekanism: Gen | Solar, wind, gas-burning | T3-4 | high |
| Mekanism: Gen | Bio-fuel generator | T2 | low |
| Mekanism: Gen | Fusion Reactor | T5 | extreme |

**Powah: Rebooted** fills a nice gap:
- Earlier mid-game than Mekanism generators
- Energizing recipes (crafting with energy) as an interesting mechanic
- No huge infrastructure effort
- **Recommendation**: add to the modpack as an energy bridge T2→T3

---

## New Mods for the Resource System

| Mod | Purpose | Status | Priority |
|-----|-------|--------|-----------|
| **Mystical Agriculture** | Crop-based resources | ✓ 1.21.1 | Mandatory |
| **Mystical Agradditions** | Tier 6 + modded crops | ✓ 1.21.1 | Mandatory |
| **Serene Seasons** | Seasons + farming synergies | ✓ 1.21.1 | Recommended |
| **Powah: Rebooted** | Energy bridge mid-game | ✓ 1.21.1 | Recommended |

---

## Open Questions

- [ ] Compressed Creativity (Create↔PNC) NOT for 1.21.1 — watch after release
- [ ] Mystical Agradditions: which mod crops are supported? Osmium, Certus, Compressed Iron?
- [ ] Serene Seasons: check the exact influence on Mystical Agriculture growth
- [ ] Define the Powah Reactor as an intermediate endgame (before the Mekanism Fusion Reactor)?
