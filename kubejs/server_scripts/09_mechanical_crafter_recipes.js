// 09_mechanical_crafter_recipes.js
// Mechanical Crafter Rezepte für T3/T4-Infrastruktur — asymmetrische Muster,
// damit diese Items ein etabliertes Create-Setup (Brass-Tier) voraussetzen.
//
// NOTE: KubeJS 2101's high-level create.mechanical_crafting(output, pattern, keys)
// signature no longer matches Create 6's serializer -> use native event.custom JSON:
//   { type, accept_mirrored, category, key:{X:{item|tag}}, pattern:[...], result:{id,count} }

ServerEvents.recipes(event => {

    // MEKANISM PURIFICATION CHAMBER (T3 Ore-Tripling Gate) — O=Osmium, C=Compressor, B=Brass, G=ChemicalTank
    event.remove({ output: 'mekanism:purification_chamber' })
    event.custom({
        type: 'create:mechanical_crafting',
        accept_mirrored: false,
        category: 'misc',
        pattern: ['OOB', 'OCB', 'OGB'],
        key: {
            O: { item: 'mekanism:ingot_osmium' },
            C: { item: 'mekanism:osmium_compressor' },
            B: { item: 'create:brass_ingot' },
            G: { item: 'mekanism:basic_chemical_tank' }
        },
        result: { id: 'mekanism:purification_chamber', count: 1 }
    })

    // AE2 ME DRIVE (T3 AE2 Massenspeicher-Gate)
    event.remove({ output: 'ae2:drive' })
    event.custom({
        type: 'create:mechanical_crafting',
        accept_mirrored: false,
        category: 'misc',
        pattern: ['BPB', 'IDI', 'III'],
        key: {
            B: { item: 'create:brass_casing' },
            P: { item: 'create:precision_mechanism' },
            I: { item: 'minecraft:iron_block' },
            D: { item: 'ae2:logic_processor' }
        },
        result: { id: 'ae2:drive', count: 1 }
    })

    // PNEUMATICCRAFT ADVANCED PRESSURE TUBE (T4 PNC Gate)
    event.remove({ output: 'pneumaticcraft:advanced_pressure_tube' })
    event.custom({
        type: 'create:mechanical_crafting',
        accept_mirrored: false,
        category: 'misc',
        pattern: [' P ', 'BCB', 'P P', ' I '],
        key: {
            P: { item: 'create:fluid_pipe' },
            B: { item: 'create:brass_ingot' },
            C: { item: 'pneumaticcraft:compressed_iron_block' },
            I: { item: 'pneumaticcraft:pressure_tube' }
        },
        result: { id: 'pneumaticcraft:advanced_pressure_tube', count: 1 }
    })

    // MEKANISM DIGITAL MINER (T4 Auto-Mining Gate)
    event.remove({ output: 'mekanism:digital_miner' })
    event.custom({
        type: 'create:mechanical_crafting',
        accept_mirrored: false,
        category: 'misc',
        pattern: [' P ', 'OMO', ' A '],
        key: {
            P: { item: 'create:precision_mechanism' },
            O: { item: 'mekanism:ingot_refined_obsidian' },
            M: { item: 'mekanism:steel_casing' },
            A: { item: 'mekanism:alloy_infused' }
        },
        result: { id: 'mekanism:digital_miner', count: 1 }
    })

})
