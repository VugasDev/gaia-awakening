# APEX — Ore Processing System
### Automated Progressive EXtraction (x1 → x16)

> **Design goal**: every multiplication stage actively requires a different mod system.
> No mod alone reaches x16 — this is a genuine cross-mod feature.
> Every stage is optional, but more rewarding.

---

## The Complete Chain System

```
                    ┌─────────────────────────────────────────────┐
                    │              APEX ORE CHAIN                  │
                    └─────────────────────────────────────────────┘

  RAW ORE
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│ TIER 1 — x1 — Vanilla Smelting                                  │
│  Furnace / Blast Furnace                                        │
│  Gate: immediately                                              │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼ [Tier 2 unlocked: Create Tier 2]
┌─────────────────────────────────────────────────────────────────┐
│ TIER 2 — x2 — Create Mechanical Crushing                        │
│  Create: Crushing Wheels                                        │
│  1 ore → 2× crushed ore (KubeJS recipe: deterministic 2x)      │
│  Crushed ore → furnace → ingot                                  │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼ [Tier 3 unlocked: Mekanism Tier 1]
┌─────────────────────────────────────────────────────────────────┐
│ TIER 3 — x4 — Create + Mekanism Enrichment                      │
│  Create: Crushing Wheels → 2× crushed ore                       │
│  Mekanism: Enrichment Chamber (KubeJS: accepts crushed ore)    │
│  2× crushed ore → enrichment (x2 each) → 4× ore dust           │
│  Ore dust → furnace/alloy smelter → ingot                       │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼ [Tier 4 unlocked: Mekanism T3 + gas infrastructure (O₂)]
┌─────────────────────────────────────────────────────────────────┐
│ TIER 4 — x8 — Create + Mekanism Purification Chain              │
│  Create: Crushing Wheels → 2× crushed ore                       │
│  Mekanism:                                                       │
│    Purification Chamber (O₂) → 2× clump per crushed ore        │
│    Crusher → 2× dirty dust per clump                            │
│    Enrichment Chamber → 2× ore dust per dirty dust              │
│    Effectively: 2 crushed → 8× ore dust (x4 via Mekanism chain)│
│  Net: 1 ore × 2 (Create) × 4 (Mekanism) = 8× ingots            │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼ [Tier 5 unlocked: PneumaticCraft high-pressure + plastic]
┌─────────────────────────────────────────────────────────────────┐
│ TIER 5 — x16 — Create + Mekanism + PneumaticCraft               │
│  Previous stages: → 8× ore dust (from Tier 4)                   │
│  PneumaticCraft Pressure Chamber (4 bar):                        │
│    8× ore dust                                                  │
│    + 4× PneumaticCraft Plastic Sheet (from oil refinery)        │
│    + 1× Mekanism Brine (salt solution, easy to make)            │
│    → 16× [metal] refined pellets                                │
│  Refined pellets → furnace → ingot                              │
│  Net: 1 ore × 2 (Create) × 4 (Mekanism) × 2 (PNC) = 16× ingot │
└─────────────────────────────────────────────────────────────────┘
```

---

## Why PneumaticCraft Plastic as a Gate?

PneumaticCraft produces **Plastic Sheets** from **oil** via its own refinery chain:
1. Pump oil (occurring in the world or via Create: Diesel Generators)
2. Thermopneumatic Processing Plant: oil → biodiesel → plastic
3. Plastic Sheet: crafting ingredient for all advanced PNC recipes

**Synergies:**
- Create: Diesel Generators use the same oil → **resource competition** (energy or plastic?)
- Mekanism Electrolytic Separator produces brine from water + salt → minimally complex
- The gate combines: build PneumaticCraft infrastructure + make the oil decision

---

## KubeJS Implementation — Key Spots

### 1. Create Crushing Wheels → deterministic x2
```javascript
// src/kubejs/server_scripts/ore_processing/create_crushing.js
ServerEvents.recipes(event => {
  const crushedOres = [
    ['minecraft:iron_ore',   'minecraft:raw_iron',      'create:crushed_raw_iron'],
    ['minecraft:gold_ore',   'minecraft:raw_gold',      'create:crushed_raw_gold'],
    ['minecraft:copper_ore', 'minecraft:raw_copper',    'create:crushed_raw_copper'],
    // Mekanism metals:
    ['mekanism:osmium_ore',  'mekanism:raw_osmium',     'apex:crushed_osmium'],
    // ... all relevant ores
  ]

  crushedOres.forEach(([ore, raw, crushed]) => {
    // Ore block → 2× crushed (deterministic, no randomness)
    event.custom({
      type: 'create:crushing',
      ingredients: [{ item: ore }],
      results: [
        { item: crushed, count: 2 },
        // Small bonus drop (10%): kept optional for balance reasons
        // { item: 'create:experience_nugget', chance: 0.1 }
      ],
      processingTime: 200
    })
    // Raw material → 2× crushed (for the raw-block variant)
    event.custom({
      type: 'create:crushing',
      ingredients: [{ item: raw }],
      results: [{ item: crushed, count: 2 }],
      processingTime: 200
    })
  })
})
```

### 2. Mekanism Enrichment: crushed ore as input
```javascript
// src/kubejs/server_scripts/ore_processing/mekanism_crushed_input.js
// Mekanism already accepts Create crushed ore out of the box for many metals,
// but for mod metals we need custom recipes:
ServerEvents.recipes(event => {
  event.custom({
    type: 'mekanism:enriching',
    input: { ingredient: { item: 'apex:crushed_osmium' } },
    output: { item: 'mekanism:dust_osmium', count: 2 }
  })
  // ... further custom metals
})
```

### 3. PneumaticCraft Pressure Chamber — Tier 5 (x16)
```javascript
// src/kubejs/server_scripts/ore_processing/pnc_tier5.js
ServerEvents.recipes(event => {
  const apexMetals = [
    ['mekanism:dust_iron',   'apex:refined_iron_pellet'],
    ['mekanism:dust_gold',   'apex:refined_gold_pellet'],
    ['mekanism:dust_osmium', 'apex:refined_osmium_pellet'],
    // ...
  ]

  apexMetals.forEach(([dust, pellet]) => {
    event.custom({
      type: 'pneumaticcraft:pressure_chamber',
      inputs: [
        { item: dust, count: 8 },
        { item: 'pneumaticcraft:plastic', count: 4 },
        { item: 'mekanism:brine_bucket', count: 1 }  // or as a fluid input
      ],
      outputs: [
        { item: pellet, count: 16 },
        // return the brine bucket
        { item: 'minecraft:bucket', count: 1 }
      ],
      pressure: 4.0
    })
  })
})
```

### 4. Refined Pellets → ingots (smelting)
```javascript
// Simple smelting recipe for all refined pellets:
ServerEvents.recipes(event => {
  event.smelting('mekanism:ingot_iron', 'apex:refined_iron_pellet').xp(0.1)
  // or via the Mekanism Energized Smelter (faster + no furnace slot)
})
```

---

## Supported Metals (planned)

| Metal | Vanilla? | Source | Tier 5 worthwhile? |
|--------|---------|--------|-----------------|
| Iron | ✓ | Vanilla | ✓ |
| Gold | ✓ | Vanilla | ✓ |
| Copper | ✓ | Vanilla | ✓ |
| Osmium | — | Mekanism | ✓ |
| Tin | — | Mekanism ⚠️ / Thermal | ✓ |
| Lead | — | Mekanism | ✓ |
| Uranium | — | Mekanism | ✓ (fusion gate) |
| Netherite (scrap) | ✓ | Vanilla | ✓ (expensive) |
| Certus Quartz | — | AE2 | Optional |

---

## Balancing Considerations

- **Plastic as a consumable**: oil is limited → makes x16 not "free" at large scale
- **Brine**: easy to make (Mekanism Electrolytic Separator), no hard gate
- **Tier 4→5 cost**: 8 dust + 4 plastic → 16 pellets = you invest 4 plastic per 2 bonus ingots
  - Per pellet: 0.25 plastic + 0.5 dust → 1 ingot
  - Only worthwhile at large scale → perfect for late-game automation
- **No Tier-5 automation without AE2**: the pipeline is so complex that you need AE2 auto-crafting
  → Forces the player to connect all systems

---

## Open Implementation Questions

- [ ] Does Mekanism accept Create crushed ore natively? (Test — possibly already built-in)
- [ ] PneumaticCraft fluid input for brine (bucket vs. fluid interface)
- [ ] `apex:` namespace: do we need our own mini-mod, or are KubeJS custom items enough?
  - KubeJS can register custom items → no extra mod needed
- [ ] Does Serene Seasons affect Mystical Agriculture crop growth rate?
