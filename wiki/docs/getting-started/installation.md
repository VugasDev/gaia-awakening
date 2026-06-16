# Installation

## Client Installation (Modrinth App)

The easiest way to install Gaia Awakening is through the **Modrinth App**:

1. Download the latest `.mrpack` file from the [Releases](https://github.com/VugasDev/gaia-awakening/releases) page.
2. Open the Modrinth App, go to **Library**, and click **Import**.
3. Select the `.mrpack` file. The app will download all mods and configure the correct NeoForge version automatically.
4. Launch the newly created instance.

The `.mrpack` format is also supported by **ATLauncher** and **Prism Launcher** — use their respective Import functions with the same file.

### Recommended Specs

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM (client) | 8 GB allocated | 12 GB allocated |
| GPU | GTX 1060 / RX 580 | RTX 2060 / RX 6700 XT or better |
| Java | 21+ | Java 21 (Eclipse Temurin 21) |

## Dedicated Server Setup

The following is a summary of the full setup documented in `docs/server-setup.md` in the repository.

### Prerequisites

- **Java 21** — [Eclipse Temurin 21](https://adoptium.net) recommended. Verify with `java -version`.
- **8 GB RAM minimum** for the server process.
- Linux (Ubuntu 22.04+) or Windows Server 2019+.
- Port **25565 TCP/UDP** open in your router.

### 1. Install NeoForge Server

Download the NeoForge 1.21.1 installer from [projects.neoforged.net](https://projects.neoforged.net/neoforged/neoforge).

```bash
mkdir gaia-server && cd gaia-server
java -jar neoforge-21.1.x-installer.jar --install-server .
echo "eula=true" > eula.txt
```

### 2. Configure JVM Flags

NeoForge generates `user_jvm_args.txt` after installation. Set it to:

```
-Xmx8G
-Xms4G
-XX:+UseG1GC
-XX:+ParallelRefProcEnabled
-XX:MaxGCPauseMillis=200
-XX:+DisableExplicitGC
```

### 3. Deploy Modpack Files

Copy mods, config and KubeJS from the repository into the server directory:

```bash
cp -r config/  gaia-server/config/
cp -r kubejs/  gaia-server/kubejs/
```

Place all mod JARs from the `.mrpack` into `gaia-server/mods/`.
Alternatively, run `packwiz server install` inside the server directory.

### 4. Start the Server

```bash
chmod +x run.sh
./run.sh nogui
```

Wait for:
```
[Server thread/INFO]: Done (Xs)! For help, type "help"
```

### 5. Pre-generate Chunks (Recommended)

Run Chunky in the server console before players join to prevent world-generation lag:

```
chunky world minecraft:overworld
chunky center 0 0
chunky radius 3000
chunky shape square
chunky start
```

Pre-generation takes 30–90 minutes depending on hardware. The server remains joinable during the process.

### Recommended server.properties Settings

```properties
view-distance=10
simulation-distance=8
difficulty=normal
spawn-protection=0
```

!!! tip
    For modded servers running Terralith, `view-distance` of 8–10 is recommended.
    Values above 12 can cause TPS issues on servers with limited RAM.
