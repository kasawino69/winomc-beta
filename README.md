# [BETA] WinoMC

WinoMC bringt einen Minecraft Bedrock Dedicated Server als Home-Assistant-Add-on auf dein Home Assistant OS.

Das Ziel ist einfach: installieren, einstellen, starten und spielen.

WinoMC nutzt eine eigene native Runtime und basiert nicht mehr auf dem itzg-Image.

---

### Was ist enthalten?

* Minecraft Bedrock Dedicated Server als Home-Assistant-Add-on
* Konfiguration direkt über die Home-Assistant-UI
* Web-Konsole direkt in Home Assistant
* Persistente Welten und Serverdaten
* Home-Assistant-Backups
* Import von Welten, Resource Packs und Behavior Packs
* IPv4 und IPv6
* Optionaler IPv6-Bind-Fix für Dual-Stack-Netzwerke
* Unterstützung für amd64
* Experimentelle Unterstützung für aarch64 / ARM64 über Box64

---

### Installation

Repository in Home Assistant hinzufügen:

[![Repository zu Home Assistant hinzufügen](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https://github.com/kasawino69/winomc-beta)

Oder manuell:

1. Home Assistant öffnen
2. Einstellungen -> Add-ons -> Add-on Store
3. Oben rechts auf die drei Punkte klicken
4. Repositorys auswählen
5. Diese URL einfügen:

```text
https://github.com/kasawino69/winomc-beta
```

Danach das Add-on installieren:

```text
[BETA] WinoMC Bedrock Server
```

---

### Schnellstart

Für einen normalen privaten Survival-Server reichen meistens diese Einstellungen:

```yaml
VERSION: LATEST
SERVER_NAME: WinoMC Server
LEVEL_NAME: world
GAMEMODE: survival
DIFFICULTY: normal
ALLOW_CHEATS: false
MAX_PLAYERS: 10
ONLINE_MODE: true
ENABLE_LAN_VISIBILITY: true
SERVER_PORT: 19132
SERVER_PORT_V6: 19133
ENABLE_WEB_CONSOLE: true
```

Beim ersten Start lädt WinoMC automatisch den offiziellen Minecraft Bedrock Dedicated Server herunter.

---

### Verbindung zum Server

Im gleichen Netzwerk kann der Server je nach Gerät automatisch als LAN-Spiel erscheinen.

Falls nicht, den Server in Minecraft manuell hinzufügen:

```text
Adresse: IP-Adresse von Home Assistant
Port: 19132
```

Beispiel:

```text
192.168.2.187
Port: 19132
```

Wichtig: Minecraft Bedrock nutzt UDP. Bei Router, Firewall oder Portfreigaben also UDP freigeben, nicht TCP.

---

### Web-Konsole

WinoMC enthält eine eigene Web-Konsole über Home Assistant.

Damit kannst du Serverausgaben sehen und Befehle senden, zum Beispiel:

```text
say Hallo zusammen
list
stop
```

---

### Speicherorte

Die wichtigsten Pfade:

```text
/config
```

Serverdaten und Konfiguration.

```text
/config/worlds
```

Minecraft-Welten.

```text
/config/resource_packs
```

Resource Packs.

```text
/config/behavior_packs
```

Behavior Packs.

```text
/share/winomc/import
```

Import-Ordner für Welten, Packs und Add-ons.

---

### Welten und Packs importieren

WinoMC kann folgende Dateien importieren:

```text
.mcworld
.mcpack
.mcaddon
.mctemplate
.zip
```

Beispiel für ein Resource Pack:

```yaml
MC_PACK: /share/winomc/import/mein-pack.mcpack
```

Beispiel für eine Welt:

```yaml
MC_PACK: /share/winomc/import/meine-welt.mcworld
```

Wenn vorhandene Packs oder Welten ersetzt werden sollen:

```yaml
FORCE_PACK_COPY: true
FORCE_WORLD_COPY: true
```

Vorsicht: `FORCE_WORLD_COPY` kann eine bestehende Welt ersetzen. Vorher immer ein Backup erstellen.

---

### Updates und Backups

Mit dieser Einstellung nutzt WinoMC die aktuelle stabile Bedrock-Server-Version:

```yaml
VERSION: LATEST
```

WinoMC kann alte Serverpakete vor Updates sichern:

```yaml
PACKAGE_BACKUP_KEEP: 2
```

Das ersetzt kein vollständiges Welt-Backup. Vor größeren Updates oder Weltimporten sollte zusätzlich ein Home-Assistant-Backup erstellt werden.

---

### IPv4 und IPv6

Standard:

```yaml
SERVER_PORT: 19132
SERVER_PORT_V6: 19133
ENABLE_BDS_V6BIND_FIX: false
```

Für Dual-Stack mit gleichem Port:

```yaml
SERVER_PORT: 19132
SERVER_PORT_V6: 19132
ENABLE_BDS_V6BIND_FIX: true
```

Der IPv6-Bind-Fix wird von WinoMC selbst aus Quellcode gebaut. Es wird dafür kein fremdes Fertig-Binary heruntergeladen.

---

### ARM64 / aarch64

ARM64 wird experimentell unterstützt.

Da der offizielle Bedrock Dedicated Server für Linux nicht nativ als ARM64-Server bereitgestellt wird, nutzt WinoMC auf ARM64 Box64.

Standard:

```yaml
USE_BOX64: true
```

Auf amd64 wird Box64 nicht verwendet.

---

### Hinweise

WinoMC ist aktuell Beta-Software.

Minecraft Bedrock, Home Assistant und verschiedene Geräte können sich unterschiedlich verhalten. Besonders Konsolen wie Nintendo Switch oder Xbox können bei LAN-Anzeige, manueller Verbindung und Netzwerkfreigaben eigene Einschränkungen haben.

Dieses Projekt ist kein offizielles Minecraft-, Mojang-, Microsoft- oder Home-Assistant-Projekt.

---

### Credits

Dieses Repository basiert ursprünglich auf der Arbeit von:

* williamcorsel/hassio-addons

Die ursprünglichen Vorlagen und Inspirationen stammen außerdem unter anderem von:

* alexbelgium/hassio-addons

WinoMC wurde danach für Minecraft Bedrock, Home Assistant und die eigene native Runtime weiter angepasst und erweitert.

Danke außerdem an:

* itzg/docker-minecraft-bedrock-server für viele gute Ideen, Verhaltensweisen und Kompatibilitätsreferenzen rund um Minecraft Bedrock Server Container
* poeggi/bds-ipv6fix für die technische Beschreibung und Idee des IPv6-Bind-Fixes
* Box64 für die Möglichkeit, den Bedrock Dedicated Server experimentell auf ARM64 auszuführen
* die Home-Assistant-Community
* die Minecraft-Community

WinoMC-spezifische Anpassungen und Weiterentwicklung werden von kasawino69 gepflegt.

---

### Lizenz

Dieses Repository steht unter der MIT-Lizenz, soweit nicht anders angegeben.

Minecraft ist Eigentum von Mojang/Microsoft. WinoMC stellt nur ein Home-Assistant-Add-on zur Ausführung des offiziellen Bedrock Dedicated Servers bereit.
