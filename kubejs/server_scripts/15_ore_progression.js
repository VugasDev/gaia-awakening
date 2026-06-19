// 15_ore_progression.js — every ore via COE: finite vein + infinite ley line,
// hard head-gated by cumulative drill tier tags. Replaces the per-metal scripts.
ServerEvents.recipes(event => {
    const coe = event.recipes.createoreexcavation
    const TAG = t => `#gaia:drills/tier${t}`

    // id, block (vein type/display), raw (drilling output), n (output count),
    // tier (finite-vein min head), nether?, color
    const ORES = [
        { id:'coal',          block:'minecraft:coal_ore',                 raw:'minecraft:coal',                        n:3, tier:1, color:'black'    },
        { id:'iron',          block:'minecraft:iron_ore',                 raw:'minecraft:raw_iron',                    n:2, tier:1, color:'white'    },
        { id:'copper',        block:'minecraft:copper_ore',               raw:'minecraft:raw_copper',                  n:3, tier:1, color:'gold'     },
        { id:'gold',          block:'minecraft:gold_ore',                 raw:'minecraft:raw_gold',                    n:2, tier:2, color:'yellow'   },
        { id:'zinc',          block:'create:zinc_ore',                    raw:'create:raw_zinc',                       n:2, tier:2, color:'gray'     },
        { id:'redstone',      block:'minecraft:redstone_ore',             raw:'minecraft:redstone',                    n:4, tier:2, color:'red'      },
        { id:'lapis',         block:'minecraft:lapis_ore',                raw:'minecraft:lapis_lazuli',                n:4, tier:2, color:'blue'     },
        { id:'osmium',        block:'mekanism:osmium_ore',                raw:'mekanism:raw_osmium',                   n:2, tier:2, color:'blue'     },
        { id:'tin',           block:'mekanism:tin_ore',                   raw:'mekanism:raw_tin',                      n:2, tier:2, color:'white'    },
        { id:'lead',          block:'mekanism:lead_ore',                  raw:'mekanism:raw_lead',                     n:2, tier:2, color:'dark_gray'},
        { id:'inferium',      block:'mysticalagriculture:inferium_ore',   raw:'mysticalagriculture:inferium_essence', n:3, tier:2, color:'green'    },
        { id:'uranium',       block:'mekanism:uranium_ore',               raw:'mekanism:raw_uranium',                  n:1, tier:3, color:'green'    },
        { id:'fluorite',      block:'mekanism:fluorite_ore',              raw:'mekanism:fluorite_gem',                 n:2, tier:3, color:'white'    },
        { id:'diamond',       block:'minecraft:diamond_ore',              raw:'minecraft:diamond',                     n:1, tier:3, color:'aqua'     },
        { id:'emerald',       block:'minecraft:emerald_ore',              raw:'minecraft:emerald',                     n:1, tier:3, color:'green'    },
        { id:'prosperity',    block:'mysticalagriculture:prosperity_ore', raw:'mysticalagriculture:prosperity_shard', n:2, tier:3, color:'yellow'   },
        { id:'thorium',       block:'create_new_age:thorium_ore',         raw:'create_new_age:thorium',                n:1, tier:4, color:'green'    },
        { id:'uraninite',     block:'powah:uraninite_ore',                raw:'powah:uraninite_raw',                   n:1, tier:4, color:'green'    },
        // nether
        { id:'nether_quartz', block:'minecraft:nether_quartz_ore',        raw:'minecraft:quartz',                      n:3, tier:2, nether:true, color:'white'  },
        { id:'nether_gold',   block:'minecraft:nether_gold_ore',          raw:'minecraft:gold_nugget',                 n:6, tier:3, nether:true, color:'gold'   },
        { id:'glowstone',     block:'minecraft:glowstone',                raw:'minecraft:glowstone_dust',              n:4, tier:3, nether:true, color:'yellow' },
        { id:'ancient_debris',block:'minecraft:ancient_debris',           raw:'minecraft:ancient_debris',              n:1, tier:3, nether:true, color:'dark_red'}
    ]

    let salt = 60000
    ORES.forEach(o => {
        salt += 1
        const biome = o.nether ? 'c:is_nether' : 'c:is_overworld'
        const leyTier = Math.min(o.tier + 1, 5)

        // finite vein — depletes; min head = o.tier
        coe.vein({ text: `${o.id} Deposit`, color: o.color }, o.block)
            .placement(24, 8, salt).veinSize(1, 3).alwaysFinite()
            .biomeWhitelist(biome).id(`gaia:${o.id}_vein`)
        coe.drilling(Item.of(o.raw, o.n), `gaia:${o.id}_vein`, 240)
            .drill(TAG(o.tier)).id(`gaia:${o.id}_drill`)

        // infinite ley line — renewable; min head = one tier up
        coe.vein({ text: `${o.id} Ley Line`, color: o.color }, o.block)
            .placement(220, 32, salt + 100000).alwaysInfinite()
            .biomeWhitelist(biome).id(`gaia:${o.id}_ley`)
        coe.drilling(Item.of(o.raw, o.n), `gaia:${o.id}_ley`, 240)
            .drill(TAG(leyTier)).id(`gaia:${o.id}_ley_drill`)

        // premium: Gaia-Infused head — best yield + small catalyst byproduct.
        // Higher priority than the tier recipe (the tier tag also contains the gaia head),
        // so a gaia head always rolls the premium recipe. Preserves the old "best head = bonus" flavor.
        const premium = [ Item.of(o.raw, o.n + 1), coeutil.processingOutput('gaia:resource_catalyst', 0.02) ]
        coe.drilling(premium, `gaia:${o.id}_vein`, 200)
            .drill('gaia:gaia_infused_drill_head').priority(2).id(`gaia:${o.id}_premium`)
        coe.drilling(premium, `gaia:${o.id}_ley`, 200)
            .drill('gaia:gaia_infused_drill_head').priority(2).id(`gaia:${o.id}_ley_premium`)
    })
})
