# XP Economy

Gaia Awakening uses a layered XP fluid system built on **Create: Enchantment Industry**. XP is a core resource: it powers the Catalyst Altar, fuels the Enchantment System's higher tiers, and gates the Mythic Catalyst.

---

## The Three XP Fluids

### Hyper Experience (`create_enchantment_industry:hyper_experience`)

Hyper Experience is the base XP fluid provided by Create: Enchantment Industry. It is produced by draining XP orbs from players or mobs using the XP Drain block. It is the starting currency of the XP economy.

**Primary uses:**

- **Catalyst Altar** — 1000 mB Hyper Experience produces 1× `gaia:resource_catalyst` (via Create Spout).
- Input material for crafting Mythic Liquid XP.
- Standard Create:EI enchanting operations.

### Mythic Liquid XP (`gaia:mythic_liquid_xp`)

Mythic Liquid XP is a custom fluid defined in this modpack. It is produced by mixing Hyper Experience with a Singularity Shard in a heated Create Mixer.

**Recipe:**

```
2000 mB create_enchantment_industry:hyper_experience
+  1x gaia:singularity_shard
──────────────────────────────────────────────────
→ 1000 mB gaia:mythic_liquid_xp   (requires heated Mixer)
```

**Primary uses:**

- **Catalyst Altar** — 500 mB Mythic Liquid XP produces 1× `gaia:mythic_catalyst` (via Create Spout).
- T5 Enchantment System — see [Enchantment System](enchantments.md).

### Super Liquid XP and Concentrated Mythic XP (Create:EI compression tiers)

Create: Enchantment Industry compresses `create_enchantment_industry:hyper_experience` into higher-concentration forms used by the Enchantment System. There is no separate "standard Liquid XP" fluid — the base fluid is always `create_enchantment_industry:hyper_experience`.

| Fluid | Conversion | Use |
|-------|-----------|-----|
| `create_enchantment_industry:hyper_experience` | 1:1 from XP orbs (XP Drain) | Base input; also powers Catalyst Altar |
| Super Liquid XP | 10,000 mB Hyper Experience → 1,000 mB Super XP | T5 enchanting (high-risk path) |
| Mythic Liquid XP (Create:EI) | 1,000,000 mB Hyper Experience → 1 mB | T5 enchanting (low-risk, extreme cost) |

Note: The pack's `gaia:mythic_liquid_xp` is a separate custom fluid from Create:EI's concentrated Mythic XP tier. The custom fluid is for Catalyst production; the Create:EI compression tiers are for enchanting.

---

## The Catalyst Altar

The **Catalyst Altar** (`gaia:catalyst_altar`) is the central conversion block for the XP-to-Catalyst pipeline. It is filled by a Create Enchantment Industry Spout directed at the altar block.

| Input | Output |
|-------|--------|
| `gaia:catalyst_altar` + 1000 mB `create_enchantment_industry:hyper_experience` | `gaia:resource_catalyst` |
| `gaia:catalyst_altar` + 500 mB `gaia:mythic_liquid_xp` | `gaia:mythic_catalyst` |

---

## XP Pipeline Overview

```
Mob Farm
  → XP orbs on floor
  → XP Drain (Create:EI)
  → Hyper Experience (fluid)
  → Tank

From tank, two branches:

Branch A — Catalyst Altar
  Hyper Experience → Spout → Catalyst Altar → gaia:resource_catalyst (1000 mB each)

Branch B — Mythic Liquid XP
  Hyper Experience (2000 mB) + gaia:singularity_shard → heated Mixer → gaia:mythic_liquid_xp (1000 mB)
  gaia:mythic_liquid_xp → Spout → Catalyst Altar → gaia:mythic_catalyst (500 mB each)

Branch C — Enchanting (see Enchantment System page)
  Hyper Experience → XP Compressor → Super Liquid XP → Enchanting Infusion Altar
  Super Liquid XP → Super Compressor (max RPM) → Create:EI Mythic Liquid XP
```

---

## Where XP Comes From

The primary XP source is a mob farm feeding an XP Drain. The XP Drain converts orbs on the floor into `create_enchantment_industry:hyper_experience` fluid. A Create-powered mob farm with a Deployer to kill mobs is the standard setup from T3 onward.

Hyper Experience accumulates as long as the mob farm runs — it does not deplete unless actively consumed. Building enough storage for your XP tank before scaling up catalyst production is recommended.

---

## Progression Role

| Tier | XP role |
|------|---------|
| T3 | Catalyst Altar unlocked — Hyper XP can produce Resource Catalysts at scale |
| T4 | Mythic Liquid XP unlocked — enables Mythic Catalyst crafting without boss kills |
| T5 | Super Liquid XP and Create:EI Mythic Liquid XP power the Enchantment System's uncapped tiers |
