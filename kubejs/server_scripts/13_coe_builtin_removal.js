// 13_coe_builtin_removal.js — remove COE's built-in drill items + all built-in
// ORE veins & drilling recipes (by explicit id — never matches our gaia: ids,
// so it is safe regardless of script/recipe-event ordering). Our 15_ore_progression.js
// defines every ore vein/drill itself, head-gated. The COE built-in "water" fluid
// vein (for the Extractor) is intentionally left intact (not an ore).
ServerEvents.recipes(event => {
    // Built-in drill-head items (we use gaia: heads instead)
    event.remove({ id: 'createoreexcavation:drill' })
    event.remove({ id: 'createoreexcavation:diamond_drill' })
    event.remove({ id: 'createoreexcavation:netherite_drill' })

    // Built-in ore veins + their drilling recipes (explicit ids; water excluded)
    const BUILTIN = [
        'coal', 'copper', 'diamond', 'emerald', 'glowstone', 'gold',
        'hardened_diamond', 'iron', 'lapis', 'nether_gold', 'netherite',
        'quartz', 'redstone', 'zinc'
    ]
    BUILTIN.forEach(o => {
        event.remove({ id: `createoreexcavation:drilling/${o}` })
        event.remove({ id: `createoreexcavation:ore_vein_type/${o}` })
    })
})
