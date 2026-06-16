# Interconnectivity Addons — Analysis

> **Status**: 2026-04-29, researched for NeoForge 1.21.1 / Modrinth

---

## CRITICAL FINDING: Botania NOT available for NeoForge 1.21.1

> ⛔ Botania is currently not yet ported to NeoForge 1.21.1 (no ETA).
> Applied Botanics (AE2↔Botania bridge) therefore drops out as well.
>
> **Consequence**: drop Botania as magic path A → find a replacement (see below).

---

## CONFIRMED BRIDGE MODS (Modrinth + NeoForge 1.21.1)

### 1. Applied Mekanistics — AE2 ↔ Mekanism
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v1.6.3)
- Store and route Mekanism chemicals in the AE2 ME network
- Chemical P2P tunnel, chemical storage cells
- **Verdict**: mandatory — without it, AE2 and Mekanism are isolated islands

### 2. Ars Creo — Create ↔ Ars Nouveau
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v5.2.0)
- Starbuncle Wheel: Ars Nouveau Starbuncles generate Create rotational power (SU)
- Mount spell turrets on Create contraptions
- Source fluid usable in Create machines
- **Verdict**: mandatory — perfect synergy between the two main paths

### 3. Ars Additions — Ars Nouveau QoL
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v21.1.5)
- Additional spell glyphs and QoL improvements
- **Verdict**: recommended

---

## STORAGE PIPELINE (early-to-midgame bridge to AE2)

### 4. Functional Storage — drawer-based early-game storage
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v1.4.2)
- Compacting drawers, storage controller, wireless linking
- Fills the gap between vanilla chests and AE2
- Progression: vanilla chests → Functional Storage drawers → Sophisticated Storage → AE2
- **Verdict**: recommended — makes the storage progression smoother

### 5. Extended AE — AE2 extensions
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v2.0.1)
- Pattern encoder, item converter, additional AE2 machines
- **Verdict**: optional — good for late-game AE2 expansion

---

## ROUTING & NETWORK (cross-mod connections)

### 6. XNet — optimized cable network
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v7.0.5)
- Unified cables for items, energy, fluids, redstone, data
- **XNet Gases** (addon): NeoForge 1.21.1 ✓ — route Mekanism gases via XNet
- Especially valuable for Mekanism chemistry pipelines
- **Verdict**: recommended — reduces cable chaos in complex setups

### 7. Modular Routers — flexible item routing
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v13.2.3)
- Module-based item routing between all mod inventories
- Complements XNet for special item-routing cases
- **Verdict**: optional — useful, but XNet covers a lot

---

## AUTOMATION (gap-filler between Create and Mekanism)

### 8. Industrial Foregoing — automation bridge
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v3.6.23)
- Mob factories, planting machines, fluid siphons
- Fills automation gaps that Create and Mekanism leave
- Add-ons available: IF Souls, IF Woot Addon, More IF Addons
- **Verdict**: recommended — especially for mob farming and fluid automation

---

## BOTANIA REPLACEMENT — Options

Since Botania is not available, we need a replacement for the "nature/passive magic" path:

### Option A: Hexerei ⚠️ (check NeoForge 1.21.1)
- Witch's cauldron, herbs, potion system, nature magic
- More passive style, similar to Botania

### Option B: Occultism ⚠️ (check NeoForge 1.21.1)
- Demonology, spirit summoning, storage dimension
- Interesting: Occultism has its own storage system (dimensional storage)
- More oriented toward "dark magic"

### Option C: Malum ⚠️ (check NeoForge 1.21.1)
- Dark ritual magic, altars, passive effects
- Aesthetically very strong

### Option D: Ars Nouveau as the only magic path
- Ars Nouveau is already very extensive
- With Ars Creo (Create bridge) and Ars Additions (QoL) it is complete
- Simplest solution — less complexity for casual players

> **Recommendation**: Option D (Ars Nouveau as-is) + one of options A/B/C as a small second path.
> Occultism would be interesting because of the dimensional storage synergy with AE2.

---

## FARMER'S DELIGHT ADDONS (confirmed)

| Addon | Status | Content |
|-------|--------|--------|
| **Veggies Delight** | ✓ NeoForge 1.21.1 | More vegetables, structures |
| **More Delight** | ✓ NeoForge 1.21.1 | More meals, ingredients |
| **Chef's Delight** | ✓ NeoForge 1.21.1 | Cook/baker villager |

---

## NOT AVAILABLE (for NeoForge 1.21.1 / Modrinth)

| Mod | Problem |
|----|---------|
| **Botania** | No NeoForge 1.21.1 port (no ETA) |
| **Applied Botanics** | Depends on Botania |
| **Thermal Series** | CurseForge only, no Modrinth for 1.21.1 |
| **Compressed Creativity** | Create ↔ PneumaticCraft bridge — 1.21.1 status unclear |
| **Ars Elemental** | CurseForge-exclusive |
| **Ars Instrumentum** | CurseForge-exclusive |

---

## RECOMMENDED ADDITIONS TO THE STACK

### Mandatory additions (strong synergies)
1. **Applied Mekanistics** — AE2 ↔ Mekanism
2. **Ars Creo** — Create ↔ Ars Nouveau

### Recommended additions
3. **Functional Storage** — early-game storage progression
4. **XNet + XNet Gases** — cross-mod routing (esp. Mekanism gases)
5. **Industrial Foregoing** — automation gap-filler
6. **Ars Additions** — Ars Nouveau QoL
7. **Farmer's Delight Addons** (Veggies, More, Chef's)

### Optional additions
8. **Extended AE** — AE2 late-game extension
9. **Modular Routers** — flexible item routing
10. **Botania replacement** (Occultism / Hexerei / Malum) — check

---

## INTERCONNECTIVITY MAP (after additions)

```
[Create] ←─── Ars Creo ───→ [Ars Nouveau]
   │                              │
   │ C&A (FE)                Ars Additions
   ▼                              │
[Mekanism] ←── Appl.Mekanism ──→ [AE2]
   │                  │           │
   │ XNet Gases    Ext. AE    Applied Botanics
   │                           (if Botania arrives)
   ▼
[PneumaticCraft] ←─ Compressed Creativity ─→ [Create]
                         (⚠️ check status)

[Farming] ─── Farmer's Delight ─── Veggies/More/Chef's Delight

[Storage Pipeline]:
Chests → Functional Storage → Sophisticated Storage → AE2 ME network
                                      ↕
                              XNet / Modular Routers
```
