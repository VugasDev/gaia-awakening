# Server Setup — APEX Modpack

> Last updated: 2026-04-30 | Version: 0.1.x

## Prerequisites

- Java 21 (recommended: Eclipse Temurin 21 — https://adoptium.net)
  - Check the Java version: `java -version` — must show `21.x.x`
  - If multiple Java versions are installed: `sudo update-alternatives --config java` (Ubuntu)
- At least 8 GB RAM for the server process
- Linux (Ubuntu 22.04+) or Windows Server 2019+
- Port 25565 TCP/UDP forwarded in the router

## 1. Install the NeoForge Server

Download the NeoForge 1.21.1 installer from:
https://projects.neoforged.net/neoforged/neoforge → latest stable version for 1.21.1

```bash
# Create the server directory
mkdir apex-server && cd apex-server

# Install the NeoForge server
java -jar neoforge-21.1.x-installer.jar --install-server .

# Accept the EULA (mandatory)
echo "eula=true" > eula.txt
```

## 2. Set Up the Start Script

After installation, NeoForge automatically generates a `run.sh` (Linux) or `run.bat` (Windows). JVM flags are set in `user_jvm_args.txt`, not directly in the start script.

Adjust the `user_jvm_args.txt` file:

```
-Xmx8G
-Xms4G
-XX:+UseG1GC
-XX:+ParallelRefProcEnabled
-XX:MaxGCPauseMillis=200
-XX:+DisableExplicitGC
```

Start the server:

```bash
chmod +x run.sh
./run.sh nogui
```

## 3. Deploy the Modpack

Copy mods, config and KubeJS from the repository into the server folder:

```bash
# Run from the repo root
cp -r config/   apex-server/config/
cp -r kubejs/   apex-server/kubejs/
```

Place all mod JARs from the Modrinth mrpack into `apex-server/mods/`.

> Alternatively: import the mrpack directly with the NeoForge installer (if supported)
> or Packwiz: run `packwiz server install` in the server directory.

## 4. Configure server.properties

```properties
max-players=10
view-distance=10
simulation-distance=8
online-mode=true
difficulty=normal
spawn-protection=0
level-seed=
```

> Recommended for a modded server with Terralith: 8–10. Values above 12 can cause TPS problems with limited RAM.

> Leave `level-seed` empty for a random seed, or enter a fixed seed.
> **Important:** document the seed after world creation — it can no longer be changed.

## 5. First Start

```bash
./start.sh
```

Wait until the console shows:
```
[Server thread/INFO]: Done (Xs)! For help, type "help"
```

Check the log for errors:
```bash
grep -i "error\|exception\|crash" logs/latest.log
```

Check KubeJS errors separately:
```bash
grep -i "error" logs/kubejs/server.log
```

## 6. Run the Chunky Pre-Gen

**Run before the first player joins!** (prevents lag while exploring)

Enter in the server console:

```
chunky world minecraft:overworld
chunky center 0 0
chunky radius 3000
chunky shape square
chunky start
```

Monitor the status:
```
chunky progress
```

> Pre-gen takes 30–90 minutes depending on hardware.
> The server stays playable, but chunk-generation lag is possible.
> Recommendation: finish the pre-gen before the group launch.

Nether after the Overworld:
```
chunky world minecraft:the_nether
chunky center 0 0
chunky radius 1500
chunky shape square
chunky start
```

## 7. Connection Test

All 5 players connect at the same time and run the following checks:

- [ ] Connection works (no timeout)
- [ ] TPS ≥ 18 (`/tps` in the console — a value below 18 = performance problem)
- [ ] World gen visible: Terralith biomes recognizable, world height > 400 blocks (`F3`)
- [ ] FTB Quests opens (`M` or the quest key)
- [ ] No red errors in `logs/latest.log`

## Known Pitfalls

| Problem | Cause | Solution |
|---------|---------|--------|
| Server won't start | Wrong Java path | Check `java -version` — must be Java 21 |
| KubeJS errors | Script error | Check `logs/kubejs/server.log`, fix syntax in `kubejs/` |
| Tectonic not applying | Config read incorrectly | In-game `F3` → check Max Y; search config keys in `logs/latest.log` |
| Chunky won't start | Mod not loaded | Type `/chunky` — `Unknown command` = mod missing |
| Low TPS | Too many entities/chunks | Reduce `simulation-distance` to 6 |
