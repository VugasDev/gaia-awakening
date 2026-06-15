# Enchantment System

The enchantment system in Gaia Awakening is built on **Apotheosis**, **PneumaticCraft: Repressurized**, and **Create: Enchantment Industry**. It has five tiers, each unlocking a higher enchantment level cap and a new upgrade method. Risk of losing inputs begins at Tier 3.

---

## Overview

Enchanting has two independent dimensions:

- **Tier unlocking** — placing the right Apotheosis bookshelves around your enchanting table unlocks a higher maximum enchantment level. This is done once per tier and requires material investment.
- **Enchantment upgrading** — combining or upgrading existing enchanted books to higher levels. This is iterative and becomes progressively more expensive and risky.

The absolute upper limit is not a fixed number but your available resources — primarily **Super Liquid XP** from Create: Enchantment Industry.

---

## Tier Summary

| Tier | Max Table Level | Upgrade Cap | Success Chance | Gate |
|------|----------------|-------------|----------------|------|
| T1 | 30 | V | 100% | Apotheosis wood/stone bookshelves |
| T2 | 50 | XI | 100% | Blazing + Hellish bookshelves, Nether access |
| T3 | 75 | XVI | 85% → 65% | Crystalline bookshelves + Osmium + Certus Quartz |
| T4 | 100 | XXV | 70% → 35% | Enderby bookshelves + Refined Obsidian + End access |
| T5 | Uncapped | Uncapped | 60% → 25% (Super) / 99% → 90% (Mythic) | Cataclysm bosses + Create:EI Super Liquid XP |

---

## Tier 1 — Vanilla+ (Hours 0–5)

**Gate:** No gate. Available immediately.

Apotheosis replaces the standard enchanting table setup. Wood and stone Apotheosis bookshelves provide more Enchanting Power than vanilla bookshelves. The "Too Expensive" anvil limit is removed entirely by Apotheosis, meaning books can be combined indefinitely at a cost of XP.

**Unlocks at T1:**

- Enchanting table maximum: Level 30
- Upgrade cap: Sharpness V (and equivalents)
- Common and Uncommon Apotheosis Gems from cave loot chests
- Apotheosis unique enchants: Scavenger, Lifemend

**Bookshelves:** Apotheosis Typeset Bookshelves (15 needed for T1 maximum)

---

## Tier 2 — Nether-Infused (Hours 5–15)

**Gate:** Nether access + Create Tier 2 (Blaze Burner for Blaze Rod automation)

Apotheosis Blazing and Hellish bookshelves raise the enchanting table maximum to Level 50. Amboss-combine is now available up to Sharpness XI (requires T2 bookshelves to be active).

**Bookshelves needed (8 Blazing + 4 Hellish):**

- Blazing Bookshelf: Blaze Rod + Nether Brick + Apotheosis Typeset Book
- Hellish Bookshelf: Nether Brick Block + Gold Block + Soul Sand

The Create Blaze Burner makes Blaze Rod production viable at scale. Without Create, T2 is expensive and slow.

**Unlocks at T2:**

- Enchanting table maximum: Level 50
- Upgrade cap: Sharpness XI
- Uncommon and Rare Gems in Nether fortresses and YUNG's dungeons
- Apotheosis Smithing Templates in Nether structures

---

## Tier 3 — Crystalline (Hours 15–30)

**Gate:** Mekanism T1 (Osmium) + AE2 entry (Certus Quartz) + PneumaticCraft entry (3.5 bar)

Apotheosis Crystalline Bookshelves raise the cap to Level 75. More importantly, the **PneumaticCraft Pressure Chamber** becomes available as an upgrade machine. This is the first tier where **failure consumes all inputs**.

**Bookshelves needed (8 Crystalline):**

- Crystalline Bookshelf: Mekanism Osmium Ingot + AE2 Certus Crystal + Apotheosis Typeset Book

**Pressure Chamber upgrade (3.5 bar) — T3:**

| Upgrade | Success |
|---------|---------|
| XI → XII | 85% |
| XII → XIII | 80% |
| XIII → XIV | 75% |
| XIV → XV | 70% |
| XV → XVI | 65% |

Example recipe input: Sharpness XI book + 2× Osmium Ingot + 1× Certus Crystal at 3.5 bar.

**On failure:** The book, materials, and XP are all lost. The enchantment level does not change.

**Unlocks at T3:**

- Gem Socketing with Common and Uncommon Gems
- Apotheosis Gem Fusion: 3× same gems → 1× next rarity

---

## Tier 4 — Enderby Elite (Hours 30–50)

**Gate:** End access + Mekanism Refined Obsidian + PneumaticCraft 5.5 bar

Apotheosis Enderby Bookshelves raise the cap to Level 100. The Pressure Chamber at 5.5 bar pushes upgrades from XVI to XXV in several runs. Failure risk increases noticeably.

**Bookshelves needed (8 Enderby):**

- Enderby Bookshelf: Mekanism Refined Obsidian Ingot + End Stone Bricks + Ender Pearl + Apotheosis Typeset Book

**Pressure Chamber upgrade (5.5 bar) — T4:**

| Upgrade | Success |
|---------|---------|
| XVI → XVII | 70% |
| XVII → XIX | 65% |
| XIX → XXI | 55% |
| XXI → XXIII | 45% |
| XXIII → XXV | 35% |

Example recipe input: Sharpness XVI book + Refined Obsidian + Fluix Crystal at 5.5 bar.

**Unlocks at T4:**

- Gem Socketing with Rare and Epic Gems
- First Create:EI Liquid XP automation (standard Liquid XP)

---

## Tier 5 — Legendary / Uncapped (Hours 50+)

**Gate:** Cataclysm Apex bosses defeated + Create:EI Super Liquid XP production established

Level cap is removed. The only limit is your XP production. Two distinct paths exist at T5:

### Path A — Super Liquid XP (High-Risk, Lower Cost per Attempt)

| Level Range | Success |
|-------------|---------|
| XXV – XXX | 60% |
| XXX – L | 50% |
| L – C | 40% |
| C – CC | 30% |
| CC+ | 25% (floor) |

XP cost per attempt scales with level. At XXV a single attempt costs ~500 mB Super Liquid XP; at level C it costs ~10,000 mB.

### Path B — Mythic Liquid XP (Low-Risk, Extreme Production Cost)

| Level Range | Success |
|-------------|---------|
| XXV – L | 99% |
| L – C | 97% |
| C – CC | 95% |
| CC – D | 92% |
| D+ | 90% (floor) |

Mythic XP is approximately 1,000× more concentrated than Super XP. Production of even a few mB per hour requires a maxed-out Create compression chain.

**The T5 choice:** Many cheap Super XP attempts (25–60% success, frequent losses) versus a small number of expensive Mythic XP attempts (90–99% success, extreme production time). Both paths reach the same destination.

**XP pipeline for T5:**

```
Mob Farm → XP Drain → Liquid XP → Super Compressor → Super Liquid XP
                                    Super Compressor (max RPM, Create T3+) → Mythic Liquid XP
```

**Unlocks at T5:**

- Mythic Gem Socketing (strongest passive bonuses in the pack)
- Apotheosis Unique Enchants (boss-loot only, not craftable)

---

## Gem System

| Rarity | Source | Socketing Unlocked | Example Bonus |
|--------|--------|--------------------|---------------|
| Common | All cave loot chests | T3 | +5% damage |
| Uncommon | YUNG's Dungeons | T3 | +10% defence |
| Rare | When Dungeons Arise, YUNG's Better Strongholds | T3–T4 | +15% speed |
| Epic | Apotheosis boss loot, Cataclysm entry dungeons | T4 | +25% crit chance |
| Mythic | Cataclysm Apex bosses, PNC Pressure Chamber 7.5 bar | T5 | +40% damage + special effect |

Epic and Mythic Gems are restricted to boss loot and high-pressure chamber recipes — they do not appear in standard dungeon chests.

---

## Failure Rule

From T3 onward, any failed upgrade attempt destroys **all inputs**: the enchanted book, the material ingredients, and the XP. The enchantment level on the lost book is not preserved. Each attempt always produces exactly +1 level on success.

---

## Apotheosis Config

```toml
# config/apotheosis/enchanting.toml
[general]
    removeEnchantingCap = true     # Required for T4/T5 levels above 30
    maxEnchantingPower = 200       # Increased for Crystalline and Enderby bookshelves

[gems]
    epicGemsInBasicLoot = false    # Epic Gems from boss drops only
    mythicGemsInBasicLoot = false  # Mythic Gems from Cataclysm only
```
