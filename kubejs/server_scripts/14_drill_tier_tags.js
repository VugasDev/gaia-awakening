// 14_drill_tier_tags.js — cumulative drill-head tier tags for COE gating.
// A tierN tag contains every head of tier >= N, so "minimum tier N" = membership in tierN.
// NOTE: KubeJS runs on Rhino — do NOT use spread (...) or Object.values here (unsupported,
// causes a hard syntax error that drops the whole file). Use .concat() and explicit arrays.
ServerEvents.tags('item', event => {
    const basic    = 'gaia:basic_drill_head'
    const reinf    = 'gaia:reinforced_drill_head'
    const osmium   = 'gaia:osmium_drill_head'
    const nether   = 'gaia:nether_drill_head'
    const crystal  = 'gaia:crystal_drill_head'
    const refined  = 'gaia:refined_obsidian_drill_head'
    const catalyst = 'gaia:catalyst_drill_head'
    const gaiaHead = 'gaia:gaia_infused_drill_head'

    const t3 = [osmium, nether, crystal, refined, gaiaHead]
    event.add('gaia:drills/tier1', [basic, reinf].concat(t3))
    event.add('gaia:drills/tier2', [reinf].concat(t3))
    event.add('gaia:drills/tier3', t3)
    event.add('gaia:drills/tier4', [refined, gaiaHead])
    event.add('gaia:drills/tier5', [gaiaHead])

    // Every gaia head must be a valid COE drill item (machine drill-slot gate = createoreexcavation:drills).
    // catalyst is a specialist drill for the catalyst-node system; intentionally has no progression tier.
    event.add('createoreexcavation:drills', [basic, reinf, osmium, nether, crystal, refined, catalyst, gaiaHead])
})
