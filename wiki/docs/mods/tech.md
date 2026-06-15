# Tech Mods

The tech category covers mechanical automation (Create), digital logistics (Applied Energistics 2), chemical processing (Mekanism), and the bridge mods that connect them. The overall progression is: **Create (Tier 1-2) → Powah! energy bridge (Tier 2-3) → Mekanism processing (Tier 3-4) → AE2 digital storage (Tier 4-5)**.

---

## Create

**Create** is the centrepiece of early-to-mid game. Its rotational-power model (cogs, shafts, water wheels, windmills) lets you build conveyor belts, mechanical mixers, presses, and automated crafting lines without any Forge Energy. Every significant progression gate in Tier 1 and Tier 2 runs through Create components.

### Create addons in the pack

| Mod | Role |
|---|---|
| **Create: Steam 'n' Rails** | Extended rail networks and trains for long-distance item/passenger transport. Synergises with Create Aeronautics concepts. |
| **Create: Crafts & Additions** | Adds electric motors and portable energy storage that convert Create rotational force to Forge Energy (FE). This is the mandatory bridge between Create and Mekanism/AE2 — you cannot skip it. |
| **Create Deco** | Decorative blocks in the Create aesthetic. No progression impact. |
| **Create: Interiors** | Furniture and interior blocks, useful for building crew quarters or base interiors. |
| **Create: Diesel Generators** | Combustion-based rotational power from liquid fuel — an alternative energy source before Mekanism Generators. |
| **Create: Dreams & Desires** | Adds new machines and recipes that extend Create's late game. Still in beta (v2.2d-BETA); monitor for instability. |
| **Create: Enchantment Industry** | Converts XP into Liquid XP and provides the Blaze Forger (combine enchantments) and Blaze Enchanter (push a book one extra level using Hyper XP). Central to the [enchantment system](../systems/enchantments.md). |
| **Create: Ore Excavation** | Generates infinite ore veins using Create rotational force. A late-game alternative to manual mining and a key resource throughput unlock. |
| **Create: Simple Ore Doubling** | Deterministic x2 ore yield through Create crushing — an earlier resource multiplier before Mekanism's 5x processing comes online. |
| **Create: New Age** | Adds electricity-themed Create machines for additional automation paths. |
| **Create: Garnished** | Food-related Create machines that tie into Farmer's Delight. |
| **Create: Dragons Plus** | Thematic Create content with dragon-inspired designs and blocks. |
| **Copycats+** | Extends Create's copycat blocks for more decorative options. |

---

## Applied Energistics 2

**Applied Energistics 2 (AE2)** provides digital storage — items are stored as data on a network of drives and accessed through terminals. AE2 also handles complex auto-crafting via Molecular Assemblers. In this pack it is gated behind Create progress (you need Create components to craft the AE2 Meteor Compass and first presses).

### AE2 addons

| Mod | Role |
|---|---|
| **Applied Mekanistics** | Bridges AE2 and Mekanism — allows Mekanism machines to be driven by AE2 autocrafting patterns and shares energy across both systems. Required if you want a fully automated Mekanism processing line. |
| **Extended AE** | Late-game AE2 content: higher-tier storage cells, improved interfaces, and new crafting options for endgame throughput. |
| **AE2 Things** | Quality-of-life additions to AE2 (better cables, additional cell types). Low-priority but convenient. |

---

## Mekanism

**Mekanism** is the primary energy and chemical-processing mod. Its ore-processing chain (Crusher → Enrichment Chamber → Smelter → Purification Chamber → Dissolution Chamber) can turn one ore into up to five ingots. Energy is measured in Joules (J); Mekanism machines accept FE from Create: Crafts & Additions or Powah!.

!!! warning "Gating"
    The Mekanism Fusion Reactor is intentionally locked deep in the quest tree. Reaching it requires components from AE2, Create, and Apotheosis enchantments — it is the Tier 5 endgame power source.

### Mekanism addons

| Mod | Role |
|---|---|
| **Mekanism: Generators** | Wind, solar, heat, and fusion reactors. The Fusion Reactor is the endgame power source. |
| **Mekanism: Tools** | Mekanism-tier armour and tools (Obsidian, Osmium, HDPE, Refined Glowstone). Require Apotheosis enchantment levels as a prerequisite in the quest book. |

---

## PneumaticCraft: Repressurized

**PneumaticCraft** runs on compressed air rather than electricity. In this pack its primary role is the **Pressure Chamber** — used to create very high-level enchanted books (Level 25 and Level 100+) that no other mod can produce. See the [Enchantment System](../systems/enchantments.md) for the full workflow.

Secondary uses include drone automation, plastic manufacturing, and gas handling — but the quest line focuses on the Pressure Chamber path.

---

## Powah! (Rebooted)

**Powah!** fills the energy gap between Create's early-game power and Mekanism Generators' late-game fusion reactors. Its Thermo Generator and Reactor provide mid-tier FE generation (Tier 2-3) without the complexity overhead of Mekanism. Use it to power AE2 while you work toward Mekanism Generators.

---

## XNet

**XNet** is a cable-routing mod that moves items, fluids, energy, and gases across a single unified cable network using configurable connectors. It is more compact and cross-mod than individual pipe systems.

| Mod | Role |
|---|---|
| **XNet** | Core item, fluid, and energy routing. |
| **XNet Gases** | Extends XNet to handle Mekanism gases (hydrogen, oxygen, ethylene). Required for automating Mekanism chemical chains via XNet cables. |

---

## Industrial Foregoing

**Industrial Foregoing** fills automation gaps that Create does not cover natively — mob farms (Mob Crusher, Mob Duplicator), fluid generation (Fluid Pump), and plant automation (Plant Gatherer). It uses Forge Energy and fits between Create and Mekanism in the progression timeline.

---

## Functional Storage

**Functional Storage** provides drawer-style storage (stackable storage drawers and upgradeable capacities) for the early-to-mid game before AE2 becomes available. A practical step between a chest room and a full ME network.

---

## RFTools Base

**RFTools Base** is the shared library used by RFTools mods. The pack currently ships only the base module (rftools-base), which provides common utilities without the full RFTools suite. It acts primarily as a dependency for other mods.
