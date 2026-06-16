# Create: Ore Excavation — Resource Generation

**Status**: ✓ NeoForge 1.21.1 (v1.6.8, Nov 2025) | ✓ Modrinth

---

## What It Does

Create: Ore Excavation inserts **hidden, infinite ore veins** into world generation:

- Per chunk: a random chance to contain an invisible ore vein
- Only **one** vein per chunk
- Mined via **Create rotational force** (drill heads, contraptions)
- **Ore Vein Finder tool**: shows veins in the surroundings

### Key Property: "Infinite"
Unlike normal ore deposits, these veins are not exhaustible through normal mining.
They are mined by Create machines that slowly "tap" them.

---

## Synergy With the Stack

### APEX Ore Chain (x16)
```
Create Ore Excavation vein (infinite)
        ↓ Create drill/contraption
Raw ore (continuous)
        ↓ APEX Tier 2-5
Crushed → Enriched → Purified → Refined Pellets
        ↓
up to 16x ingots per ore
```

→ Infinite vein × x16 multiplication = fully automated, scalable production

### Create Aeronautics
A **flying mining platform** (Aeronautics) + Ore Vein Finder could:
- Fly over the world
- Locate veins
- Mine automatically and fly back

→ Endgame feature: a flying ore-mining ship

### Mekanism Digital Miner Distinction
| Feature | Create Ore Excavation | Mekanism Digital Miner |
|---------|----------------------|----------------------|
| Resource | Infinite veins | Finite world ores |
| Control | Rotational force | FE (energy) |
| Targeting | Vein-based | Block-specific |
| Automation | Create conveyor | Own filter system |
| Gate | Create T2 | Mekanism T3 |
| Scaling | Through drill size | Through radius upgrade |

→ **Both methods are useful and complementary** — no overlap

---

## Vein Finder Tool

- Shows surrounding veins (radius configurable)
- Helps with planning mining contraptions
- Early-mid game: find veins manually and place drills on them
- Late game: automatically scan veins via PneumaticCraft drones?

---

## Balancing Considerations

- **Infinite resources** sound OP — but:
  - The mining rate depends on Create rotational power (more power, faster)
  - Rotation needs an energy source (steam, diesel generators, etc.)
  - A conveyor for further processing needs infrastructure
  - The APEX chain needs Mekanism gases (O₂, HCl)
  - → No "free resources", but scalable resources for late-game automation

- **One vein per chunk**: limits the number of parallel extraction points
  → Players must actively search for veins and prioritize

---

## Integration Into Progression

| Stage | Application |
|-------|----------|
| T2 (Create) | First vein found, simple drill |
| T3 (Mekanism) | APEX x4 connected → significantly more output |
| T4 | APEX x8 + rail-based mining (Steam 'n' Rails) |
| T5 (Aeronautics) | Flying mining ship searches for veins automatically |

---

## Recommendation

**Add to the modpack** — ideal as a "Create-native" resource generator that:
1. Is available early (Create T2)
2. Scales with APEX (x16 late game)
3. Has its own gameplay loop (search veins, set up drills, build a conveyor)
4. Enables Aeronautics integration as an endgame feature
