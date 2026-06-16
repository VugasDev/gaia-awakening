# Progression Design — Create Focus, Casual Multiplayer

> **Status**: First draft — 2026-04-29

---

## Progression Overview

```
[Vanilla Start]
      │
      ▼
[Stage 1: Crafting & Exploration]     ← casual-friendly entry
  Create: first machines
  Apotheosis: enchanting T1-T2
  Artifacts: first finds in dungeons
  FTB Chunks (map), FTB Ultimine (mining)
  Waystones, quests
  ┌─────────────────────────────────┐
  │ Optional: Farmer's Delight      │ ← comfort path, anytime
  └─────────────────────────────────┘
      │
      ▼
[Stage 2: Mechanization]             ← Create core
  Create: automation, conveyors, presses
  Steam 'n' Rails: railway network
  Sophisticated Backpacks/Storage
  ┌──────────────────────┐  ┌──────────────────────┐
  │ Ars Nouveau          │  │ Optional: Occultism   │  ← Ars = main path
  │ (active spells)      │  │ (demonology/storage)  │    Occultism = darker
  │ + Ars Creo (Create)  │  │                       │    alternative
  └──────────────────────┘  └──────────────────────┘
  ⛔ Botania not available for NeoForge 1.21.1
      │
      ▼
[Stage 3: Digitization]              ← AE2 gate
  Create: Crafts & Additions (FE bridge)
  Applied Energistics 2: ME network
  Mekanism: energy & chemistry
  Apotheosis: gem socketing unlocked
  ┌─────────────────────────────────────────────────┐
  │ Optional: PneumaticCraft                        │
  │ First compressors → build a Pressure Chamber    │ ← enchantment
  │ Apotheosis enchants T2 (level 6-10) available   │   escalation path
  └─────────────────────────────────────────────────┘
      │
      ▼
[Stage 4: Industrialization]         ← Mekanism core
  Mekanism: generators (solar, wind)
  AE2: crafting CPUs, pattern provider
  Iron's Spells: combat magic
  Bosses: Mowzie's Mobs & Cataclysm (entry)
  ┌─────────────────────────────────────────────────┐
  │ PneumaticCraft: Pressure Chamber 3.5 bar        │
  │ → enchantment Tier 3 unlocked (lvl 25)         │ ← mid-game OP
  │   Material: Mekanism Refined Obsidian +         │
  │             Apotheosis Normal Gems              │
  └─────────────────────────────────────────────────┘
      │
      ▼
[Stage 5: Aeronautics]               ← Create Aeronautics gate
  Create Aeronautics: first aircraft
  Mekanism: Fusion Reactor (endgame energy)
  AE2: fully automated ME system
  ┌─────────────────────────────────────────────────┐
  │ PneumaticCraft: high-pressure (5.5 bar)         │
  │ → enchantment Tier 4 unlocked (lvl 50)         │ ← late-game OP
  │   Material: AE2 Fluix + Apotheosis Epic Gems    │
  └─────────────────────────────────────────────────┘
      │
      ▼
[Endgame: Flying Fortress]
  Fully automated flying base
  Ars Nouveau: boss farming via Drygmies
  Apotheosis & Cataclysm: all bosses defeated
  Mekanism Fusion Reactor active
  ┌─────────────────────────────────────────────────┐
  │ PneumaticCraft: extreme-pressure (7.5 bar)      │
  │ → enchantment Tier 5: GODLIKE (lvl 100)        │ ← endgame reward
  │   Material: AE2 + Apotheosis Mythic +           │
  │             Mekanism + Create                   │
  └─────────────────────────────────────────────────┘
```

---

## APEX Ore Processing — Stage Overview

| Tier | Multiplier | Requires | Gate |
|------|:---:|---------|------|
| T1 | x1 | Furnace | Immediately |
| T2 | x2 | Create: Crushing Wheels | Create T2 |
| T3 | x4 | Create + Mekanism Enrichment | Mekanism T1 |
| T4 | x8 | Create + Mekanism Purification (O₂) | Mekanism T3 |
| T5 | x16 | Create + Mekanism + PneumaticCraft Pressure (4 bar) + plastic | PneumaticCraft T2 |

Complete mechanic → `planning/mods/ore-processing-system.md`

---

## Stage 1 — Crafting & Exploration (hours 1-5)

**Goal**: casual-friendly entry, also for inexperienced players.

**Unlocked:**
- All vanilla features
- Create: gears, shafts, simple machines (press, mill)
- Apotheosis: improved enchanting tables (T1)
- **Artifacts**: first trinkets in dungeons (gloves, boots)
- **FTB Ultimine**: easier resource gathering
- Waystones: first waypoints
- **FTB Chunks**: minimap & chunk loading unlocked
- Mystical Agriculture: Tier 1-2 seeds (dirt, wood, stone, coal, iron)
- Serene Seasons: first season active
- Farmer's Delight: unlocked

**Quest focus:**
- Tutorial: how does Create work? (torque, RPM)
- First gear and armor
- Explore the world, find first structures
- **Relics**: search for your first relic (quest reward: starter relic)
- Set up the first Mystical Agriculture farm (T1 seeds)
- APEX Ore Chain T2: first Crushing Wheels

**Custom recipes:**
- No critical changes in this phase

---

## Stage 2 — Mechanization (hours 5-15)

**Goal**: establish Create as the main mechanic.

**Unlocked:**
- Create: conveyors, funnels, mechanical arms, water wheels
- Create: Steam 'n' Rails (after the first steam boiler)
- Ars Nouveau: first spells | Occultism: demonology entry
- Sophisticated Backpacks (after the leather stage)
- Iron Chests → Functional Storage drawers
- Mystical Agriculture: Tier 3 seeds (gold, quartz)
- APEX Ore Chain T2 complete (x2 via Crushing Wheels)
- Powah: Rebooted — first energy sources

**Quest focus:**
- "Build your first automated iron mine"
- "Lay your first rail network"
- "Explore an improved dungeon"
- **Boss**: defeat the Ferrous Wroughtnaut (Mowzie's Mobs)
- "APEX T2: set up Crushing Wheels" (x2 multiplier)

**Custom recipes (balancing):**
- AE2 ME Controller: requires Create components (precision mechanism etc.)
- Apotheosis gem socketing: only unlocked after Mekanism metals
- Mystical Agriculture T4+ seeds: require Mekanism components

---

## Stage 3 — Digitization (hours 15-30)

**Goal**: transition from mechanical to digital.

**Gate**: Create: Crafts & Additions must be installed (FE bridge)

**Unlocked:**
- Create: Crafts & Additions (electric motors, FE generation)
- Applied Energistics 2: farm Certus Quartz → build an ME network
- Mekanism: Basic Factory → ore tripling
- Apotheosis: all enchanting features

**Quest focus:**
- "Your first ME network"
- "Connect Create rotational energy with Mekanism"
- **Relics**: level your relic to stage 5
- "APEX T3: x4 multiplication (Create + Mekanism Enrichment)"
- "Osmium Crop: Mystical Agriculture T4 unlocked"
- "First PneumaticCraft compressed-air infrastructure"

**Custom recipes (balancing):**
- ME Controller: precision mechanism (Create) as a crafting component
- Mekanism Energy Cube: osmium only after Create Tier 2
- Mystical Agriculture T4 seeds: Mekanism Enriched Iron as a crafting gate

---

## Stage 4 — Industrialization (hours 30-50)

**Goal**: large-scale automation, prepare the magic endgame.

**Unlocked:**
- Mekanism: generators, advanced machines
- AE2: crafting CPUs, auto-crafting
- Iron's Spells: advanced spells
- Apotheosis: bosses (Horseman, Lich, etc.)

**Quest focus:**
- "Build a fully automated crafting system"
- **Bosses**: defeat the Netherite Monstrosity (Cataclysm)
- "APEX T4: x8 multiplication (Mekanism Purification + O₂)"
- "First Fusion Reactor components"
- "PneumaticCraft: plastic from an oil refinery"
- "Enchantment Tier 3: Pressure Chamber 3.5 bar → level 25"

---

## Stage 5 — Aeronautics (hours 50+)

**Goal**: Create Aeronautics as the crowning feature.

**Gate**: Mekanism Advanced Alloys + Create Tier 3

**Unlocked:**
- Create Aeronautics: aircraft, airships
- Mekanism: Fusion Reactor (endgame energy)
- Full AE2 build-out

**Quest focus:**
- "Your first airship"
- "Build a flying factory"
- **Apex bosses**: defeat Ignis and the Harbinger (Cataclysm)
- "OP Loot": collect a complete set of Cataclysm weapons + Apotheosis Mythic gems
- "APEX T5: x16 multiplication (Pressure Chamber 4 bar + plastic)"
- "Fusion Reactor: the sun in your base"
- "Mystical Agriculture T6: Insanium crops"
- "Enchantment Tier 4+5: level 50 and 100"

---

## Multiplayer Considerations

- **Shared progression**: quest progress per team (FTB Quests party system)
- **Specialization possible**: players can take on roles (builder, technician, explorer)
- **Server performance**: Mekanism reactors and large Create contraptions = lag risk
  - Config: adjust Mekanism's tick rate
  - Create: limit physics objects (contraption limit)

---

## Gating Mechanisms

| Gate | Method | Reason |
|------|---------|-------|
| AE2 ME Controller | Custom recipe with Create components | Tech path before digital |
| Mekanism Fusion Reactor | Quest lock + custom recipe | Endgame-only |
| Create Aeronautics | Complete the quest chain | Storytelling gate |
| Apotheosis gem socketing | Mekanism metal as a recipe ingredient | Power limit early |
| Mekanism tools | Defeat an Apotheosis boss | Magic/tech synergy |
