# Server Deployment — Gaia Awakening

> Concrete setup for the multiplayer server. Extends `server-setup.md` with
> the world-specific values and the pre-gen workflow.

---

## World Seed (FIXED)

```
1458109957658339347
```

Set in `server.properties`:
```properties
level-seed=1458109957658339347
level-name=GaiaAwakening
level-type=minecraft\:normal
```

**Important:** the seed alone only reproduces the world if all world-gen mods
have exactly the same version + config as the client that created the world.
Tectonic, Terralith, Lithostitched, YUNG's, When Dungeons Arise, Mekanism ore gen
must be identical.

> World generated with this seed on 2026-05-15 in profile `gaia-awakening-0.1.30-alpha`
> ("New World (1)"). Confirmed breathtaking terrain quality with the current Tectonic config.

---

## Tectonic Config (Tall World)

The real config is `config/tectonic.json` (NOT `tectonic-common.toml`).
During server setup, be sure to use the `tectonic.json` from this repo.

Active: **Tall World Mode** (finalized with seed 1458109957658339347)
- `global_terrain.max_y = 512`
- `global_terrain.min_y = -128`
- `global_terrain.vertical_scale = 1.8`
- `global_terrain.elevation_boost = 1.0`
- `general.snow_start_offset = 512`
- `islands.enabled = true`
- `continents.flat_terrain_skew = -0.15`
- `continents.erosion_scale = 0.32`
- `continents.ridge_scale = 0.35`

---

## Carry Over Pre-Gen Chunks From Singleplayer

The current singleplayer world already has a large part of the spawn area pre-generated.
Instead of regenerating on the server, we carry over the region files directly.

### Step 1: World Backup (local)
Backup path: `~/minecraft-backups/gaia-awakening-<timestamp>/New_World_1/`

Source path (local, on the world-creating client machine):
`<ModrinthApp profiles>/gaia-awakening-0.1.30-alpha/saves/New World (1)/`

### Step 2: Copy to the Server
On the server host:
```bash
# Server world directory (does not exist yet):
SERVER_DIR=/opt/gaia-awakening-server
mkdir -p "$SERVER_DIR/world"

# Copy the important world data:
rsync -av --exclude='session.lock' \
    /path/to/backup/New_World_2/ \
    "$SERVER_DIR/world/"
```

What to transfer:
- `region/` — all pre-generated chunks (Overworld)
- `DIM-1/region/` — Nether
- `DIM1/region/` — End
- `level.dat` — world metadata incl. seed
- `data/` — world data (raids, random_sequences)
- `poi/` — points of interest (villager workstations etc.)
- `entities/` — entity data

**Do NOT transfer:**
- `session.lock` — recreated by the server
- `playerdata/` — if present, better start fresh (clean player starts)
- `ftbteams/`, `ftbchunks/`, `ftbquests/` — teams/claims should start clean
- `advancements/`, `stats/` — clean statistics

### Step 3: Verify
After server start, check:
```
/seed   → must return 1458109957658339347
```

If the seed matches but chunks regenerate instead of loading,
a mod config has probably changed (Tectonic, Terralith, etc.) —
in that case just don't leave the pre-generated area while playing.

---

## Server Performance Configuration

### ServerCore (`config/servercore.json5`)
Exists after the first start. Important settings:
- Async chunk loading: keep enabled
- Async entity tracker: keep enabled

### Mekanism
- Radiation: optionally disable if a player warns about uranium mining
- Generators: check the Fusion Reactor min temp (config/mekanism-server.toml)

### Create
- Increase the contraption limit if Aeronautics lag threatens
- `config/create-server.toml` → `kineticStats.maxContraptionEntities`

### Distant Horizons (LOD server mode)
DH stays **active** on the server — DH 2.x can generate LODs centrally and stream
them to clients. This saves every player the local LOD generation and delivers
identical view distance for everyone. Important server configuration:

**`config/distanthorizons.toml`** (after the first start):
- `multiplayer.serverNetworking = true` (or a similar field, check the exact name
  in the generated config after the first boot)
- LOD render distance: set high (e.g. 256 chunks) — the server computes
  once, all clients benefit
- `worldGenerator.enableDistantGeneration = true` so the server proactively
  creates LODs during the pre-gen

**Pre-gen strategy for LODs:**
1. Chunky pre-gen runs → creates vanilla chunks
2. DH runs in parallel/afterward, generating LODs for all Chunky chunks
3. Players receive the LODs from the server on login (no own compute needed)

**Trade-off:** save times get longer (LOD blobs are large), and disk space
increases significantly (~2-3× vanilla world size). On a server with an SSD and enough
storage this is the right trade-off for multiplayer comfort.

**Singleplayer workflow for the maintainer:** on a long "Saving World" screen,
wait — DH is writing LOD blobs. If necessary force-quit (region/ is already written).

---

## Before the Server Launch — Checklist

- [ ] Pack version finalized (currently: 0.1.21-alpha)
- [ ] All KubeJS scripts without errors (check `logs/kubejs/server.log`)
- [ ] Quests functional (SNBT format!)
- [ ] World backup created and verified
- [ ] `server.properties` seed set
- [ ] Pre-gen chunks rsync'd
- [ ] Firewall: port 25565 (or the chosen port) open
- [ ] Whitelist configured (`whitelist.json`)
- [ ] Op list configured (`ops.json`)
- [ ] Test login with a standard user before release
