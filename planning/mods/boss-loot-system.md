# Boss Loot System — "OP Loot" Integration

> **Status**: Concept — 2026-04-29
> Goal: Bosses from Cataclysm, Mowzie's Mobs and Iron's Spells should deliver rewards that go beyond vanilla/standard.

---

## Core Concept

The loot is split into three categories:
1. **Unique weapons/relics**: directly from the boss mod (e.g. Cataclysm).
2. **Apotheosis escalation**: guaranteed high-tier gems and affixes.
3. **Tech ingredients**: materials needed for the late game in Create/Mekanism.

---

## Boss Tiering & Rewards

### Tier 1: Exploration Bosses (Early Game)
*   **Bosses**: Ferrous Wroughtnaut (Mowzie's), Corrupt Ogre (Dungeons & Taverns).
*   **Artifacts/Relics**: chance at rare trinkets (Bunny Hoppers, Power Glove).
*   **Apotheosis**: 100% drop of *Common* to *Uncommon* gems.
*   **Tech**: components for Create presses and mixers.

### Tier 2: Mid-Game Challenges
*   **Bosses**: Netherite Monstrosity (Cataclysm), Dead King (Iron's Spells).
*   **Apotheosis**: guaranteed *Epic Gem*. Items drop with the "Reforged" affix.
*   **Relics**: XP boost for worn relics.
*   **Tech**: first drop of "Ancient Metal" (needed for the AE2 ME Controller).

### Tier 3: Apex Bosses (Endgame)
*   **Bosses**: Ignis, The Harbinger, Ender Guardian (all Cataclysm).
*   **Apotheosis**: guaranteed *Mythic Gem*. Chance at "Godly" affixes.
*   **Artifacts**: uniques like the *Eternal Compass* or *Void Totem*.
*   **Tech**: "Singularity Shards" for the Mekanism Fusion Reactor or Create Aeronautics apex drives.

---

## Automation (Late Game)

Instead of a technical simulation we use the magical path of **Ars Nouveau**:

1.  **Drygmies**: these spirits collect loot from nearby mobs/bosses without killing them.
2.  **Challenge**:
    *   **Containment**: the boss must be kept alive within range of the Drygmies (e.g. in a reinforced cell made of Create blocks).
    *   **Source infrastructure**: Drygmies need a constant supply of **Source** (magic energy) to work.
3.  **Advantage**: no "dead" simulations, but a living boss farm that looks great.

---

## KubeJS Integration (Planning)
...
To make the loot "OP", we need to adjust the loot tables via KubeJS:

```javascript
// Example for Cataclysm Ignis loot modification
LootJS.modifiers((event) => {
    event.addEntityLootModifier("cataclysm:ignis")
        .addLoot("apotheosis:gem{gem:\"apotheosis:core/fire\", rarity:\"mythic\"}")
        .addLoot("create_aeronautics:apex_core_fragment")
        .addWeightedLoot([1, 5], ["minecraft:netherite_upgrade_smithing_template"]);
});
```

---

## Balancing Rules

1. **No grind**: bosses should only need to be defeated once (or rarely) to trigger progression, instead of being farmed 100x.
2. **Quality over quantity**: better one extremely powerful item (OP) than an inventory full of junk.
3. **Synergy**: boss loot should speed up — or even enable — building the "Flying Fortress" (Create Aeronautics).
