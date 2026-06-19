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
        I: 'minecraft:iron_block',          // 7 iron blocks = 63 ingots worth
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

