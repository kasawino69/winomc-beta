# [BETA] WinoMC Bedrock Server

[BETA] WinoMC stellt einen **Minecraft Bedrock Dedicated Server** als **Home-Assistant-Add-on** bereit.

Das Ziel ist einfach:  
Repository hinzufügen, Add-on installieren, Einstellungen prüfen, starten und mit Freunden spielen.

[BETA] WinoMC nutzt eine eigene native Runtime und ist nicht mehr vom `itzg`-Image abhängig.

---

## Inhalt

- Minecraft Bedrock Server direkt in Home Assistant
- Einfache Einrichtung über die Home-Assistant-Oberfläche
- Moderne Web-Konsole mit PC- und Mobile-Ansicht
- Live Console mit Befehlseingabe und Bedrock-Befehlshilfe
- Dateimanager für Welten, Packs, Backups und Serverdateien
- Datei-Editor mit JSON-Prüfung und Sicherheitsbackup
- Import von Welten, Resource Packs, Behavior Packs und Add-ons
- Export- und ZIP-Funktionen
- Home-Assistant-Backups
- IPv4, IPv6 und optionaler IPv6-Bind-Fix
- Allowlist, Operatoren, Mitglieder und Besucherrechte
- Host- und Ressourcenoptimierung
- Unterstützung für `amd64`
- Experimentelle Unterstützung für `aarch64 / ARM64` über Box64

---

## Installation

### Repository zu Home Assistant hinzufügen

[![Repository zu Home Assistant hinzufügen](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https://github.com/kasawino69/winomc-beta)

Alternativ manuell:

1. Home Assistant öffnen
2. **Einstellungen**
3. **Add-ons**
4. **Add-on Store**
5. Oben rechts auf die drei Punkte klicken
6. **Repositorys** öffnen
7. Diese URL einfügen:

```text
https://github.com/kasawino69/winomc-beta
```

Danach das Add-on installieren:

```text
[BETA] WinoMC Bedrock Server
```

---

## Schnellstart

Für einen normalen privaten Survival-Server reichen meistens diese Einstellungen:

```yaml
VERSION: LATEST
SERVER_NAME: [BETA] WinoMC Server
LEVEL_NAME: world
GAMEMODE: survival
DIFFICULTY: normal
ALLOW_CHEATS: false
MAX_PLAYERS: 10
ONLINE_MODE: true
ALLOW_LIST: true
ENABLE_LAN_VISIBILITY: true
SERVER_PORT: 19132
SERVER_PORT_V6: 19133
ENABLE_WEB_CONSOLE: true
```

Beim ersten Start lädt [BETA] WinoMC automatisch den offiziellen Minecraft Bedrock Dedicated Server herunter.

---

## Verbindung zum Server

Im gleichen Netzwerk kann der Server je nach Gerät automatisch als LAN-Spiel erscheinen.

Falls der Server nicht automatisch angezeigt wird, kann er manuell in Minecraft hinzugefügt werden:

```text
Adresse: IP-Adresse von Home Assistant
Port: 19132
```

Wichtig: Minecraft Bedrock nutzt **UDP**.  
Bei Router, Firewall oder Portfreigaben muss daher UDP freigegeben werden, nicht TCP.

---

## Web-Konsole

[BETA] WinoMC enthält eine eigene Web-Konsole direkt in Home Assistant.

Die Web-Konsole bietet:

- Serverübersicht
- Live Console
- intelligente Befehlseingabe
- Bedrock-Befehlshilfe
- Dateimanager
- Datei-Editor
- Pack- und Add-on-Verwaltung
- Backup- und Exportfunktionen
- Netzwerkdiagnose
- Dashboard mit eigenen Schnellaktionen
- PC-Workbench
- Mobile Ansicht für Smartphones

Die Web-Konsole ist ein Admin-Werkzeug.  
Darüber können Serverbefehle ausgeführt und Dateien verändert werden. Sie sollte daher nur von vertrauenswürdigen Home-Assistant-Benutzern verwendet werden.

---

## PC- und Mobile-Ansicht

[BETA] WinoMC nutzt zwei klare Ansichten:

### PC-Ansicht

Für Desktop, Notebook und große Browserfenster.

Die PC-Ansicht bietet:

- linke Navigation
- große Arbeitsbereiche
- PC-Workbench
- Dateimanager mit mehr Platz
- Live Console als andockbarer Bereich
- Dashboard mit Drag & Drop
- komfortable Bedienung mit Maus und Tastatur

### Mobile Ansicht

Für Smartphones.

Die Mobile Ansicht ist bewusst einfacher gehalten:

- kompakte Navigation
- große Touch-Flächen
- Dateimanager als mobile Kartenansicht
- Aktionen über Menüs statt über viele einzelne Buttons
- Editor als Vollbild-Overlay
- Live Console mit festen Größen: Kompakt, Normal, Groß und Vollbild
- keine PC-Workbench auf Smartphones

Der PC-Modus wird auf Smartphones nicht angeboten, da er dort nicht sinnvoll nutzbar ist.

---

## Live Console

Die Live Console zeigt die Serverausgabe und erlaubt das Senden von Befehlen.

Beispiele:

```text
say Hallo zusammen
list
gamerule keepinventory true
weather clear
time set day
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

Die Befehlshilfe unterstützt Minecraft-Bedrock-Befehle und Gamerules.  
Vorschläge werden nur übernommen und nicht automatisch ausgeführt.

---

## Mein Dashboard

Im Dashboard können häufig genutzte Aktionen als Kacheln abgelegt werden.

Beispiele:

- Wetter klar
- Tag setzen
- Spieler anzeigen
- Backup speichern
- eigene Serverbefehle

Auf dem PC können Dashboard-Kacheln per Drag & Drop sortiert werden.  
Auf Mobile erfolgt die Bedienung über kompakte Aktionsmenüs.

Eine Kachel führt nichts aus, solange nicht bewusst auf **Ausführen** gedrückt wird.

---

## Dateimanager

Der Dateimanager hilft beim Verwalten von Serverdateien.

Er kann unter anderem:

- Ordner öffnen
- Dateien herunterladen
- Dateien hochladen
- Dateien bearbeiten
- Dateien verschieben
- Dateien löschen
- Dateien als ZIP packen
- ZIP-Dateien entpacken
- sichere Welt-Exporte erstellen
- MD5-Prüfsummen anzeigen
- Papierkorb verwenden

Auf Mobile sind die Dateiaktionen in einem Menü zusammengefasst, damit die Ansicht übersichtlich bleibt.

---

## Datei-Editor

Textdateien können direkt in der Web-Konsole bearbeitet werden.

Der Editor bietet:

- Vollbild-Overlay
- JSON-Prüfung vor dem Speichern
- automatisches Backup vor Änderungen
- Schutz vor zu großen Dateien
- klare Warnhinweise bei Serverdateien

Wichtig: Änderungen an Dateien wie `server.properties`, Packs oder Weltdaten können einen Server-Neustart benötigen.

---

## Speicherorte

Wichtige Pfade im Add-on:

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
/share/[BETA] WinoMC/import
```

Import-Ordner für Welten, Packs und Add-ons.

```text
/share/[BETA] WinoMC/export
```

Export-Ordner für ZIPs und Welt-Exporte.

---

## Welten und Packs importieren

[BETA] WinoMC kann folgende Dateien importieren:

```text
.mcworld
.mcpack
.mcaddon
.mctemplate
.zip
```

Beispiel für ein Resource Pack:

```yaml
MC_PACK: /share/[BETA] WinoMC/import/mein-pack.mcpack
```

Beispiel für eine Welt:

```yaml
MC_PACK: /share/[BETA] WinoMC/import/meine-welt.mcworld
```

Wenn vorhandene Packs oder Welten ersetzt werden sollen:

```yaml
FORCE_PACK_COPY: true
FORCE_WORLD_COPY: true
```

Vorsicht: `FORCE_WORLD_COPY` kann eine bestehende Welt ersetzen.  
Vorher immer ein Backup erstellen.

---

## Backups

Das Add-on unterstützt Home-Assistant-Backups.

Empfohlen:

- vor größeren Updates ein Backup erstellen
- vor Weltimporten ein Backup erstellen
- vor Pack-Importen ein Backup erstellen
- vor `FORCE_WORLD_COPY` ein Backup erstellen
- vor `FORCE_PACK_COPY` ein Backup erstellen

Zusätzlich kann [BETA] WinoMC alte Serverpakete vor Updates sichern:

```yaml
PACKAGE_BACKUP_KEEP: 2
```

Das ersetzt kein vollständiges Welt-Backup.

---

## Allowlist und Spielerrechte

Für private Server wird eine Allowlist empfohlen:

```yaml
ALLOW_LIST: true
```

Spieler können über die Home-Assistant-Optionen eingetragen werden.

Beispiel:

```yaml
ALLOW_LIST_USERS: Spielername:XUID
```

Mehrere Spieler werden durch Komma getrennt:

```yaml
ALLOW_LIST_USERS: Spieler1:XUID1,Spieler2:XUID2
```

Zusätzlich können Rechte vergeben werden:

```yaml
OPS: ""
MEMBERS: ""
VISITORS: ""
```

Empfehlung für private Server:

```yaml
DEFAULT_PLAYER_PERMISSION_LEVEL: member
```

Operator-Rechte sollten nur vertrauenswürdige Spieler erhalten.

---

## Empfohlene Werte für private Server

```yaml
VERSION: LATEST
BDS_AUTO_UPDATE: true
SERVER_NAME: [BETA] WinoMC Server
LEVEL_NAME: world
GAMEMODE: survival
FORCE_GAMEMODE: false
DIFFICULTY: normal
ALLOW_CHEATS: false
MAX_PLAYERS: 10
ONLINE_MODE: true
ALLOW_LIST: true
ENABLE_LAN_VISIBILITY: true
VIEW_DISTANCE: 10
TICK_DISTANCE: 4
DEFAULT_PLAYER_PERMISSION_LEVEL: member
TEXTUREPACK_REQUIRED: false
SERVER_PORT: 19132
SERVER_PORT_V6: 19133
ENABLE_BDS_V6BIND_FIX: false
ENABLE_WEB_CONSOLE: true
[BETA] WinoMC_CONSOLE_HISTORY_LIMIT: 300
```

---

## Wichtige Einstellungen kurz erklärt

| Einstellung | Bedeutung |
|---|---|
| `VERSION` | Bedrock-Server-Version. Für die meisten Nutzer ist `LATEST` sinnvoll. |
| `BDS_AUTO_UPDATE` | Prüft beim Start, ob der Bedrock Server aktualisiert werden soll. |
| `BDS_DIRECT_DOWNLOAD_URL` | Optionaler direkter Download-Link. Nur bei Bedarf verwenden. |
| `SERVER_NAME` | Name des Servers im Minecraft-Client. |
| `LEVEL_NAME` | Name der Welt. |
| `LEVEL_SEED` | Seed für neue Welten. Wirkt nicht nachträglich auf bestehende Welten. |
| `LEVEL_TYPE` | Welttyp: `DEFAULT`, `FLAT` oder `LEGACY`. |
| `GAMEMODE` | Spielmodus: `survival`, `creative` oder `adventure`. |
| `FORCE_GAMEMODE` | Erzwingt den eingestellten Spielmodus beim Beitritt. |
| `DIFFICULTY` | Schwierigkeit: `peaceful`, `easy`, `normal` oder `hard`. |
| `ALLOW_CHEATS` | Aktiviert Cheats. Für normale Survival-Server meist `false`. |
| `MAX_PLAYERS` | Maximale Anzahl gleichzeitiger Spieler. |
| `ONLINE_MODE` | Microsoft/Xbox-Authentifizierung. Für normale Server `true` lassen. |
| `ALLOW_LIST` | Aktiviert die Allowlist. |
| `ALLOW_LIST_USERS` | Spieler für die Allowlist. |
| `OPS` | Spieler oder XUIDs mit Operator-Rechten. |
| `MEMBERS` | Spieler oder XUIDs mit Member-Rechten. |
| `VISITORS` | Spieler oder XUIDs mit Besucher-Rechten. |
| `SERVER_PORT` | IPv4-Port des Bedrock Servers. Standard: `19132`. |
| `SERVER_PORT_V6` | IPv6-Port des Bedrock Servers. Standard: `19133`. |
| `ENABLE_BDS_V6BIND_FIX` | Optionaler IPv6-Bind-Fix. |
| `ENABLE_WEB_CONSOLE` | Aktiviert die [BETA] WinoMC Web-Konsole. |
| `[BETA] WinoMC_CONSOLE_HISTORY_LIMIT` | Anzahl der Log-Zeilen, die die Web-Konsole lädt. |
| `MC_PACK` | Datei oder Pfad für Welt-, Pack- oder Add-on-Import. |
| `FORCE_WORLD_COPY` | Erzwingt erneuten Weltimport. Vorsichtig verwenden. |
| `FORCE_PACK_COPY` | Erzwingt erneuten Packimport. |
| `TEXTUREPACK_REQUIRED` | Spieler müssen Resource Packs akzeptieren, wenn `true`. |
| `VIEW_DISTANCE` | Sichtweite. Höhere Werte benötigen mehr Leistung. |
| `TICK_DISTANCE` | Simulationsdistanz. Höhere Werte benötigen mehr Leistung. |
| `PLAYER_IDLE_TIMEOUT` | Minuten bis inaktive Spieler getrennt werden. |
| `MAX_THREADS` | Maximale Thread-Anzahl für den Server. |
| `PACKAGE_BACKUP_KEEP` | Anzahl alter Serverpaket-Backups, die behalten werden. |
| `DOWNLOAD_PROGRESS` | Zeigt ausführlicheren Download-Fortschritt. |
| `TZ` | Zeitzone, zum Beispiel `Europe/Berlin`. |

---

## Host- und Ressourcenoptimierung

[BETA] WinoMC enthält Optionen, um den Server besser an das Hostsystem anzupassen.

| Einstellung | Bedeutung |
|---|---|
| `[BETA] WinoMC_HOST_OPTIMIZATION_MODE` | Optimierungsprofil für das Hostsystem. |
| `[BETA] WinoMC_CPU_AFFINITY` | Optional feste CPU-Zuordnung. Für normale Nutzer leer lassen. |
| `[BETA] WinoMC_BDS_NICE` | Prozess-Priorität. Normalerweise `auto`. |
| `[BETA] WinoMC_BDS_IONICE_CLASS` | I/O-Priorität. Normalerweise `auto`. |
| `[BETA] WinoMC_BDS_IONICE_LEVEL` | I/O-Level. Normalerweise `auto`. |
| `[BETA] WinoMC_ENABLE_JEMALLOC` | Speicheroptimierung. Normalerweise `auto`. |
| `[BETA] WinoMC_RUNTIME_ANALYSIS` | Zeigt Laufzeit- und Systemhinweise an. |

Für die meisten Nutzer ist diese Einstellung sinnvoll:

```yaml
[BETA] WinoMC_HOST_OPTIMIZATION_MODE: balanced
```

---

## Content-Logs und Fehlersuche bei Packs

Wenn Packs oder Add-ons nicht richtig funktionieren, können Content-Logs helfen:

```yaml
CONTENT_LOG_FILE_ENABLED: true
CONTENT_LOG_LEVEL: info
CONTENT_LOG_CONSOLE_OUTPUT_ENABLED: true
```

Mögliche Werte für `CONTENT_LOG_LEVEL`:

```text
verbose
info
warning
error
```

---

## IPv4 und IPv6

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

Der IPv6-Bind-Fix wird von [BETA] WinoMC selbst aus Quellcode gebaut.  
Es wird dafür kein fremdes Fertig-Binary heruntergeladen.

---

## ARM64 / aarch64

ARM64 wird experimentell unterstützt.

Da der offizielle Bedrock Dedicated Server für Linux nicht nativ als ARM64-Server bereitgestellt wird, nutzt [BETA] WinoMC auf ARM64 Box64.

Standard:

```yaml
USE_BOX64: true
```

Auf `amd64` wird Box64 nicht verwendet.

Hinweis: `amd64` hat Priorität. ARM64 ist experimentell.

---

## Netzwerk und LAN-Sichtbarkeit

Wenn der Server nicht als LAN-Spiel erscheint:

- `ENABLE_LAN_VISIBILITY` prüfen
- Minecraft und Home Assistant müssen im selben Netzwerk sein
- WLAN-Isolation im Router deaktivieren
- Firewall prüfen
- UDP-Port prüfen
- Server alternativ manuell hinzufügen

Auf iPhone und iPad muss Minecraft unter Umständen Zugriff auf das lokale Netzwerk bekommen:

```text
iOS Einstellungen -> Minecraft -> Lokales Netzwerk erlauben
```

Konsolen wie Nintendo Switch oder Xbox können eigene Einschränkungen bei der LAN-Anzeige haben.  
In diesem Fall kann eine manuelle Serververbindung oder ein separates Friend-Broadcast-Add-on helfen.

---

## Optionale Ergänzung: [BETA] WinoMC Friend Broadcast

Für manche Geräte, vor allem Konsolen, kann ein Freundes-/Broadcast-Ansatz hilfreicher sein als die reine LAN-Anzeige.

Dafür gibt es ein separates Add-on:

```text
[BETA] WinoMC Friend Broadcast
```

Dieses Add-on ist nicht zwingend nötig, kann aber helfen, wenn ein Bedrock-Server über Freundeslisten sichtbarer gemacht werden soll.

Typische Hinweise:

- Login erfolgt über Microsoft-Linking
- ein separater Account ist empfehlenswert
- Auth-Cache kann bei Bedarf zurückgesetzt werden
- der Bedrock Server selbst bleibt weiterhin dieses Add-on

---

## Sicherheitshinweise

Für private Server empfohlen:

```yaml
ONLINE_MODE: true
ALLOW_CHEATS: false
ALLOW_LIST: true
DEFAULT_PLAYER_PERMISSION_LEVEL: member
ENABLE_WEB_CONSOLE: true
```

Nicht empfohlen für normale private Server:

```yaml
DEFAULT_PLAYER_PERMISSION_LEVEL: operator
```

Die Web-Konsole ist ein Admin-Werkzeug.  
Wer Zugriff auf die Web-Konsole hat, kann Serverbefehle ausführen und Dateien verändern.

Keine Tokens, Zugangsdaten, privaten Weltdateien oder sensiblen Informationen öffentlich in Issues posten.

---

## Fehlerbehebung

### Server startet nicht

Prüfen:

- Add-on-Log öffnen
- EULA akzeptiert?
- Internetverbindung vorhanden?
- `VERSION` korrekt?
- genug Speicherplatz vorhanden?
- läuft Home Assistant auf unterstützter Architektur?

### Verbindung nicht möglich

Prüfen:

- läuft das Add-on?
- stimmt die IP-Adresse?
- stimmt der Port?
- wird UDP verwendet?
- ist `ONLINE_MODE` passend gesetzt?
- ist die Allowlist aktiv?
- ist der Spieler eingetragen?

### Resource Pack wird nicht geladen

Prüfen:

- Pack liegt im richtigen Ordner
- `MC_PACK` zeigt auf die richtige Datei
- Pack ist mit der Minecraft-Version kompatibel
- Content-Logs aktivieren

### Web-Konsole lädt nicht

Prüfen:

- `ENABLE_WEB_CONSOLE: true`
- Add-on läuft
- Home-Assistant-Ingress erreichbar
- Browser hart neu laden
- auf Mobile Browser-Tab einmal schließen und neu öffnen

---

## Bekannte Hinweise

- Minecraft Bedrock nutzt UDP.
- Ein Add-on-Neustart kann bei `VERSION: LATEST` auch ein Bedrock-Server-Update auslösen.
- LAN-Sichtbarkeit hängt vom Netzwerk und vom Client-Gerät ab.
- Nintendo Switch, Xbox und manche mobile Geräte können eigene Einschränkungen bei LAN-Anzeige oder Verbindung haben.
- ARM64 ist experimentell.
- Die Web-Konsole ist ein Admin-Werkzeug.
- Dieses Projekt ist kein offizielles Minecraft-, Mojang-, Microsoft- oder Home-Assistant-Projekt.

---

## Support und Sicherheitsmeldungen

Fehler, Wünsche und Sicherheitsprobleme können über GitHub Issues gemeldet werden:

```text
https://github.com/kasawino69/WinoMC/issues
```

Bitte dabei angeben:

- verwendete Add-on-Version
- Home-Assistant-Version
- Architektur: `amd64` oder `aarch64`
- relevante Einstellungen
- Logauszug ohne private Daten
- kurze Beschreibung, was erwartet wurde und was passiert ist

Bitte keine Zugangsdaten, Tokens, privaten Welt-Backups oder persönlichen Daten veröffentlichen.

WICHTIG:
Für die [BETA] WinoMC Versionen wird kein Support gegeben.

---

## Credits

Dieses Repository basiert ursprünglich auf der Arbeit von:

- `williamcorsel/hassio-addons`

Die ursprünglichen Vorlagen und Inspirationen stammen außerdem unter anderem von:

- `alexbelgium/hassio-addons`

WinoMC wurde danach für Minecraft Bedrock, Home Assistant und die eigene native Runtime weiter angepasst und erweitert.

Danke außerdem an:

- `itzg/docker-minecraft-bedrock-server` für viele gute Ideen, Verhaltensweisen und Kompatibilitätsreferenzen rund um Minecraft Bedrock Server Container
- `poeggi/bds-ipv6fix` für die technische Beschreibung und Idee des IPv6-Bind-Fixes
- `Box64` für die Möglichkeit, den Bedrock Dedicated Server experimentell auf ARM64 auszuführen
- die Home-Assistant-Community
- die Minecraft-Community

[BETA] WinoMC-spezifische Anpassungen und Weiterentwicklung werden im [BETA] WinoMC-Projekt gepflegt.

---

## Lizenz

Dieses Repository steht unter der MIT-Lizenz, soweit nicht anders angegeben.

Drittprojekte behalten ihre jeweiligen eigenen Lizenzen und Rechte.

Minecraft, Minecraft Bedrock, Bedrock Dedicated Server, Mojang und Microsoft sind Marken oder Eigentum der jeweiligen Rechteinhaber.

Home Assistant ist ein Projekt der Home-Assistant-Community und ihrer jeweiligen Rechteinhaber.

WinoMC ist nicht offiziell mit Mojang, Microsoft, Home Assistant, itzg, poeggi, Box64 oder den ursprünglichen Upstream-Repositories verbunden, sofern nicht ausdrücklich anders angegeben.
