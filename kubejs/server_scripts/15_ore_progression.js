// 15_ore_progression.js — every ore via COE: finite vein + infinite ley line,
// hard head-gated by cumulative drill tier tags. Replaces the per-metal scripts.
ServerEvents.recipes(event => {
    const coe = event.recipes.createoreexcavation
    const TAG = t => `#gaia:drills/tier${t}`

    // id, block (vein type/display), raw (drilling output), n (output count),
    // tier (finite-vein min head), nether?, color (Minecraft color name for Better Finder)
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
        { id:'silver',        block:'occultism:silver_ore',               raw:'occultism:raw_silver',                  n:2, tier:2, color:'white'    },
        { id:'inferium',      block:'mysticalagriculture:inferium_ore',   raw:'mysticalagriculture:inferium_essence', n:3, tier:2, color:'green'    },
        { id:'uranium',       block:'mekanism:uranium_ore',               raw:'mekanism:raw_uranium',                  n:1, tier:3, color:'green'    },
        { id:'fluorite',      block:'mekanism:fluorite_ore',              raw:'mekanism:fluorite_gem',                 n:2, tier:3, color:'white'    },
        { id:'diamond',       block:'minecraft:diamond_ore',              raw:'minecraft:diamond',                     n:1, tier:3, color:'aqua'     },
        { id:'emerald',       block:'minecraft:emerald_ore',              raw:'minecraft:emerald',                     n:1, tier:3, color:'green'    },
        { id:'prosperity',    block:'mysticalagriculture:prosperity_ore', raw:'mysticalagriculture:prosperity_shard', n:2, tier:3, color:'white'    },
        { id:'thorium',       block:'create_new_age:thorium_ore',         raw:'create_new_age:thorium',                n:1, tier:4, color:'dark_gray'},
        { id:'uraninite',     block:'powah:uraninite_ore',                raw:'powah:uraninite_raw',                   n:1, tier:4, color:'dark_gray'},
        // nether
        { id:'nether_quartz', block:'minecraft:nether_quartz_ore',        raw:'minecraft:quartz',                      n:3, tier:2, nether:true, cf:'quartz',    color:'white'  },
        { id:'nether_gold',   block:'minecraft:nether_gold_ore',          raw:'minecraft:gold_nugget',                 n:6, tier:3, nether:true, color:'gold'   },
        { id:'glowstone',     block:'minecraft:glowstone',                raw:'minecraft:glowstone_dust',              n:4, tier:3, nether:true, color:'yellow' },
        { id:'ancient_debris',block:'minecraft:ancient_debris',           raw:'minecraft:ancient_debris',              n:1, tier:3, nether:true, cf:'netherite', color:'dark_red'}
    ]

    ORES.forEach((o, i) => {
        const biome = o.nether ? 'c:is_nether' : 'c:is_overworld'
        // Better Finder colours radar markers via a hardcoded switch on the vein id's LAST
        // segment (it strips everything before ':' or '/'). Name ids 'gaia:veins/<seg>' so the
        // segment matches a known material (iron/gold/copper/coal/redstone/lapis/zinc/diamond/
        // emerald/nether_gold/glowstone/quartz/netherite). Unknown segments -> default orange.
        const seg = o.cf || o.id

        const fSpacing = 140 + o.tier * 30 + (i % 5) * 16
        const fSalt = 50021 + i * 104729
        
        const veinName = JSON.stringify({ text: `${o.id.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} Deposit`, color: o.color })

        // ONE finite vein per ore. COE ties finite/infinite to the recipe id, so a single
        // radar source must be uniformly finite (per-instance "% infinite" is impossible
        // without a custom mod — see BL-022). veinSize is the amountMultiplier; the per-chunk
        // randomMul rolls UNIFORMLY in [min,max] x finiteAmountBase(1000). So 0.5..30 -> a
        // vein holds ~500..30000 raw ore (low ~500-1000, top ~20-30k). NOTE: uniform roll, so
        // there's no "mostly mid" bias — every size in the range is equally likely.
        coe.vein(veinName, o.raw)
            .placement(fSpacing, 32, fSalt).veinSize(0.5, 30).alwaysFinite()
            .biomeWhitelist(biome).id(`gaia:veins/${seg}`)

        // RECIPE MATRIX
        const addRecipes = (veinId, minHeadTag) => {
            // Base Output
            const baseItem = Item.of(o.raw, o.n)
            // Enhanced Output (Brine) -> 50% more output
            const enhancedItem = Item.of(o.raw, Math.floor(o.n * 1.5) || 1)
            
            // Premium Output
            const premiumItem = [ Item.of(o.raw, o.n + 1), coeutil.processingOutput('gaia:resource_catalyst', 0.02) ]
            // Premium Enhanced (Brine) -> 50% more output
            const premiumEnhancedItem = [ Item.of(o.raw, Math.floor((o.n + 1) * 1.5)), coeutil.processingOutput('gaia:resource_catalyst', 0.05) ]

            // Prio 0: Standard Drill, No Fluid
            coe.drilling(baseItem, veinId, 240)
                .drill(minHeadTag).priority(0).id(`${veinId}_drill_base`)
                
            // Prio 1: Standard Drill, Mekanism Brine
            coe.drilling(enhancedItem, veinId, 240)
                .drill(minHeadTag).fluid('mekanism:brine 100').priority(1).id(`${veinId}_drill_brine`)
                
            // Prio 2: Premium Drill (Gaia), No Fluid
            coe.drilling(premiumItem, veinId, 200)
                .drill('gaia:gaia_infused_drill_head').priority(2).id(`${veinId}_premium_base`)
                
            // Prio 3: Premium Drill (Gaia), Mekanism Brine
            coe.drilling(premiumEnhancedItem, veinId, 200)
                .drill('gaia:gaia_infused_drill_head').fluid('mekanism:brine 100').priority(3).id(`${veinId}_premium_brine`)
        }

        addRecipes(`gaia:veins/${seg}`, TAG(o.tier))
    })
})
