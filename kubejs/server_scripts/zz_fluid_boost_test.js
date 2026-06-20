// zz_fluid_boost_test.js — TEMPORARY: confirm COE drillingFluid works in-game.
// Brine-boosted iron drilling on the iron finite vein. Pump c:brine (fluid form,
// via Mekanism Rotary Condensentrator) into the Drilling Machine while drilling
// gaia:iron_vein with any tier-1+ head -> this high-priority recipe should win and
// yield 8 raw iron fast. Without brine the base recipe runs (2 raw iron, slower).
// Format verified against COE's built-in drilling/netherite.json:
//   "fluid": { "amount": N, "ingredient": { "fluid"|"tag": "..." } }
// REMOVE once the tiered fluid-boost is built.
ServerEvents.recipes(event => {
    event.custom({
        type: 'createoreexcavation:drilling',
        drill: { tag: 'gaia:drills/tier1' },
        fluid: { amount: 100, ingredient: { tag: 'c:brine' } },
        output: [ { id: 'minecraft:raw_iron', count: 8 } ],
        priority: 5,
        ticks: 120,
        stress: 256,
        veinId: 'gaia:iron_vein'
    })
})
