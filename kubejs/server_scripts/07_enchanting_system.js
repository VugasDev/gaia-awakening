// 07_enchanting_system.js
// Enchanting-System Rezepte & Progressions-Gates
//
// Tier-Struktur:
//   T1 — Vanilla Bookshelf
//   T3 — gaia:crystalline_bookshelf  (Mekanism+AE2, Gate: Osmium + Certus)
//   T4 — gaia:stellar_bookshelf      (End-Tier, Gate: Refined Obsidian + Ender Pearl)
//
// NOTE: Die früheren T2 "apotheosis:blazing_bookshelf" und "apotheosis:vial_of_expungement"
//       Rezepte wurden ENTFERNT — diese Item-IDs existieren in Apotheosis 8.5.x nicht
//       (waren erfundene Items in fremdem Namespace -> nicht registrierbar). Falls als
//       Feature gewünscht: als gaia:-Items mit eigener Funktion neu designen (Backlog).

ServerEvents.recipes(event => {

    // T3: Crystalline Bookshelf — Gate: Mekanism Osmium + AE2 Certus
    event.shaped('gaia:crystalline_bookshelf', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        A: 'mekanism:ingot_osmium',
        B: 'ae2:certus_quartz_crystal',
        C: 'minecraft:bookshelf'
    })

    // T4: Stellar Bookshelf — Gate: Mekanism Refined Obsidian + End-Materialien
    event.shaped('gaia:stellar_bookshelf', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        A: 'mekanism:ingot_refined_obsidian',
        B: 'minecraft:ender_pearl',
        C: 'minecraft:end_stone'
    })

    // gaia:mythic_xp_shard — konzentriertes Mythic Liquid XP
    // Gate: Apotheosis gem_dust + Create:EI Super Experience Nugget + apex Singularity
    event.shaped('gaia:mythic_xp_shard', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        A: 'apotheosis:gem_dust',
        B: 'create_enchantment_industry:super_experience_nugget',
        C: 'gaia:singularity_shard'
    })

})
