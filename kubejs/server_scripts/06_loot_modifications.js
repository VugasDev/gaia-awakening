// 06_loot_modifications.js — LootJS 3.x API (almostreliable).
// The old LootJS 2.x API (LootJS.modifiers / addEntityLootModifier /
// addLootTableModifier) was removed; 3.x uses LootJS.lootTables + event.entity(...).
LootJS.modifiers(event => {

    const drop = (entityId, item, min, max) => {
        event.addEntityModifier(entityId)
            .addLoot(LootEntry.of(item).setCount([min, max]))
    }

    // T5 Singularity Shards — Cataclysm Apex bosses (Fusion Reactor gate)
    const apexBosses = ['cataclysm:ignis', 'cataclysm:the_harbinger', 'cataclysm:ender_guardian']
    apexBosses.forEach(b => drop(b, 'gaia:singularity_shard', 1, 2))

    // T3 Resource Catalyst — guaranteed boss drops
    const t3CatalystBosses = [
        'mowziesmobs:ferrous_wroughtnaut',
        'mowziesmobs:frostmaw',
        'mowziesmobs:naga',
        'mowziesmobs:barakoa',
        'cataclysm:netherite_monstrosity'
    ]
    t3CatalystBosses.forEach(b => drop(b, 'gaia:resource_catalyst', 1, 1))

    // T4 Mythic Catalyst — only Cataclysm apex bosses
    apexBosses.forEach(b => drop(b, 'gaia:mythic_catalyst', 1, 1))

    // TODO (LootJS 3.x): dungeon/stronghold chest + COE vein catalyst drops.
    // The 2.x addLootTableModifier(regex).randomChance().addLoot() form was removed;
    // re-add via the 3.x loot-table-filter API once the exact methods are verified in-game.
})
