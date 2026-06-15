# Progression Overview

Gaia Awakening is structured into five tiers. Each tier expands the technology, magic and farming systems available to you. Progress through them in order — later tiers depend on materials and machines unlocked in earlier ones.

## The Five Tiers

| Tier | Title | Theme | Unlocks / Gates |
|------|-------|-------|-----------------|
| T1 | [Tier 1: The Beginning](tier-1.md) | Survival, exploration, first Create machines | Starting point — no prior gate |
| T2 | [Tier 2: Brass and Machines](tier-2.md) | Create Brass Age, Mekanism intro, organised storage | Requires Nether resources (blaze rods, quartz) from T1 |
| T3 | [Tier 3: Energy and Automation](tier-3.md) | AE2 digital storage, power networks, PneumaticCraft, Mystical Agriculture, magic | Requires Precision Mechanism (Create T2) and Basic Energy Cube (Mekanism T2) |
| T4 | [Tier 4: Advanced Systems](tier-4.md) | Heavy Mekanism, MEGA storage, Catalyst system, magical automation, custom enchanting | Requires AE2 autocrafting (T3) and XNet controller (T3) |
| T5 | [Tier 5: Endgame](tier-5.md) | Cataclysm Apex bosses, Fusion Reactor, Gaia Core | Requires Advanced Alloys + 64M MEGA cell + Drygmy farm (T4) |

## Catalyst Gates

Two custom items gate access to higher-tier Mystical Agriculture seeds. These are the most important cross-tier gates in the pack.

### Resource Catalyst — Gate to T3 Seeds

The **Resource Catalyst** (`apex:resource_catalyst`) is required to craft Tier 3 Mystical Agriculture seeds (diamond, emerald, gold, glowstone). The catalyst itself is obtained during Tier 4's quest chapter "The Catalyst" — so while the T3 seeds exist from Tier 3 onwards, you will not be able to craft them until you reach that T4 chapter and secure your first Resource Catalyst.

Three paths exist to obtain it:

- **Passive** — 0.5% drop per ore from Create Ore Excavation veins. Accumulates quietly in the background while you mine.
- **Crafting** — Mechanical Crafter recipe using three essence types and an Apotheosis gem. Scales with farm size; the most productive automated method.
- **Active** — Boss drops (Mowzie's Mobs bosses, Netherite Monstrosity), dungeon loot (8–10% chance per chest in When Dungeons Arise and YUNG's structures), Catalyst Altar conversion (1000 mB Hyper Experience per catalyst via a Create Spout), or Wandering Trader (15% chance).

### Mythic Catalyst — Gate to T4 Seeds

The **Mythic Catalyst** (`apex:mythic_catalyst`) is required to craft Tier 4 Mystical Agriculture seeds (osmium, tin, lead, uranium, fluorite via MA Agradditions). This gate sits in Tier 5.

Unlike the Resource Catalyst, the Mythic Catalyst has only one source: **Cataclysm Apex bosses** (Ignis, the Harbinger, the Ender Guardian) guarantee one drop per kill. The only automation path is a Drygmy farm (Ars Nouveau) using a boss mob effigy — available from late Tier 4 onwards.

For full technical details on drop rates and implementation, see the Custom Systems — Catalyst System page in this wiki once it is published.

## Progression Flow

```
T1: The Beginning
    Nether resources unlock the Brass Age
        ↓
T2: Brass and Machines
    Precision Mechanism + Energy Cube unlock T3
        ↓
T3: Energy and Automation
    ── Resource Catalyst gates T3 MA seeds ──
    AE2 autocrafting + XNet unlock T4
        ↓
T4: Advanced Systems
    ── Mythic Catalyst gates T4 MA seeds ──
    Advanced Alloys + MEGA storage + Drygmy farm unlock T5
        ↓
T5: Endgame
    Apex bosses → Mythic Catalyst → T4 seeds → Gaia Core
```
