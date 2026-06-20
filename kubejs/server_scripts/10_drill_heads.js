// 10_drill_heads.js — Create: Ore Excavation Custom Veins & Drill Head Upgrade-Pfad
//
// Drill-Head-Progression:
//   Standard (COE built-in)              — Andesite / Iron / Steel / Diamond
//   T3  gaia:osmium_drill_head           — Osmium-Ader, +Catalyst-Chance, +Osmium-Bonus
//   T3  gaia:crystal_drill_head          — Certus/Amethyst-Ader, +Kristall-Bonus
//   T3  gaia:nether_drill_head           — Nether-Ader (nur Nether), +Quartz/Gold-Bonus
//   T4  gaia:refined_obsidian_drill_head — Metall-Ader mit x3 Output + Catalyst
//   T4  gaia:catalyst_drill_head         — Catalyst Node (finite) + Ley Line (infinite)
//   T5  gaia:gaia_infused_drill_head     — Mythische Ader, garantierter Catalyst + Shard-Chance
//
// Catalyst-System:
//   gaia:catalyst_node (alwaysFinite)  — Jeder Drill: kleine Catalyst-Menge; erschöpft sich
//   gaia:catalyst_ley_line (alwaysInfinite) — Nur catalyst_drill_head nützlich; andere → Schotter
//   catalyst_drill_head auf beiden: hoher Yield + kleine Mythic Catalyst Chance
//
// Alle Gaia-Adern sind alwaysFinite — verhindert endloses Farmen einer einzelnen Ader.
//
// Entity-Textur: assets/gaia/textures/entity/drill/<name>.png

// =========================================================================
// HANDWERK-REZEPTE — eigener Block damit COE-Fehler diese nicht killen
// =========================================================================
ServerEvents.recipes(event => {

    // Osmium Drill Head — T3 (benötigt: Osmium + Andesite Casing + Crushed Osmium)
    event.shaped('gaia:osmium_drill_head', [
        'OOO',
        'OCO',
        'OAO'
    ], {
        O: 'mekanism:ingot_osmium',
        C: 'gaia:crushed_osmium',
        A: 'create:andesite_casing'
    })

    // Crystal Drill Head — T3 Spezial (Certus + Amethyst + Osmium als Kern)
    event.shaped('gaia:crystal_drill_head', [
        'CAC',
        'AOA',
        'CAC'
    ], {
        C: 'ae2:certus_quartz_crystal',
        A: 'minecraft:amethyst_shard',
        O: 'mekanism:ingot_osmium'
    })

    // Nether Drill Head — T3 Spezial (Nether Quartz + Blaze + Magma)
    event.shaped('gaia:nether_drill_head', [
        'QBQ',
        'BNB',
        'QBQ'
    ], {
        Q: 'minecraft:quartz',
        B: 'minecraft:blaze_rod',
        N: 'minecraft:magma_block'
    })

    // Refined Obsidian Drill Head — T4
    event.shaped('gaia:refined_obsidian_drill_head', [
        'ROR',
        'OPO',
        'RBR'
    ], {
        R: 'mekanism:ingot_refined_obsidian',
        O: 'mekanism:ingot_osmium',
        P: 'create:precision_mechanism',
        B: 'create:brass_casing'
    })

    // Catalyst Drill Head — T4 (Spezialist, Gate: 4× Resource Catalyst + Refined Obsidian)
    event.shaped('gaia:catalyst_drill_head', [
        'CRC',
        'RPR',
        'CRC'
    ], {
        C: 'gaia:resource_catalyst',
        R: 'mekanism:ingot_refined_obsidian',
        P: 'create:precision_mechanism'
    })

    // Gaia-Infused Drill Head — T5 (Upgrade vom Refined Obsidian Head)
    event.shapeless('gaia:gaia_infused_drill_head', [
        'gaia:refined_obsidian_drill_head',
        'mekanism:alloy_atomic',
        'gaia:singularity_shard',
        'gaia:mythic_catalyst'
    ])

    // Schmelzrezepte — Veredelte Pellets (aus PNC Pressure Chamber)
    event.smelting('minecraft:iron_ingot', 'gaia:refined_iron_pellet').xp(0.2)
    event.smelting('minecraft:gold_ingot', 'gaia:refined_gold_pellet').xp(0.2)
    event.smelting('mekanism:ingot_osmium', 'gaia:refined_osmium_pellet').xp(0.3)
    event.blasting('minecraft:iron_ingot', 'gaia:refined_iron_pellet').xp(0.1)
    event.blasting('minecraft:gold_ingot', 'gaia:refined_gold_pellet').xp(0.1)
    event.blasting('mekanism:ingot_osmium', 'gaia:refined_osmium_pellet').xp(0.15)
})

// =========================================================================
// COE VEINS & DRILLING — eigener Block; Fehler hier killen nicht die Crafting-Rezepte
// =========================================================================
ServerEvents.recipes(event => {

    // ─── Catalyst Node (T4, immer finite) ────────────────────────────────────
    event.recipes.createoreexcavation.vein(
        JSON.stringify({ text: 'Catalyst Node', color: 'gold' }),
        'gaia:catalyst_node'
    )
        .placement(2048, 256, 73849201)
        .veinSize(1, 1)
        .alwaysFinite()
        .biomeWhitelist('c:is_overworld')
        .id('gaia:catalyst_node_vein')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('gaia:resource_catalyst', 2),
            coeutil.processingOutput('gaia:resource_catalyst', 1)
        ],
        'gaia:catalyst_node_vein', 500
    ).id('gaia:catalyst_node_any_drill')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('gaia:resource_catalyst', 5),
            coeutil.processingOutput('gaia:mythic_catalyst', 0.08)
        ],
        'gaia:catalyst_node_vein', 300
    ).drill('gaia:catalyst_drill_head').priority(1).id('gaia:catalyst_node_catalyst_head')

    // ─── Catalyst Ley Line (T4, immer infinite) ───────────────────────────────
    event.recipes.createoreexcavation.vein(
        JSON.stringify({ text: 'Catalyst Ley Line', color: 'light_purple' }),
        'gaia:catalyst_node'
    )
        .placement(4096, 512, 91827364)
        .veinSize(1, 1)
        .alwaysInfinite()
        .biomeWhitelist('c:is_overworld')
        .id('gaia:catalyst_ley_line')

    event.recipes.createoreexcavation.drilling(
        Item.of('minecraft:cobblestone', 1),
        'gaia:catalyst_ley_line', 800
    ).id('gaia:ley_line_any_drill')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('gaia:resource_catalyst', 3),
            coeutil.processingOutput('gaia:mythic_catalyst', 0.05)
        ],
        'gaia:catalyst_ley_line', 350
    ).drill('gaia:catalyst_drill_head').priority(1).id('gaia:ley_line_catalyst_head')
})
