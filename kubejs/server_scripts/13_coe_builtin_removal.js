// 13_coe_builtin_removal.js
// Disable COE's built-in drill heads and the built-in vanilla-ore veins,
// so our tiered heads + rebalanced (finite + ley-line) veins replace them.
ServerEvents.recipes(event => {
    // Built-in drill-head crafting recipes
    event.remove({ id: 'createoreexcavation:drill' })            // "Iron Drill"
    event.remove({ id: 'createoreexcavation:diamond_drill' })
    event.remove({ id: 'createoreexcavation:netherite_drill' })

    // Built-in vanilla-ore drilling/vein recipes we redefine ourselves
    const builtinVeins = [
        'iron', 'copper', 'gold', 'zinc', 'diamond',
        'netherite', 'hardened_diamond'
    ]
    builtinVeins.forEach(ore => {
        event.remove({ id: `createoreexcavation:drilling/${ore}` })
    })
    // NOTE: coal/redstone/lapis/emerald/quartz/nether_gold/glowstone built-in
    // veins are intentionally LEFT in place (acceptable secondary sources).
})
