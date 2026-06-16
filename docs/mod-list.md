# Mod List — NeoForge 1.21.1

> **Status**: Verified for 0.1.x — 2026-04-30
> All mods must be available on Modrinth.
> ⚠️ = check NeoForge 1.21.1 availability before adding

---

## CORE — Performance & Libraries

| Mod | Purpose | Prio | Note |
|-----|-------|------|-----------|
| **Embeddium** | NeoForge Sodium (GPU optimization) | Mandatory | Replacement for Sodium on NeoForge |
| **Iris Shaders** | Shader support (NeoForge-native) | Mandatory | Compatible with Embeddium |
| **FerriteCore** | RAM optimization | Mandatory | |
| **Moonrise** | Lighting-engine optimization | Mandatory | Starlight successor |
| **Clumps** | Combine XP orbs (performance) | Mandatory | |
| **ModernFix** | Load times & general performance | Mandatory | |
| **Distant Horizons** | Level-of-detail chunks (long view) | Mandatory | Client-only |
| ~~Voxy~~ | ~~Alternative to DH~~ | — | ⛔ No NeoForge 1.21.1 port (Fabric-only on Modrinth) |
| **Chunky** | World pre-generation | Mandatory | **Essential for 32km exploration** |
| **C2ME** | Multi-core chunk management | Mandatory | **Essential for 800-height** |
| **Radium Reforged** | Game-logic optimization (Lithium port) | Mandatory | |
| **Krypton Reno** | Network stack optimization | Mandatory | |
| **Noisium** | World-gen math optimization | Mandatory | |
| **ServerCore** | Dynamic server optimization | Mandatory | |
| **NeoForge** | Mod loader | Mandatory | |
| **Kotlin for Forge** | Kotlin library (for some mods) | Mandatory | |
| **Cloth Config API** | Config library | Mandatory | |
| **Architectury API** | Cross-loader API | Mandatory | |
| **Patchouli** | In-game guidebooks | Mandatory | For the Create manual etc. |
| **LootJS** | Loot-table modification via KubeJS (boss drops) | Mandatory | Needed for 06_loot_modifications.js |
| **KubeJS REI Integration** | Hide REI items via KubeJS | Mandatory | Needed for 03_ui_cleanup.js |
| **Citadel** | Library for Cataclysm | Mandatory | |
| **GeckoLib** | Animation library | Mandatory | For Mowzie's Mobs & Spells |
| **OctoLib** | Library for Relics | Mandatory | |

---

## CREATE — Main Path

| Mod | Purpose | Balancing need | Note |
|-----|-------|-----------------|-----------|
| **Create** | Core mod — mechanics, automation | High | Basis for everything |
| **Create Aeronautics** | Flying vehicles & structures | Optional | ⚠️ Alpha — disabled for 0.1.x, evaluate from 0.4.x |
| **Create: Steam 'n' Rails** | Extended trains & rails | Low | Good synergy with Aeronautics |
| **Create: Crafts & Additions** | Electric motors, batteries (Create↔FE) | Medium | Bridge to Mekanism/AE2 |
| **Create Deco** | Decorative Create blocks | Low | Cosmetic, no balancing |
| **Create: Interiors** | Furniture & interior decoration | Low | Good for airship interiors |
| **Create: Diesel Generators** | Fuel-based energy | Medium | Alternative energy source |
| **Create: Dreams & Desires** | New machines & recipes | Optional | ✓ NeoForge 1.21.1 — still beta (v2.2d-BETA), watch stability |

---

## DIGITAL TECH — Mid & Late-Game Path

| Mod | Purpose | Balancing need | Note |
|-----|-------|-----------------|-----------|
| **Applied Energistics 2** | Digital storage & automation | High | Gate behind Create progress |
| **AE2 Things** | AE2 extensions | Low | QoL for AE2 |
| **Extended AE** | AE2 late-game expansion | Low | ✓ NeoForge 1.21.1 |
| **Applied Mekanistics** | **AE2 ↔ Mekanism bridge** | Medium | ✓ NeoForge 1.21.1 — mandatory addon |
| **Mekanism** | Energy, processing, gases | High | Very powerful — gating needed |
| **Mekanism: Generators** | Energy generation (solar, wind, fusion) | High | Fusion Reactor = endgame |
| **Mekanism: Tools** | Mekanism armor & tools | Medium | |
| **Industrial Foregoing** | Automation gap-filler, mob factories | Medium | ✓ NeoForge 1.21.1 |
| **Functional Storage** | Drawer storage early-game (before AE2) | Low | ✓ NeoForge 1.21.1 |
| **XNet** | Cross-mod cable routing (items/energy/fluid) | Low | ✓ NeoForge 1.21.1 |
| **XNet Gases** | XNet + Mekanism gases | Low | ✓ NeoForge 1.21.1 |
| ~~Thermal Foundation~~ | ~~Resources & base tech~~ | — | ⛔ No Modrinth port for 1.21.1 |
| **Create: Simple Ore Doubling** | x2 for Create crushing (deterministic) | Low | ✓ Modrinth — or replaceable via KubeJS |

---

## MAGIC & ENHANCEMENT

| Mod | Purpose | Balancing need | Note |
|-----|-------|-----------------|-----------|
| **Apotheosis** | Enchanting overhaul, bosses, loot | High | **Mandatory!** Basis for OP enchants |
| **Apotheosis: Compatibility** | Apotheosis for other mods | Medium | |
| **Ars Nouveau** | Spell crafting, active magic | Medium | **Main magic path** ✓ NeoForge 1.21.1 |
| **Ars Additions** | Ars Nouveau QoL + glyphs | Low | ✓ NeoForge 1.21.1 |
| **Ars Creo** | **Create ↔ Ars Nouveau bridge** | Low | ✓ NeoForge 1.21.1 — mandatory addon |
| **Iron's Spells 'n Spellbooks** | Combat magic, classes | Low | Complements Ars Nouveau |
| **Occultism** | Demonology, dimensional storage | Optional | **Botania replacement** — ✓ NeoForge 1.21.1 |
| **Enigmatic Legacy+** | Artifacts & relics | Optional | ✓ NeoForge 1.21.1 — Note: the Modrinth mod is called "Enigmatic Legacy+" (1.21.1 port) |

> ⛔ **Botania**: NOT available for NeoForge 1.21.1 (no port, no ETA).
> Botania drops out — Ars Nouveau is the main magic. Occultism as a second optional path if available.

---

## ENCHANTMENT SYSTEM — Three-Mod Stack

> Full documentation: `planning/quests/enchantment-system.md`

| Mod | Role in the system | Status |
|-----|----------------|--------|
| **Create: Enchantment Industry** | Liquid XP, Blaze Forger (combine), Printer (copy), Blaze Enchanter (+1 level via Hyper XP) | ✓ NeoForge 1.21.1 |
| **Enchantment Library Standalone** | Store & retrieve enchantment progress (points system) | ✓ NeoForge 1.21.1 |
| **Apotheosis** | Level-cap removal, base enchanting T1-T2 | ✓ NeoForge 1.21.1 |
| **PneumaticCraft** | Large jumps: level 10→25, level 50→100 | ✓ NeoForge 1.21.1 |

**Workflow**: `Apotheosis (1-10)` → `PNC jump (10→25)` → `Create EI loop (25→50)` → `PNC jump (50→100)`

---

## PNEUMATICCRAFT — Enchantment Escalation Path

> **Design intent**: PneumaticCraft is the way to enchantments beyond the normal Apotheosis limits.
> The Pressure Chamber becomes the crafting station for books at level 25 / 50 / 100+.
> Strong optional path with a high reward.

| Mod | Purpose | Balancing need | Note |
|-----|-------|-----------------|-----------|
| **PneumaticCraft: Repressurized** | Compressed-air tech + Pressure Chamber | **Very high** | Core mechanism for OP enchants |
| ~~PneumaticCraft: Aeronautics~~ | ~~Drone automation~~ | — | ⛔ No standalone mod found on Modrinth — dropped |

**Role of PneumaticCraft in the enchantment system** (large jumps):
- Jump 1: Pressure Chamber (2.5 bar) → level 10 → level 25 (Mekanism Obsidian + Apotheosis Normal Gems)
- Jump 2: Pressure Chamber (6.0 bar) → level 50 → level 100 (AE2 Certus + Apotheosis Mythic + Create Precision Mech.)

---

## EXPLORATION & DUNGEONS

| Mod | Purpose | Balancing need | Note |
|-----|-------|-----------------|-----------|
| **Terralith** | Vanilla+ world generation | Low | Client+Server |
| **Tectonic** | Massive mountains & wide landscapes | **Medium** | **Essential for 800-height** |
| **Artifacts** | Rare accessories in dungeons | Medium | **Adventure focus** |
| **Relics** | Powerful artifacts with a level system | Medium | **Adventure focus** |
| **YUNG's Better Dungeons** | Improved dungeons | Low | |
| **YUNG's Better Mineshafts** | Improved mineshafts | Low | |
| **YUNG's Better Strongholds** | Improved strongholds | Low | |
| **YUNG's Better Witch Huts** | Improved witch huts | Low | |
| **Dungeons and Taverns** | New structures | Low | |
| **When Dungeons Arise** | Large dungeons & towers | Low | ✓ NeoForge 1.21.1 |
| **Repurposed Structures** | New vanilla structure variants | Low | |
| **Waystones** | Fast-travel points | Low | Important for casual |
| **Compact Machines** | Miniature dimensions for machines | Low | **Space & performance optimization** |

---

## BOSSES & ADVENTURE (additional challenges)

| Mod | Purpose | Balancing need | Note |
|-----|-------|-----------------|-----------|
| **L_Ender's Cataclysm** | Epic bosses (Ignis, Harbinger) | **High** | Source for "OP Loot" |
| **Bosses of Mass Destruction** | Additional bosses in dimensions | Medium | |
| **Mowzie's Mobs** | Unique, animated bosses | Medium | ✓ NeoForge 1.21.1 |
| **Simple Magnets** | Magnet trinket (QoL) | Low | |

---

## QoL — Quality of Life

| Mod | Purpose | Note |
|-----|-------|-----------|
| **FTB Quests** | Quest system | Core feature |
| **FTB Chunks** | Minimap, worldmap & chunk loading | **Important for automation** |
| **FTB Ultimine** | Fast mining (vein miner) | QoL / casual |
| **Roughly Enough Items (REI)** | Recipe & item browser | NeoForge-compatible |
| **Jade** | Block/entity info on look | |
| **Inventory Profiles Next** | Sort inventory | ✓ NeoForge 1.21.1 |
| **Iron Chests: Restocked** | Larger chests | |
| **Sophisticated Backpacks** | Backpacks with filters | Important for exploration |
| **Sophisticated Storage** | Extended chests | Synergy with backpacks |
| **Curios API** | Accessory slots (rings, amulets) | Library for Apotheosis etc. |
| **Toast Control** | Control toast notifications | |
| **Configured** | In-game config editor | |
| **Mouse Tweaks** | Better mouse inventory control | |
| **Controlling** | Keybind search | |
| **Carry On** | Carry chests & mobs | |
| **AppleSkin** | Hunger/saturation display | |
| **Durability Viewer** | Durability HUD | |

---

## RESOURCE GENERATION

| Mod | Purpose | Balancing need | Note |
|-----|-------|-----------------|-----------|
| **Mystical Agriculture** | Crop-based resource generation | High | ✓ NeoForge 1.21.1 |
| **Mystical Agradditions** | Tier 6 crops + modded resources (osmium etc.) | High | ✓ NeoForge 1.21.1 |
| **Create: Ore Excavation** | Infinite ore veins via Create rotational force | Medium | ✓ NeoForge 1.21.1 — APEX synergy |
| **Serene Seasons** | Seasons — affects MA growth, farming | Low | ✓ NeoForge 1.21.1 |
| **Powah: Rebooted** | Energy bridge T2→T3 (before Mekanism Generators) | Medium | ✓ NeoForge 1.21.1 |

---

## FOOD & SURVIVAL (optional)

| Mod | Purpose | Note |
|-----|-------|-----------|
| **Farmer's Delight** | Cooking & farming — optional comfort path | ✓ NeoForge 1.21.1 |
| **Veggies Delight** | More vegetables + structures | ✓ NeoForge 1.21.1 |
| **More Delight** | More meals & ingredients | ✓ NeoForge 1.21.1 |
| **Chef's Delight** | Cook/baker villager profession | ✓ NeoForge 1.21.1 |
| **Serene Seasons** | Seasons (farming synergy) | ✓ NeoForge 1.21.1 (also listed under RESOURCE GENERATION) |

---

## REJECTED / UNAVAILABLE MODS

| Mod | Reason |
|-----|-------|
| **Sodium** | Fabric-only — Embeddium is the NeoForge replacement |
| **Lithium** | Fabric-only |
| **Quark** | Frequent compatibility issues with Create |
| **ProjectE** | Too strong for casual balance (EMC breaks progression) |
| **Botania** | ⛔ No NeoForge 1.21.1 port (no ETA) |
| **Applied Botanics** | ⛔ Depends on Botania |
| **Thermal Foundation/Expansion** | ⛔ No Modrinth port for NeoForge 1.21.1 |
| **Ars Elemental** | ⛔ CurseForge-exclusive |
| **Compressed Creativity** | ⛔ Only up to 1.20.1 — watch for a future port |
| **Voxy** | ⛔ No NeoForge 1.21.1 port — Fabric-only on Modrinth (as of 2026-04-30) |
| **PneumaticCraft: Aeronautics** | ⛔ No standalone mod found on Modrinth (as of 2026-04-30) |
| **Enigmatic Legacy** (original) | ⛔ No NeoForge 1.21.1 port — successor: **Enigmatic Legacy+** (listed as Optional in the mod list) |

---

## BALANCING PRIORITIES (custom KubeJS recipes needed)

1. **Apotheosis** — gate gem socketing and enchanting power
2. **Mekanism Fusion Reactor** — lock behind long progression
3. **AE2 ME Controller** — Create components as crafting material
4. **Create ↔ AE2 bridge** — Create: Crafts & Additions as a mandatory gate
5. **Mekanism Tools** — Apotheosis level as a prerequisite

---

## OPEN QUESTIONS

- [x] Occultism NeoForge 1.21.1 status checked — ✓ available (v1.207.1, as of 2026-04-30)
- [ ] Mystical Agradditions: which mod crops are included? (Osmium, Certus, Compressed Iron?)
- [ ] Test Serene Seasons' influence on Mystical Agriculture growth
- [ ] Create: Simple Ore Doubling vs. a pure KubeJS recipe — decide
- [ ] Watch Compressed Creativity (follow up on a 1.21.1 port)
- [ ] Estimate the final mod count: currently ~80-90 mods planned
