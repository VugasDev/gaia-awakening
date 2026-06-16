# World Generation Design — "Apex-Height" & "Shattered Lands"

> **Status**: Concept — 2026-04-29
> Goal: A vertically (896 blocks) and horizontally (32,000+ blocks) massively extended world.

---

## Technical Parameters (Overworld)

| Parameter | Value | Reason |
|-----------|------|-------|
| **Minimum Y** | -128 | Deeper underground for dungeons & Mekanism |
| **Total Height** | 896 | Massive headroom for aeronautics |
| **Terrain Max Y** | ~512 | Massive mountain ranges via Tectonic |
| **Build Limit** | 768 | Plenty of airspace above the peaks |
| **Sea Level** | 64 | Standard height |

---

## Zone Layout & Geological Core Vision

### Geological Core Vision: "Mantle Descent" & Void Buffer

The world starts in the Apex Mainland as a seemingly normal overworld. Above the deep layers the terrain stays classic and contiguous, with a regular landmass feel for early base building, exploration and infrastructure.

It offers ordinary terrain down to the deep layers; below Y=-64 to about Y=-96 the transition into the Mantle zone begins. This additional Mantle zone is a blackstone- and magma-dominated layer that geologically acts like an antechamber to the Nether. This layer serves as a visual and gameplay hint at a hot world core, suggesting a mantle-like, Nether-adjacent deep biome, and is the preferred area for rare heat-related resources like Ancient Debris.

As distance from spawn grows, not only the surface changes, but also the stability of the underground. In the transition zone the terrain becomes increasingly flat, while landmasses visually rise more strongly and the bottom of the world begins to break apart: the bedrock is progressively carved away toward the outside, so that ever larger vertical openings and drop edges form.

Shortly before the actual Outer Rim, the world reaches a buffer zone. This edge zone is not a full island realm, but an unstable foreland with heavily thinned-out ground, fragment remains and a clearly noticeable void layer as a separating barrier. Only beyond this buffer zone does the Shattered Outer Rim begin with its fully decoupled, floating archipelagos at several altitudes.

This staggering is strong in gameplay terms because it conveys progression not only through loot, but through world logic: the further out you go, the less "safe" the world behaves as a classic Minecraft overworld.

### Zoning in Detail

| Zone | Distance (approx.) | Character | Underground | Function |
|------|---------------|-----------|------------|----------|
| **1. Apex Mainland** | 0 - 10,000 | Normal, massive overworld with high mountains (Tectonic) up to Y=512 | Deepslate transitions into blackstone/magma mantle (-64 to -96) | Safe start, tech build-up, early exploration |
| **2. Transition** | 10,000 - 28,000 | Flatter, unstable, more rugged | Bedrock removed in sections, large depth rifts | Sense of geological collapse |
| **3. Buffer Zone** | 28,000 - 32,000 | Fragmented edge area before the drop | Partial void, residual ground, hard fracture edges | Dramatic preparation for the Outer Rim |
| **4. Shattered Outer Rim** | > 32,000 | No continuous ground anymore. Floating islands in 3 layers (Low-Orbit, Cloud-Layer, High-Apex) | Pure island/void space | Aeronautics, endgame, bosses, OP loot |

---

## Performance & Pre-Generation Strategy

To avoid lag when flying fast (Aeronautics):

### Pre-Generation (Chunky)
1.  **Core PreGen**: fully generate a 10,000-block radius around spawn.
2.  **Expedition Corridors**: 32-chunk-wide pre-generated paths to distant targets (32km+).
3.  **Target Gen**: pre-generate target archipelagos within a 2km radius.

### Engine Optimization (NeoForge 1.21.1)
1.  **C2ME**: multi-core chunk management for the complex density functions.
2.  **Noisium**: optimized noise calculations for on-the-fly generation.
3.  **Krypton Reno**: network stack optimization against rubberbanding.
4.  **Radium Reforged**: logic optimization (physics/AI).
5.  **Distant Horizons**: LOD rendering for the 32km view distance.

---

## World Presets (Selectable in the Menu)

To offer maximum flexibility, we define four world presets in `data/apex/worldgen/world_preset/`:

### 1. Preset: "Apex: Standard Modded"
*   **Description**: the classic experience with Terralith & Tectonic.
*   **Height**: standard (-64 to 320).
*   **Feature**: no Shattered Lands.
*   **Target audience**: players who want a "normal" modded world.

### 2. Preset: "Apex: The Grand Journey" (Your Vision)
*   **Description**: the full package. Massive mountains and far-away islands.
*   **Height**: **896 blocks** (-128 to 768).
*   **Feature**: **Shattered Lands from 32,000 blocks**.
*   **Target audience**: the intended modpack experience.

### 3. Preset: "Apex: Skybound Only"
*   **Description**: a world that consists only of floating islands.
*   **Height**: **896 blocks**.
*   **Feature**: only floating island layers from 0 to 32,000+ km. No continuous ground ("void" below).
*   **Target audience**: hardcore aeronauts.

### 4. Preset: "Apex: Eternal Mainland"
*   **Description**: vertical extremes without island structures.
*   **Height**: **896 blocks**.
*   **Feature**: massive Tectonic mountains for all eternity. No Shattered Lands.
*   **Target audience**: builders who prefer a massive underground.

---

## Implementation Details (KubeJS / Datapack)

### Technical Classification
For the vertical basis of this vision, it is crucial that custom dimensions allow `min_y` and `height` in steps of 16 and that the total height can be defined far beyond vanilla.

The actual "outward-decaying" world shape is not solved through `dimension_type` alone, but through worldgen logic, e.g. via datapack/KubeJS plus carver/biome/noise control; NeoForge supports data-driven interventions such as adding or removing carvers via Biome Modifier.

...

*   **Data volume**: a 32km world is huge.
    *   *Solution*: only pre-generate corridors and important areas, not the entire surface.
*   **Performance**: 896 blocks of height stress the CPU.
    *   *Solution*: **C2ME** and **Noisium** are mandatory.
*   **Darkness**: Y=-128 is deep and dark.
    *   *Solution*: Apotheosis night-vision items as quest rewards.
