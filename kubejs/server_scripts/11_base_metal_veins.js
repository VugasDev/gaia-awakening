// 11_base_metal_veins.js — Crimsite-gated drilling progression
// Part A: expensive Drilling Machine + early head crafting + drill tag.
// Veins (finite + ley lines) are added in the same file (Parts B/C).

// --- Crafting recipes (own block so vein errors don't kill crafting) ---
ServerEvents.recipes(event => {
    // Drilling Machine — the expensive ore-mining gate (lots of iron).
    // Override COE's cheap default recipe.
    event.remove({ id: 'createoreexcavation:drilling_machine' })
    event.shaped('createoreexcavation:drilling_machine', [
        'III',
        'ICI',
        'IBI'
    ], {
        I: 'minecraft:iron_block',          // 6 iron blocks = 54 ingots worth
        C: 'create:precision_mechanism',
        B: 'create:brass_casing'
    })

    // Basic Drill Head — entry tier, expensive in iron, low yield (set in veins)
    event.shaped('gaia:basic_drill_head', [
        'III',
        'IDI',
        'III'
    ], {
        I: 'minecraft:iron_ingot',          // 8 ingots + andesite drill core
        D: 'create:andesite_alloy'
    })

    // Reinforced Drill Head — T2 upgrade from Basic, iron + brass tier (Create has no steel ingot)
    event.shaped('gaia:reinforced_drill_head', [
        'BSB',
        'SDS',
        'BSB'
    ], {
        B: 'create:brass_ingot',
        S: 'minecraft:iron_ingot',
        D: 'gaia:basic_drill_head'
    })
})

// --- Add early heads to the COE drill tag ---
ServerEvents.tags('item', event => {
    event.add('createoreexcavation:drills', [
        'gaia:basic_drill_head',
        'gaia:reinforced_drill_head'
    ])
})

// Part B — base-metal veins: common finite + rare infinite ley line.
// finite amount = finiteAmountBase (config = 1000) * veinSize.
// veinSize MUST be integers (floats caused FluidBuilder/COE instability earlier;
// the rest of the pack uses integer veinSize). 1..3 => 1000..3000 raw items
// (the per-drill 240-tick rate means even 1000 is a long-lived vein).
ServerEvents.recipes(event => {

    const baseMetals = [
        { id: 'iron',   raw: 'minecraft:raw_iron',   color: 'white',  salt: 51001 },
        { id: 'copper', raw: 'minecraft:raw_copper', color: 'gold',   salt: 51002 },
        { id: 'gold',   raw: 'minecraft:raw_gold',   color: 'yellow', salt: 51003 },
        { id: 'zinc',   raw: 'create:raw_zinc',      color: 'gray',   salt: 51004 }
    ]

    baseMetals.forEach(m => {
        // Common FINITE vein — small spacing (common). placement(spacing, separation, salt)
        event.recipes.createoreexcavation.vein(
            { text: `${m.id} Vein`, color: m.color }, m.raw
        ).placement(24, 8, m.salt).veinSize(1, 3).alwaysFinite()
         .biomeWhitelist('forge:is_overworld').id(`gaia:${m.id}_vein`)

        // any drill (incl. Basic) — trickle
        event.recipes.createoreexcavation.drilling(
            Item.of(m.raw, 2), `gaia:${m.id}_vein`, 240
        ).id(`gaia:${m.id}_any`)

        // Reinforced head — better yield + faster
        event.recipes.createoreexcavation.drilling(
            Item.of(m.raw, 4), `gaia:${m.id}_vein`, 160
        ).drill('gaia:reinforced_drill_head').priority(1).id(`gaia:${m.id}_reinforced`)

        // RARE INFINITE ley line — large spacing (~5% relative to finite)
        event.recipes.createoreexcavation.vein(
            { text: `${m.id} Ley Line`, color: 'light_purple' }, m.raw
        ).placement(220, 32, m.salt + 100000).alwaysInfinite()
         .biomeWhitelist('forge:is_overworld').id(`gaia:${m.id}_ley_line`)

        event.recipes.createoreexcavation.drilling(
            Item.of(m.raw, 2), `gaia:${m.id}_ley_line`, 260
        ).id(`gaia:${m.id}_ley_any`)

        event.recipes.createoreexcavation.drilling(
            Item.of(m.raw, 4), `gaia:${m.id}_ley_line`, 170
        ).drill('gaia:reinforced_drill_head').priority(1).id(`gaia:${m.id}_ley_reinforced`)
    })
})
