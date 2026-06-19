// 14_drill_tier_tags.js — cumulative drill-head tier tags for COE gating.
// A tierN tag contains every head of tier >= N, so "minimum tier N" = membership in tierN.
ServerEvents.tags('item', event => {
    const H = {
        basic:    'gaia:basic_drill_head',
        reinf:    'gaia:reinforced_drill_head',
        osmium:   'gaia:osmium_drill_head',
        nether:   'gaia:nether_drill_head',
        crystal:  'gaia:crystal_drill_head',
        refined:  'gaia:refined_obsidian_drill_head',
        gaia:     'gaia:gaia_infused_drill_head'
    }
    const t3 = [H.osmium, H.nether, H.crystal, H.refined, H.gaia]
    event.add('gaia:drills/tier1', [H.basic, H.reinf, ...t3])
    event.add('gaia:drills/tier2', [H.reinf, ...t3])
    event.add('gaia:drills/tier3', t3)
    event.add('gaia:drills/tier4', [H.refined, H.gaia])
    event.add('gaia:drills/tier5', [H.gaia])

    // Every gaia head must be a valid COE drill item (machine drill-slot gate).
    // Consolidates the basic+reinforced tagging previously in 11_base_metal_veins.js Part A.
    event.add('createoreexcavation:drills', Object.values(H))
})
