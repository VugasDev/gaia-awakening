# Enchantment System — Gaia Awakening

> **Status**: Planning document — 2026-05-01
> **Mods**: Apotheosis 8.5.2, PneumaticCraft: Repressurized, Create: Enchantment Industry

---

## Design Principle

Enchanting has two dimensions:
- **Tier unlock** (bookshelves): unlocks the maximum of a tier — one-time, material-intensive
- **Enchantment upgrade** (combining): pushes existing enchantments ever higher — iterative, resource-intensive

Both are tightly interlocked: a higher tier unlock is a prerequisite for higher upgrade outputs.
The absolute endgame limit is not a number, but the available resources — primarily
**Super Liquid XP** from Create: Enchantment Industry.

---

## Tier Overview

```
TIER   MAX-LEVEL   UPGRADE-CAP   SUCCESS-CHANCE     GATE
  1        30           V        100% (guaranteed)  Apotheosis wood/stone shelves
  2        50          XI        100% (guaranteed)  Blazing/Hellish shelves + Nether
  3        75         XVI        85% → 65%          Crystalline shelves + Osmium + Certus
  4       100          XXV       70% → 35%          Enderby shelves + Refined Obsidian + End
  5     Uncapped     Uncapped    60% → 25%  (Super) Create:EI Super Liquid XP
                                 99% → 90% (Mythic) Create:EI Mythic Liquid XP
```

---

## Enchantment Upgrade Path

### The Principle

Each tier allows upgrading existing items — not just enchanting new ones.
The Apotheosis anvil system allows combining identical enchantments:
`Sharpness V + Sharpness V → Sharpness VI` (with matching tier shelves).

The PneumaticCraft Pressure Chamber takes over as the upgrade machine from T3:
input: enchanted book (low level) + pressure + materials → output: higher level.

Create: Enchantment Industry provides infinite Super Liquid XP from T5 as the only constraint.

### Upgrade Caps and Success Probabilities

| Tier | From → To | Success | On Failure | Method |
|------|-----------|--------|----------------|---------|
| T1 | I → V | 100% | — | Apotheosis Table |
| T2 | V → XI | 100% | — | Apotheosis anvil combine |
| T3 | XI → XVI | 85%→65% | All inputs lost | PNC 3.5 bar |
| T4 | XVI → XXV | 70%→35% | All inputs lost | PNC 5.5 bar |
| T5 (Super) | XXV → ∞ | 60%→25% | All inputs lost | Create:EI Super XP |
| T5 (Mythic) | XXV → ∞ | 99%→90% | All inputs lost | Create:EI Mythic XP |

**Failure rule (from T3):** on every failed attempt the book, materials and XP are fully
consumed. The enchantment level stays unchanged. No partial refund.

**Success rule:** always exactly +1 level. Never more.

> The caps apply to **all** enchantments: Protection, Efficiency, Fortune etc.

### Probability Curve in Detail

**T3 (PNC 3.5 bar)** — entry into risk:
| Upgrade | Success |
|---------|--------|
| XI → XII | 85% |
| XII → XIII | 80% |
| XIII → XIV | 75% |
| XIV → XV | 70% |
| XV → XVI | 65% |

**T4 (PNC 5.5 bar)** — real risk:
| Upgrade | Success |
|---------|--------|
| XVI → XVII | 70% |
| XVII → XIX | 65% |
| XIX → XXI | 55% |
| XXI → XXIII | 45% |
| XXIII → XXV | 35% |

**T5 Super Liquid XP** — high-risk, resource gate:
| Level range | Success |
|---------------|--------|
| XXV – XXX | 60% |
| XXX – L | 50% |
| L – C | 40% |
| C – CC | 30% |
| CC+ | 25% (floor) |

**T5 Mythic Liquid XP** — nearly guaranteed, extreme cost:
| Level range | Success |
|---------------|--------|
| XXV – L | 99% |
| L – C | 97% |
| C – CC | 95% |
| CC – D | 92% |
| D+ | 90% (floor) |

### T1→T2 Upgrade: Apotheosis Anvil Combine

Apotheosis removes the "Too Expensive" restriction. This makes arbitrary combining possible:
```
Sharpness V (book) + Sharpness V (book) + Blazing shelf setup → Sharpness VI
Sharpness IX + Sharpness IX → Sharpness X (with T2 shelves)
Max at T2: XI
```
Costs XP (increases linearly with the level). Automatable with Create:EI Liquid XP.

### T2→T3 Upgrade: First Pressure Chamber Use (risk begins)

From T3 the Pressure Chamber can upgrade books directly — **for the first time with loss risk**:
```
Input:   Sharpness XI book + 2x Osmium Ingot + 1x Certus Crystal + 3.5 bar
Success: Sharpness XII book  (85%)
Failure: everything lost, Sharpness stays at XI  (15%)
```
Several runs up to XVI. Each step lowers the success chance by ~5%.
PNC supports native probability outputs — no KubeJS workaround needed.

### T3→T4 Upgrade: Pressure Chamber 5.5 bar (risk rises)

```
Input:   Sharpness XVI book + 1x Refined Obsidian + 1x Fluix Crystal + 5.5 bar
Success: Sharpness XVII book  (70%)
Failure: everything lost, Sharpness stays at XVI  (30%)
```
From XVI to XXV it takes on average ~8-10 attempts at a falling success rate.
Refined Obsidian and Fluix Crystal are the main bottlenecks — both expensive enough that
every failed attempt noticeably hurts.

### T4→T5: Create:EI Liquid XP — Three Stages, One Decision

Create: Enchantment Industry introduces three XP types:

```
Liquid XP       — 1:1 from XP orbs/mob farm (normal Liquid XP)
Super Liquid XP — 10,000 mB Liquid XP → 1,000 mB Super XP (compressor)
Mythic Liquid XP — 1,000,000 mB Liquid XP (≙ 1,000 mB Super XP) → 1 mB Mythic XP
```

#### Super Liquid XP — high-risk, medium cost

```
Input:   enchanted book (level N) + X mB Super Liquid XP
Success: book with level N+1  (60% at level XXV, falling to 25% floor)
Failure: everything lost — no level change  (remaining %)
```

Cost scaling (Super XP per attempt):
| Level | Super XP / attempt | Avg. attempts to success | Avg. Super XP per +1 level |
|-------|--------------------|-----------------------|-------------------------|
| XXV → XXVI | 500 mB | ~1.7 | ~850 mB |
| L → LI | 2,000 mB | ~2.5 | ~5,000 mB |
| C → CI | 10,000 mB | ~4.0 | ~40,000 mB |
| CC → CCI | 50,000 mB | ~4.0 | ~200,000 mB |

#### Mythic Liquid XP — nearly guaranteed, extreme cost

```
Input:   enchanted book (level N) + Y mB Mythic Liquid XP
Success: book with level N+1  (99% at level XXV, min. 90% floor)
Failure: everything lost  (1-10%)
```

Mythic XP is 1000× more concentrated than Super XP — a top-tier Create compressor chain
(high RPM, several stages) needs hours for a few mB of Mythic XP.
In return, failures are extremely rare. For players who want to bring a specific item to
level CC without risking 200 failed attempts.

**Production of Mythic XP:**
```
[Mob Farm] → Liquid XP → [Super Compressor Stage 1] → Super Liquid XP
Super Liquid XP → [Super Compressor Stage 2, max RPM] → Mythic Liquid XP
```
~1 mB Mythic XP per ~30 minutes of an optimized setup (guideline, calibrate after testing).

**KubeJS Implementation (T5 chance mechanic):**
```javascript
// kubejs/server_scripts/enchanting_infusion.js
// Since Create:EI has no native chance system, a probability check is
// built in via a KubeJS event
ItemEvents.rightClicked('apex:enchanting_infusion_altar', event => {
    const level = getEnchantLevel(event.item)
    const successChance = getSuperXPChance(level)  // 0.60 to 0.25
    if (Math.random() < successChance) {
        upgradeEnchant(event.item)  // +1 level
    }
    consumeInputs(event)  // always: consume inputs
})
```
> Verify the exact API after testing — possibly via a custom block + KubeJS block events.

---

## Tier 1 — Vanilla+ (immediately, hours 0-5)

**Enchanting table maximum**: Level 30 | **Upgrade cap**: Sharpness V

**Available mechanics:**
- Standard Apotheosis Enchanting Table
- Apotheosis wood and stone shelves (better enchanting power than vanilla)
- First Apotheosis unique enchants: Scavenger, Lifemend
- Common & Uncommon gems from cave chests
- Apotheosis anvil: "Too Expensive" removed

**Shelves (15 for the T1 maximum):**
- Apotheosis Typeset Bookshelves (books + ink)

**Quest:** "Your First Improved Enchanting Table" → reward: Apotheosis Typeset Book x5, Common Gem x2

---

## Tier 2 — Nether-Infused (hours 5-15)

**Enchanting table maximum**: Level 50 | **Upgrade cap**: Sharpness XI

**Gate:** Nether access + Create T2 (Blaze Burner for blaze-rod automation)

**New mechanics:**
- Apotheosis Blazing shelves (Blaze Rods + Netherrack) — **new enchanting power source**
- Apotheosis Hellish shelves (Nether Bricks + Soul Sand + Gold)
- Anvil combine up to Sharpness XI possible (requires active T2 shelves)
- Apotheosis Smithing Templates in Nether structures (improved armor upgrades)
- Uncommon & Rare gems in Nether fortresses and YUNG's dungeons

**Shelves for T2 (8 Blazing + 4 Hellish):**
- Blazing Bookshelf: Blaze Rod + Nether Brick + Apotheosis Typeset Book
- Hellish Bookshelf: Nether Brick Block + Gold Block + Soul Sand

**Balancing:** the Create Blaze Burner drives blaze-rod production — without Create, T2 is very expensive.
That is intentional: Create adoption is encouraged through the enchanting incentive.

**Quest:** "Nether Magic: Tame the Embers" → reward: Blazing Bookshelf x4, Rare Gem x1

---

## Tier 3 — Crystalline (hours 15-30)

**Enchanting table maximum**: Level 75 | **Upgrade cap**: Sharpness XVI

**Gate:** Mekanism T1 (Osmium) + AE2 entry (Certus Quartz) + PNC entry (3.5 bar)

**New mechanics:**
- Apotheosis Crystalline shelves (Osmium + Certus) — highest enchanting power in normal play
- **Gem socketing unlocked** (Common & Uncommon gems in gear)
- **PNC Pressure Chamber enchanting**: upgrade input book up to XVI
- Apotheosis gem fusion: 3x identical gems → 1x next rarity

**Shelves for T3 (8 Crystalline):**
- Crystalline Bookshelf: Mekanism Osmium Ingot + AE2 Certus Crystal + Apotheosis Typeset Book

**PNC Pressure Chamber recipe (KubeJS):**
```javascript
// kubejs/server_scripts/pneumaticraft_enchanting.js
PneumaticCraftEvents.pressureChamber(event => {
    // Sharpness XI → XIII (3.5 bar)
    event.addRecipe({
        id: 'apex:pc_enchant_upgrade_t3',
        inputs: [
            '1x apotheosis:enchanted_book{Enchantments:[{id:"minecraft:sharpness",lvl:11}]}',
            '2x mekanism:ingot_osmium',
            '1x ae2:certus_quartz_crystal'
        ],
        outputs: ['1x apotheosis:enchanted_book{Enchantments:[{id:"minecraft:sharpness",lvl:13}]}'],
        pressure: 3.5
    })
})
```
> Verify the exact PNC KubeJS API after testing.

**Quest:** "Crystallized Magic" → reward: Crystalline Bookshelf x4, Rare Gem x3, PNC Pressure Tube Kit

---

## Tier 4 — Enderby Elite (hours 30-50)

**Enchanting table maximum**: Level 100 | **Upgrade cap**: Sharpness XXV

**Gate:** End access + Mekanism Refined Obsidian + PNC 5.5 bar

**New mechanics:**
- Apotheosis Enderby shelves (Refined Obsidian + End Stone + Ender Pearl)
- **Gem socketing: Rare & Epic gems** unlocked
- PNC 5.5 bar upgrade: level XVI → XXV in several runs
- Create:EI Liquid XP: first XP automation possible (normal Liquid XP)

**Shelves for T4 (8 Enderby):**
- Enderby Bookshelf: Mekanism Refined Obsidian Ingot + End Stone Bricks + Ender Pearl + Apotheosis Typeset Book

**PNC 5.5 bar upgrade:**
```
Input:  Sharpness XVI book + Refined Obsidian + Fluix Crystal + 5.5 bar
Output: Sharpness XIX book
(3 runs to XXV)
```

**Quest:** "Beyond the Stars" → reward: Enderby Bookshelf x4, Epic Gem x2, End Portal Compass

---

## Tier 5 — Legendary / Uncapped (hours 50+)

**Enchanting table maximum**: Uncapped | **Upgrade cap**: resources only

**Gate:** Cataclysm bosses defeated + Create:EI Super Liquid XP production set up

**New mechanics:**
- **Mythic gem socketing** (strongest passive bonuses in the game)
- **Super Liquid XP**: every level jump costs exponentially more — with 25%-60% success
- **Mythic Liquid XP**: 1000× more concentrated, 90-99% success rate — extreme production cost
- Apotheosis unique enchants (only from boss loot, not craftable)
- Create:EI Enchanting Infusion Altar: main mechanic for unlimited upgrading

**The decision from T5:**
```
Many cheap Super-XP attempts    ──→  25-60% success, frequent losses
Few expensive Mythic-XP attempts ──→  90-99% success, extreme production time
```
Both paths reach the goal. Super XP is faster per attempt, Mythic XP safer per
level jump. Whoever has an efficient mob farm prefers Super XP. Whoever wants to bring a single
prestige item to level CCC saves up Mythic XP.

**XP pipeline:**
```
Mob Farm → XP Drain → Liquid XP → Super Compressor 1 → Super Liquid XP
                                   Super Compressor 2 → Mythic Liquid XP
                                   (max RPM, Create Tier 3+ required)
```

**Quest:** "The Endless Ascent" (after all 4 Cataclysm bosses) → Mythic gem socketing workbench unlocked + Enchanting Infusion Altar schematic

---

## Gem System — Complete Overview

| Rarity | Source | Socketing from | Bonus example |
|------------|--------|-------------|----------------|
| Common | All cave chests | T3 | +5% Damage |
| Uncommon | YUNG's dungeons | T3 | +10% Defense |
| Rare | When Dungeons Arise | T3-T4 | +15% Speed |
| Epic | Apotheosis bosses, Cataclysm entry | T4 | +25% Crit Chance |
| Mythic | Cataclysm final bosses, PNC 7.5 bar | T5 | +40% Damage + special effect |

**Gem location config (Apotheosis + loot tables):**
- Common/Uncommon: vanilla dungeons + YUNG's → untouched
- Rare: **only** When Dungeons Arise + YUNG's Better Strongholds
- Epic: **only** Apotheosis boss loot + Cataclysm entry dungeons
- Mythic: **exclusively** Cataclysm final bosses + PNC Pressure Chamber 7.5 bar

---

## Apotheosis Config Plan

```toml
# config/apotheosis/enchanting.toml (generated after first start, then adjust)

[general]
    removeEnchantingCap = true      # remove level cap for T4/T5
    maxEnchantingPower = 200        # increased for Crystalline/Enderby shelves

[gems]
    epicGemsInBasicLoot = false     # Epic gems boss drops only
    mythicGemsInBasicLoot = false   # Mythic gems Cataclysm only
```

---

## Create:EI Integration — Liquid XP Pipeline

```
[Mob Farm]           → XP orbs on the ground
[Deployer]           → pick up
[XP Drain (EI)]      → Liquid XP (mB)
[Fluid Pipe]         → tank
[XP Compressor (EI)] → 10x Liquid XP → 1x Super Liquid XP
[Super XP Tank]      → Enchanting Infusion Altar (T5)
```

Calibrate the XP Drain and compressor quantity ratios after testing.
Goal: Sharpness 50 should cost ~10-15h of active mob-farm runtime.

---

## Summary — Power Curve & Risk

```
Tier   Level cap   Success   Resource loss possible?
  1         V      100%      No
  2        XI      100%      No
  3       XVI      65-85%    Yes — Osmium + Certus
  4       XXV      35-70%    Yes — Refined Obsidian + Fluix Crystal
  5 (S)    ∞       25-60%    Yes — Super Liquid XP (a lot)
  5 (M)    ∞       90-99%    Yes — Mythic Liquid XP (little, but extremely expensive)
```

**The central design idea:** T1 and T2 are frustration-free. Only from T3 does
enchanting become a system with real decisions: when is the risk worth it?
Do I prefer many cheap attempts with Super XP, or do I save up for Mythic XP?

There is no hard cap. A player with maximum automation can reach Sharpness 100+
— but every level above 50 is a deliberate investment, not a free ride.
This feels earned, not grinded.
