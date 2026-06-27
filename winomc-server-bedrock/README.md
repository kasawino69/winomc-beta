# [BETA] WinoMC

WinoMC stellt einen Minecraft Bedrock Dedicated Server als Home-Assistant-Add-on bereit.

Das Ziel ist ein einfacher Bedrock-Server für Home Assistant OS: Repository hinzufügen, Add-on installieren, Einstellungen prüfen, starten und spielen.

WinoMC nutzt eine eigene native Runtime und basiert nicht mehr auf dem itzg-Image.

---

### Inhalt

- Minecraft Bedrock Dedicated Server als Home-Assistant-Add-on
- Konfiguration über die Home-Assistant-Oberfläche
- Web-Konsole direkt in Home Assistant
- Speicherung von Welten und Serverdaten im Add-on
- Unterstützung für Home-Assistant-Backups
- Import von Welten, Resource Packs und Behavior Packs
- IPv4 und IPv6
- Optionaler IPv6-Bind-Fix
- Unterstützung für amd64
- Experimentelle Unterstützung für aarch64 / ARM64 über Box64

---

### Installation

Repository in Home Assistant hinzufügen:

[![Repository zu Home Assistant hinzufügen](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https://github.com/kasawino69/winomc-beta)

Alternativ manuell:

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

Für einen normalen privaten Survival-Server reichen meistens diese Werte:

```yaml
VERSION: LATEST
SERVER_NAME: "[BETA] WinoMC Server"
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

Falls nicht, kann der Server manuell in Minecraft hinzugefügt werden:

```text
Adresse: IP-Adresse von Home Assistant
Port: 19132
```

Wichtig: Minecraft Bedrock nutzt UDP. Bei Router, Firewall oder Portfreigaben muss daher UDP freigegeben werden, nicht TCP.

---

### Web-Konsole

WinoMC enthält eine Web-Konsole in Home Assistant.

Damit können Servermeldungen gelesen und Befehle gesendet werden.

Beispiele:

```text
say Hallo zusammen
list
stop
```

Befehle werden ohne führenden Slash eingegeben.

Richtig:

```text
say Hallo
```

Nicht nötig:

```text
/say Hallo
```

Die Web-Konsole ist ein Admin-Werkzeug. Darüber können serverrelevante Befehle ausgeführt werden.

---

### Speicherorte

Wichtige Pfade:

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
/config/world_templates
```

Weltvorlagen.

```text
/share/winomc/import
```

Import-Ordner für Welten, Packs und Add-ons.

```text
/share/winomc/export
```

Optionaler Export-Ordner.

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

Vorsicht: FORCE_WORLD_COPY kann eine bestehende Welt ersetzen. Vorher immer ein Backup erstellen.

---

### Backups

Das Add-on unterstützt Home-Assistant-Backups.

Empfohlen:

- Vor größeren Updates ein Backup erstellen
- Vor Weltimporten ein Backup erstellen
- Vor FORCE_WORLD_COPY ein Backup erstellen
- Vor FORCE_PACK_COPY ein Backup erstellen

Zusätzlich kann WinoMC alte Serverpakete vor Updates sichern:

```yaml
PACKAGE_BACKUP_KEEP: 2
```

Das ersetzt kein vollständiges Welt-Backup.

---

### Einstellungen kurz erklärt

| Einstellung | Kurz erklärt |
|---|---|
| WINOMC_RUNTIME_MODE | Runtime-Modus. Aktuell native. Normalerweise nicht ändern. |
| BDS_AUTO_UPDATE | Prüft beim Start, ob der Bedrock Server aktualisiert werden soll. |
| BDS_DIRECT_DOWNLOAD_URL | Optionaler direkter Download-Link für den Bedrock Server. Nur bei Bedarf verwenden. |
| VERSION | Bedrock-Server-Version. Empfohlen: LATEST. |
| SERVER_NAME | Name des Servers im Minecraft-Client. |
| LEVEL_NAME | Name der Welt. |
| GAMEMODE | Standard-Spielmodus: survival, creative oder adventure. |
| FORCE_GAMEMODE | Erzwingt den eingestellten Spielmodus beim Beitritt. |
| DIFFICULTY | Schwierigkeit: peaceful, easy, normal oder hard. |
| ALLOW_CHEATS | Aktiviert Cheats. Für normale Survival-Server meist false. |
| MAX_PLAYERS | Maximale Anzahl gleichzeitiger Spieler. |
| ALLOW_LIST | Aktiviert die Allowlist. Nur eingetragene Spieler können beitreten. |
| ALLOW_LIST_USERS | Spieler für die Allowlist. |
| LEVEL_TYPE | Welttyp: DEFAULT, FLAT oder LEGACY. |
| ONLINE_MODE | Microsoft/Xbox-Authentifizierung. Für normale Server true lassen. |
| ENABLE_LAN_VISIBILITY | Server soll im lokalen Netzwerk sichtbar sein. |
| VIEW_DISTANCE | Sichtweite. Höhere Werte benötigen mehr Leistung. |
| TICK_DISTANCE | Simulationsdistanz. Höhere Werte benötigen mehr Leistung. |
| PLAYER_IDLE_TIMEOUT | Minuten bis inaktive Spieler getrennt werden. |
| MAX_THREADS | Maximale Thread-Anzahl für den Server. |
| LEVEL_SEED | Seed für neue Welten. Wirkt nicht nachträglich auf bestehende Welten. |
| DEFAULT_PLAYER_PERMISSION_LEVEL | Standardrechte für neue Spieler: member, operator oder visitor. |
| TEXTUREPACK_REQUIRED | Spieler müssen Resource Packs akzeptieren, wenn true. |
| SERVER_AUTHORITATIVE_MOVEMENT | Legt fest, wie streng Bewegungen geprüft werden. Standard: server-auth. |
| SERVER_AUTHORITATIVE_BLOCK_BREAKING | Server prüft Blockabbau strenger, wenn true. |
| EMIT_SERVER_TELEMETRY | Server-Telemetrie senden. Standard: false. |
| PLAYER_MOVEMENT_SCORE_THRESHOLD | Erweiterter Wert für Bewegungsprüfung. Normalerweise nicht ändern. |
| PLAYER_MOVEMENT_DISTANCE_THRESHOLD | Erweiterter Wert für Bewegungsprüfung. Normalerweise nicht ändern. |
| PLAYER_MOVEMENT_DURATION_THRESHOLD_IN_MS | Erweiterter Wert für Bewegungsprüfung. Normalerweise nicht ändern. |
| CORRECT_PLAYER_MOVEMENT | Korrigiert erkannte Bewegungsabweichungen, wenn true. |
| OPS | Spieler oder XUIDs mit Operator-Rechten. |
| MEMBERS | Spieler oder XUIDs mit Member-Rechten. |
| VISITORS | Spieler oder XUIDs mit Besucher-Rechten. |
| SERVER_PORT | IPv4-Port des Bedrock Servers. Standard: 19132. |
| SERVER_PORT_V6 | IPv6-Port des Bedrock Servers. Standard: 19133. |
| ENABLE_BDS_V6BIND_FIX | Erlaubt IPv4 und IPv6 auf demselben Port. |
| USE_BOX64 | Wird für ARM64 genutzt. Auf amd64 nicht relevant. |
| TZ | Zeitzone, zum Beispiel Europe/Berlin. |
| PACKAGE_BACKUP_KEEP | Anzahl alter Serverpaket-Backups, die behalten werden. |
| DOWNLOAD_PROGRESS | Zeigt ausführlicheren Download-Fortschritt. |
| MC_PACK | Datei oder Pfad für Welt-, Pack- oder Add-on-Import. |
| FORCE_WORLD_COPY | Erzwingt erneuten Weltimport. Vorsichtig verwenden. |
| FORCE_PACK_COPY | Erzwingt erneuten Packimport. |
| CONTENT_LOG_FILE_ENABLED | Schreibt Content-Logs in Dateien. Hilfreich bei Pack-Fehlern. |
| CONTENT_LOG_LEVEL | Detailgrad der Content-Logs: verbose, info, warning oder error. |
| CONTENT_LOG_CONSOLE_OUTPUT_ENABLED | Gibt Content-Logs zusätzlich in der Konsole aus. |
| CHAT_RESTRICTION | Chat-Einschränkung: None, Dropped oder Disabled. |
| DISABLE_PLAYER_INTERACTION | Schränkt Spielerinteraktionen ein. |
| DISABLE_PERSONA | Deaktiviert Persona-/Charakter-Anpassungen. |
| DISABLE_CUSTOM_SKINS | Deaktiviert benutzerdefinierte Skins. |
| MSA_GAMERTAGS_ONLY | Beschränkt Namen auf Microsoft-/Xbox-Gamertags. |
| VARIABLES | Zusätzliche Variablen für fortgeschrittene Nutzung. Normalerweise leer lassen. |
| ENABLE_WEB_CONSOLE | Aktiviert die WinoMC Web-Konsole. |
| WINOMC_CONSOLE_HISTORY_LIMIT | Anzahl der Log-Zeilen, die die Web-Konsole lädt. |

---

### Empfohlene Werte für private Server

```yaml
VERSION: LATEST
GAMEMODE: survival
FORCE_GAMEMODE: false
DIFFICULTY: normal
ALLOW_CHEATS: false
MAX_PLAYERS: 10
ALLOW_LIST: true
ONLINE_MODE: true
ENABLE_LAN_VISIBILITY: true
VIEW_DISTANCE: 10
TICK_DISTANCE: 4
DEFAULT_PLAYER_PERMISSION_LEVEL: member
TEXTUREPACK_REQUIRED: false
SERVER_PORT: 19132
SERVER_PORT_V6: 19133
ENABLE_BDS_V6BIND_FIX: false
DOWNLOAD_PROGRESS: false
CONTENT_LOG_LEVEL: info
CHAT_RESTRICTION: None
DISABLE_CUSTOM_SKINS: false
ENABLE_WEB_CONSOLE: true
WINOMC_CONSOLE_HISTORY_LIMIT: 300
```

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

### Fehlerbehebung

Server erscheint nicht als LAN-Spiel:

- ENABLE_LAN_VISIBILITY prüfen
- Client und Home Assistant müssen im selben Netzwerk sein
- WLAN-Isolation im Router deaktivieren
- Firewall prüfen
- UDP-Port prüfen
- Server alternativ manuell hinzufügen

Verbindung nicht möglich:

- Läuft das Add-on?
- Stimmt der Port?
- Wird UDP verwendet?
- Ist ONLINE_MODE passend gesetzt?
- Ist die Allowlist aktiv?
- Ist der Spieler eingetragen?

Resource Pack wird nicht geladen:

- Pack liegt im richtigen Ordner
- MC_PACK zeigt auf die richtige Datei
- Pack ist mit der Minecraft-Version kompatibel
- Content-Logs für Fehlersuche aktivieren

Debug-Werte:

```yaml
CONTENT_LOG_FILE_ENABLED: true
CONTENT_LOG_LEVEL: info
CONTENT_LOG_CONSOLE_OUTPUT_ENABLED: true
```

---

### Sicherheitshinweise

Für private Server empfohlen:

```yaml
ONLINE_MODE: true
ALLOW_CHEATS: false
ALLOW_LIST: true
DEFAULT_PLAYER_PERMISSION_LEVEL: member
ENABLE_WEB_CONSOLE: true
```

Operator-Rechte sollten nur vertrauenswürdige Spieler erhalten.

Nicht empfohlen für normale private Server:

```yaml
DEFAULT_PLAYER_PERMISSION_LEVEL: operator
```

---

### Bekannte Hinweise

- Minecraft Bedrock nutzt UDP.
- Ein Add-on-Neustart kann bei VERSION: LATEST auch ein Bedrock-Server-Update auslösen.
- LAN-Sichtbarkeit hängt vom Netzwerk und vom Client-Gerät ab.
- Konsolen wie Nintendo Switch oder Xbox können eigene Einschränkungen bei LAN-Anzeige oder Verbindung haben.
- Die Web-Konsole ist ein Admin-Werkzeug und sollte nur von vertrauenswürdigen Home-Assistant-Benutzern verwendet werden.
- Dieses Projekt ist kein offizielles Minecraft-, Mojang-, Microsoft- oder Home-Assistant-Projekt.

---

### Credits

Dieses Repository basiert ursprünglich auf der Arbeit von:

- williamcorsel/hassio-addons

Die ursprünglichen Vorlagen und Inspirationen stammen außerdem unter anderem von:

- alexbelgium/hassio-addons

WinoMC wurde danach für Minecraft Bedrock, Home Assistant und die eigene native Runtime weiter angepasst und erweitert.

Danke außerdem an:

- itzg/docker-minecraft-bedrock-server für viele gute Ideen, Verhaltensweisen und Kompatibilitätsreferenzen rund um Minecraft Bedrock Server Container
- poeggi/bds-ipv6fix für die technische Beschreibung und Idee des IPv6-Bind-Fixes
- Box64 für die Möglichkeit, den Bedrock Dedicated Server experimentell auf ARM64 auszuführen
- die Home-Assistant-Community
- die Minecraft-Community

WinoMC-spezifische Anpassungen und Weiterentwicklung werden im WinoMC-Projekt gepflegt.

---

### Lizenz

Dieses Repository steht unter der MIT-Lizenz, soweit nicht anders angegeben.

Drittprojekte behalten ihre jeweiligen eigenen Lizenzen und Rechte.

Minecraft, Minecraft Bedrock, Bedrock Dedicated Server, Mojang und Microsoft sind Marken oder Eigentum der jeweiligen Rechteinhaber.

Home Assistant ist ein Projekt der Home-Assistant-Community und ihrer jeweiligen Rechteinhaber.

WinoMC ist nicht offiziell mit Mojang, Microsoft, Home Assistant, itzg, poeggi, Box64 oder den ursprünglichen Upstream-Repositories verbunden, sofern nicht ausdrücklich anders angegeben.
