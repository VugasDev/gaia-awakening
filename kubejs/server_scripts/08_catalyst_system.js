// 08_catalyst_system.js
// 3-path Catalyst system for MA T3+T4 Seed gating
//
// Paths:
//   1. Passive:    Drop from Ore Excavation Veins (06_loot_modifications.js)
//   2. MA-Alt:     Mechanical Crafter recipe (below)
//   3. Active:     Boss/Dungeon drops (06_loot_modifications.js) + Catalyst Altar (below)
//
// Mythic Catalyst: Cataclysm Apex bosses only → automatable via Drygmys (Ars Nouveau)

// ==========================================================================
// MA SEED OVERRIDES — own block so Create-recipe errors don't kill these
// ==========================================================================

ServerEvents.recipes(event => {

    // T3 Seeds require gaia:resource_catalyst
    // Standard MA T3 recipe: 4× Inferium + 4× T2 material + center item
    // Override: center = Resource Catalyst
    const t3Seeds = [
        { seed: 'mysticalagriculture:gold_seeds',     base: 'minecraft:gold_ingot' },
        { seed: 'mysticalagriculture:diamond_seeds',  base: 'minecraft:diamond' },
        { seed: 'mysticalagriculture:emerald_seeds',  base: 'minecraft:emerald' },
        { seed: 'mysticalagriculture:glowstone_seeds',base: 'minecraft:glowstone_dust' }
    ]
    t3Seeds.forEach(function(entry) {
        event.remove({ output: entry.seed })
        event.shaped(entry.seed, [
            'IBI',
            'BCB',
            'IBI'
        ], {
            I: 'mysticalagriculture:inferium_essence',
            B: entry.base,
            C: 'gaia:resource_catalyst'
        })
    })

    // T4 Seeds (Mystical Agriculture base) require gaia:mythic_catalyst
    // Mythic Catalyst only from Cataclysm Apex bosses + Drygmy farm
    const t4Seeds = [
        { seed: 'mysticalagriculture:osmium_seeds',   base: 'mekanism:ingot_osmium' },
        { seed: 'mysticalagriculture:tin_seeds',      base: 'mekanism:ingot_tin' },
        { seed: 'mysticalagriculture:lead_seeds',     base: 'mekanism:ingot_lead' },
        { seed: 'mysticalagriculture:uranium_seeds',  base: 'mekanism:ingot_uranium' },
        { seed: 'mysticalagriculture:fluorite_seeds', base: 'mekanism:fluorite_gem' }
    ]
    t4Seeds.forEach(function(entry) {
        event.remove({ output: entry.seed })
        event.shaped(entry.seed, [
            'IBI',
            'BMB',
            'IBI'
        ], {
            I: 'mysticalagriculture:prudentium_essence',
            B: entry.base,
            M: 'gaia:mythic_catalyst'
        })
    })
})

// ==========================================================================
// CREATE RECIPES — separate block; errors here don't affect seed overrides
// ==========================================================================

ServerEvents.recipes(event => {

    // PATH 2: MA-Alt — Mechanical Crafter recipe for Resource Catalyst
    // Requires T2 MA Essences (Iron + Lapis + Quartz) + Apotheosis Gem + center
    // Only craftable in Mechanical Crafter — no crafting table shortcut
    // TODO: verify apotheosis gem item ID in 1.21.1 (apotheosis:common_gem ?)
    event.custom({
        type: 'create:mechanical_crafting',
        accept_mirrored: false,
        category: 'misc',
        pattern: ['III', 'LGL', 'QQQ'],
        key: {
            I: { item: 'mysticalagriculture:iron_essence' },
            L: { item: 'mysticalagriculture:lapis_lazuli_essence' },
            Q: { item: 'mysticalagriculture:nether_quartz_essence' },
            G: { item: 'apotheosis:gem' }
        },
        result: { id: 'gaia:resource_catalyst', count: 1 }
    })

    // PATH 3c: Catalyst Altar — Create:EI Spout recipes
    // Variant A: Catalyst Altar + Hyper Experience (1000 mB) → Resource Catalyst
    event.custom({
        type: 'create:filling',
        ingredients: [
            { item: 'gaia:catalyst_altar' },
            { type: 'neoforge:single', amount: 1000, fluid: 'gaia:hyper_experience' }
        ],
        results: [ { id: 'gaia:resource_catalyst' } ]
    })

    // Variant B: Catalyst Altar + Mythic Liquid XP (500 mB) → Mythic Catalyst
    event.custom({
        type: 'create:filling',
        ingredients: [
            { item: 'gaia:catalyst_altar' },
            { type: 'neoforge:single', amount: 500, fluid: 'gaia:mythic_liquid_xp' }
        ],
        results: [ { id: 'gaia:mythic_catalyst' } ]
    })

    // MYTHIC LIQUID XP — Create Mixing recipe
    // Hyper Experience (2000 mB) + Singularity Shard → Mythic Liquid XP (1000 mB)
    // Requires heated mixing (Blaze Burner under Mixer)
    event.custom({
        type: 'create:mixing',
        heat_requirement: 'heated',
        ingredients: [
            { type: 'neoforge:single', amount: 2000, fluid: 'gaia:hyper_experience' },
            { item: 'gaia:singularity_shard' }
        ],
        results: [ { amount: 1000, id: 'gaia:mythic_liquid_xp' } ]
    })
})
