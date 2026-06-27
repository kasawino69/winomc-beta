# WinoMC Bedrock Server

Das **WinoMC Bedrock Server Add-on** stellt einen Minecraft Bedrock Dedicated Server direkt in Home Assistant bereit.

Das Add-on basiert auf einem Minecraft Bedrock Dedicated Server Container und ist für den Betrieb als Home-Assistant-Add-on angepasst.

Es eignet sich für private Bedrock-Server im Heimnetzwerk, zum Beispiel für Minecraft Bedrock auf:

- Windows
- Xbox
- Nintendo Switch
- iOS
- Android
- PlayStation

---

## Funktionen

- Minecraft Bedrock Dedicated Server als Home-Assistant-Add-on
- Konfiguration direkt über die Home-Assistant-UI
- Persistente Serverdaten im Add-on-Konfigurationsverzeichnis
- Unterstützung für Home-Assistant-Backups
- Unterstützung für LAN-Sichtbarkeit
- IPv4- und IPv6-Port-Konfiguration
- Optionaler IPv6-Bind-Fix für Dual-Stack-Setups
- WinoMC Live Console direkt über die Home-Assistant-Ingress-Oberfläche
- Konsolenbefehle über Home Assistant und Automationen möglich
- Unterstützung für Worlds, Resource Packs und Behavior Packs
- Import- und Export-Verzeichnisse unter `/share/winomc`

---

## Installation

1. Öffne Home Assistant.
2. Gehe zu **Einstellungen → Add-ons → Add-on Store**.
3. Füge das WinoMC Add-on Repository hinzu, falls noch nicht geschehen.
4. Installiere **WinoMC Bedrock Server**.
5. Öffne die Add-on-Konfiguration.
6. Passe die Einstellungen an.
7. Starte das Add-on.

Beim ersten Start lädt das Add-on die passende Minecraft Bedrock Server-Version herunter.

---

## Speicherorte

Das Add-on nutzt folgende interne Pfade:

```text
/config
```

Hauptverzeichnis für Serverdaten.

```text
/config/worlds
```

Speicherort für Welten.

```text
/config/behavior_packs
```

Speicherort für Behavior Packs.

```text
/config/resource_packs
```

Speicherort für Resource Packs.

```text
/config/world_templates
```

Speicherort für Weltvorlagen.

```text
/share/winomc/import
```

Optionales Import-Verzeichnis.

```text
/share/winomc/export
```

Optionales Export-Verzeichnis.

---

## Netzwerk

Das Add-on verwendet Host-Netzwerk.

Standard-Port:

```text
19132/udp
```

Minecraft Bedrock verwendet UDP. Bei Portweiterleitungen, Firewall-Regeln oder Router-Einstellungen muss daher UDP freigegeben werden, nicht TCP.

---

## Empfohlene Grundkonfiguration

Für einen normalen privaten Survival-Server:

```yaml
VERSION: LATEST
SERVER_NAME: WinoMC Server
LEVEL_NAME: world
GAMEMODE: survival
FORCE_GAMEMODE: false
DIFFICULTY: normal
ALLOW_CHEATS: false
MAX_PLAYERS: 10
ALLOW_LIST: false
ALLOW_LIST_USERS: ""
LEVEL_TYPE: DEFAULT
ONLINE_MODE: true
ENABLE_LAN_VISIBILITY: true
VIEW_DISTANCE: 10
TICK_DISTANCE: 4
PLAYER_IDLE_TIMEOUT: 30
MAX_THREADS: 2
LEVEL_SEED: ""
DEFAULT_PLAYER_PERMISSION_LEVEL: member
TEXTUREPACK_REQUIRED: false
SERVER_AUTHORITATIVE_MOVEMENT: server-auth
SERVER_AUTHORITATIVE_BLOCK_BREAKING: false
EMIT_SERVER_TELEMETRY: false
PLAYER_MOVEMENT_SCORE_THRESHOLD: 20
PLAYER_MOVEMENT_DISTANCE_THRESHOLD: 0.3
PLAYER_MOVEMENT_DURATION_THRESHOLD_IN_MS: 500
CORRECT_PLAYER_MOVEMENT: false
OPS: ""
MEMBERS: ""
VISITORS: ""
SERVER_PORT: 19132
SERVER_PORT_V6: 19133
ENABLE_BDS_V6BIND_FIX: false
TZ: Europe/Berlin
PACKAGE_BACKUP_KEEP: 2
DOWNLOAD_PROGRESS: false
MC_PACK: ""
FORCE_WORLD_COPY: false
FORCE_PACK_COPY: false
CONTENT_LOG_FILE_ENABLED: false
CONTENT_LOG_LEVEL: info
CONTENT_LOG_CONSOLE_OUTPUT_ENABLED: false
CHAT_RESTRICTION: None
DISABLE_PLAYER_INTERACTION: false
DISABLE_PERSONA: false
DISABLE_CUSTOM_SKINS: false
MSA_GAMERTAGS_ONLY: false
ENABLE_WEB_CONSOLE: true
WINOMC_CONSOLE_HISTORY_LIMIT: 300
VARIABLES: ""
```

---

# UI-Einstellungen

## Server-Version

### `VERSION`

Legt fest, welche Minecraft Bedrock Server-Version verwendet wird.

Mögliche Werte:

```text
LATEST
PREVIEW
PREVIOUS
konkrete Versionsnummer
```

Beispiele:

```yaml
VERSION: LATEST
```

```yaml
VERSION: PREVIEW
```

```yaml
VERSION: PREVIOUS
```

```yaml
VERSION: "1.21.93.1"
```

Empfohlen:

```yaml
VERSION: LATEST
```

Mit `LATEST` wird beim Start des Add-ons geprüft, ob eine neuere stabile Bedrock Server-Version verfügbar ist.

Hinweis: Ein Add-on-Neustart kann dadurch auch den Bedrock Server aktualisieren.

---

## Welt und Servername

### `SERVER_NAME`

Name des Servers, der im Minecraft-Client angezeigt wird.

Typ:

```text
Text
```

Beispiele:

```yaml
SERVER_NAME: WinoMC Server
```

```yaml
SERVER_NAME: Family Server
```

```yaml
SERVER_NAME: Survival World
```

---

### `LEVEL_NAME`

Name der Welt.

Typ:

```text
Text
```

Beispiel:

```yaml
LEVEL_NAME: world
```

Wenn bereits eine Welt mit diesem Namen existiert, wird diese verwendet.

Wenn keine Welt mit diesem Namen existiert, wird beim Start eine neue Welt erzeugt.

---

### `LEVEL_SEED`

Seed für neue Welten.

Typ:

```text
Text
```

Beispiele:

```yaml
LEVEL_SEED: ""
```

```yaml
LEVEL_SEED: "123456789"
```

```yaml
LEVEL_SEED: "MySeed"
```

Wichtig: Der Seed wirkt normalerweise nur bei neu erzeugten Welten. Eine bestehende Welt wird dadurch nicht nachträglich neu generiert.

---

### `LEVEL_TYPE`

Legt den Welt-Typ fest.

Mögliche Werte:

```text
DEFAULT
FLAT
LEGACY
```

Empfohlen:

```yaml
LEVEL_TYPE: DEFAULT
```

Bedeutung:

| Wert | Bedeutung |
|---|---|
| `DEFAULT` | Normale Minecraft-Welt |
| `FLAT` | Flache Welt |
| `LEGACY` | Alte Legacy-Weltgröße, falls unterstützt |

---

## Spielmodus und Schwierigkeit

### `GAMEMODE`

Legt den Standard-Spielmodus fest.

Mögliche Werte:

```text
survival
creative
adventure
```

Empfohlen für normales Spielen:

```yaml
GAMEMODE: survival
```

Bedeutung:

| Wert | Bedeutung |
|---|---|
| `survival` | Überleben |
| `creative` | Kreativmodus |
| `adventure` | Abenteuer-Modus |

---

### `FORCE_GAMEMODE`

Erzwingt den eingestellten Spielmodus beim Beitritt.

Mögliche Werte:

```text
true
false
```

Empfohlen:

```yaml
FORCE_GAMEMODE: false
```

Wenn `true`, werden Spieler beim Beitritt auf den unter `GAMEMODE` gesetzten Modus gezwungen.

---

### `DIFFICULTY`

Legt die Schwierigkeit fest.

Mögliche Werte:

```text
peaceful
easy
normal
hard
```

Empfohlen:

```yaml
DIFFICULTY: normal
```

Bedeutung:

| Wert | Bedeutung |
|---|---|
| `peaceful` | Friedlich, keine feindlichen Mobs |
| `easy` | Einfach |
| `normal` | Normal |
| `hard` | Schwer |

---

### `ALLOW_CHEATS`

Aktiviert Cheats.

Mögliche Werte:

```text
true
false
```

Empfohlen für Survival:

```yaml
ALLOW_CHEATS: false
```

Für Testserver oder Admin-Welten:

```yaml
ALLOW_CHEATS: true
```

Hinweis: Cheats können Auswirkungen auf Erfolge/Achievements haben.

---

## Spieler und Rechte

### `MAX_PLAYERS`

Maximale Anzahl gleichzeitiger Spieler.

Typ:

```text
Ganzzahl
```

Beispiel:

```yaml
MAX_PLAYERS: 10
```

Für kleine private Server sind Werte zwischen `5` und `20` üblich.

---

### `DEFAULT_PLAYER_PERMISSION_LEVEL`

Standard-Berechtigung für neue Spieler.

Mögliche Werte:

```text
member
operator
visitor
```

Empfohlen:

```yaml
DEFAULT_PLAYER_PERMISSION_LEVEL: member
```

Bedeutung:

| Wert | Bedeutung |
|---|---|
| `member` | Normaler Spieler |
| `operator` | Operator/Admin |
| `visitor` | Besucher, eingeschränkte Rechte |

---

### `OPS`

Liste von Spielern oder XUIDs, die Operator-Rechte erhalten sollen.

Typ:

```text
Text
```

Beispiel:

```yaml
OPS: ""
```

Beispiel mit Platzhaltern:

```yaml
OPS: "XUID1,XUID2"
```

Hinweis: Je nach Setup werden XUIDs oder unterstützte Spielerkennungen verwendet.

---

### `MEMBERS`

Liste von Spielern oder XUIDs, die Member-Rechte erhalten sollen.

Typ:

```text
Text
```

Beispiel:

```yaml
MEMBERS: ""
```

Beispiel mit Platzhaltern:

```yaml
MEMBERS: "XUID1,XUID2"
```

---

### `VISITORS`

Liste von Spielern oder XUIDs, die Besucher-Rechte erhalten sollen.

Typ:

```text
Text
```

Beispiel:

```yaml
VISITORS: ""
```

Beispiel mit Platzhaltern:

```yaml
VISITORS: "XUID1,XUID2"
```

---

## Allowlist

### `ALLOW_LIST`

Aktiviert die Allowlist.

Mögliche Werte:

```text
true
false
```

Empfohlen für private Server:

```yaml
ALLOW_LIST: true
```

Wenn aktiviert, dürfen nur eingetragene Spieler beitreten.

---

### `ALLOW_LIST_USERS`

Spieler für die Allowlist.

Typ:

```text
Text
```

Format:

```text
Name:XUID,Name2:XUID2
```

Beispiel:

```yaml
ALLOW_LIST_USERS: "Player1:XUID,Player2:XUID"
```

Wenn `ALLOW_LIST` deaktiviert ist, wird diese Liste normalerweise nicht benötigt.

---

## Online-Modus und Sichtbarkeit

### `ONLINE_MODE`

Legt fest, ob Xbox-/Microsoft-Authentifizierung verwendet wird.

Mögliche Werte:

```text
true
false
```

Empfohlen:

```yaml
ONLINE_MODE: true
```

Für normale Bedrock-Clients sollte `ONLINE_MODE` aktiviert bleiben.

---

### `ENABLE_LAN_VISIBILITY`

Legt fest, ob der Server im lokalen Netzwerk als LAN-Spiel sichtbar sein soll.

Mögliche Werte:

```text
true
false
```

Empfohlen:

```yaml
ENABLE_LAN_VISIBILITY: true
```

Hinweis: LAN-Sichtbarkeit hängt zusätzlich vom Netzwerk, Router, Multicast/Broadcast-Verhalten und Client-Gerät ab.

---

## Ports und IPv6

### `SERVER_PORT`

IPv4-Port des Bedrock Servers.

Typ:

```text
Port
```

Standard:

```yaml
SERVER_PORT: 19132
```

Minecraft Bedrock verwendet UDP.

---

### `SERVER_PORT_V6`

IPv6-Port des Bedrock Servers.

Typ:

```text
Port
```

Standard:

```yaml
SERVER_PORT_V6: 19133
```

---

### `ENABLE_BDS_V6BIND_FIX`

Aktiviert den IPv6-Bind-Fix.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
ENABLE_BDS_V6BIND_FIX: false
```

Wenn aktiviert, können IPv4 und IPv6 denselben Port verwenden.

Beispiel für Dual-Stack mit gleichem Port:

```yaml
SERVER_PORT: 19132
SERVER_PORT_V6: 19132
ENABLE_BDS_V6BIND_FIX: true
```

Empfohlen, wenn Geräte in Dual-Stack-Umgebungen Probleme beim Verbinden haben.

---

## Performance

### `VIEW_DISTANCE`

Sichtweite in Chunks.

Typ:

```text
Ganzzahl
```

Standard:

```yaml
VIEW_DISTANCE: 10
```

Niedriger Wert:

```yaml
VIEW_DISTANCE: 6
```

Höherer Wert:

```yaml
VIEW_DISTANCE: 16
```

Hinweis: Höhere Werte benötigen mehr CPU und RAM.

---

### `TICK_DISTANCE`

Tick-Distanz in Chunks.

Typ:

```text
Ganzzahl
```

Standard:

```yaml
TICK_DISTANCE: 4
```

Empfohlen:

```yaml
TICK_DISTANCE: 4
```

Höhere Werte können Redstone, Farmen und Simulationen in größerem Abstand aktiv halten, erhöhen aber die Last.

---

### `PLAYER_IDLE_TIMEOUT`

Zeit in Minuten, nach der inaktive Spieler gekickt werden.

Typ:

```text
Ganzzahl
```

Beispiel:

```yaml
PLAYER_IDLE_TIMEOUT: 30
```

`0` kann je nach Serverversion bedeuten, dass kein Timeout verwendet wird.

---

### `MAX_THREADS`

Maximale Thread-Anzahl für den Server.

Typ:

```text
Ganzzahl
```

Standard:

```yaml
MAX_THREADS: 2
```

Für kleine private Server:

```yaml
MAX_THREADS: 2
```

Bei leistungsstärkerer Hardware kann ein höherer Wert getestet werden.

---

## Resource Packs und Add-ons

### `TEXTUREPACK_REQUIRED`

Legt fest, ob Spieler Resource Packs zwingend akzeptieren müssen.

Mögliche Werte:

```text
true
false
```

Empfohlen:

```yaml
TEXTUREPACK_REQUIRED: false
```

Wenn `true`, können Spieler nur beitreten, wenn sie die benötigten Resource Packs akzeptieren.

---

### `MC_PACK`

Pfad oder Angabe für ein Minecraft Pack.

Typ:

```text
Text
```

Standard:

```yaml
MC_PACK: ""
```

Beispiel:

```yaml
MC_PACK: "/share/winomc/import/example.mcpack"
```

Wenn nicht verwendet, leer lassen.

---

### `FORCE_WORLD_COPY`

Erzwingt das Kopieren einer Welt.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
FORCE_WORLD_COPY: false
```

Nur aktivieren, wenn eine Welt bewusst erneut kopiert/importiert werden soll.

---

### `FORCE_PACK_COPY`

Erzwingt das Kopieren von Packs.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
FORCE_PACK_COPY: false
```

Nur aktivieren, wenn Packs bewusst erneut kopiert/importiert werden sollen.

---

## Serverautorität und Bewegung

Diese Optionen steuern, wie streng der Server Spielerbewegungen prüft.

### `SERVER_AUTHORITATIVE_MOVEMENT`

Legt fest, wie Bewegungen validiert werden.

Mögliche Werte:

```text
client-auth
server-auth
server-auth-with-rewind
```

Empfohlen:

```yaml
SERVER_AUTHORITATIVE_MOVEMENT: server-auth
```

Bedeutung:

| Wert | Bedeutung |
|---|---|
| `client-auth` | Client ist stärker verantwortlich |
| `server-auth` | Server prüft Bewegungen |
| `server-auth-with-rewind` | Server prüft strenger und kann Bewegungen zurücksetzen |

---

### `SERVER_AUTHORITATIVE_BLOCK_BREAKING`

Legt fest, ob Blockabbau serverautoritativ geprüft wird.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
SERVER_AUTHORITATIVE_BLOCK_BREAKING: false
```

---

### `PLAYER_MOVEMENT_SCORE_THRESHOLD`

Schwellwert für Bewegungsprüfung.

Typ:

```text
Ganzzahl
```

Standard:

```yaml
PLAYER_MOVEMENT_SCORE_THRESHOLD: 20
```

---

### `PLAYER_MOVEMENT_DISTANCE_THRESHOLD`

Distanz-Schwellwert für Bewegungsprüfung.

Typ:

```text
Kommazahl
```

Standard:

```yaml
PLAYER_MOVEMENT_DISTANCE_THRESHOLD: 0.3
```

---

### `PLAYER_MOVEMENT_DURATION_THRESHOLD_IN_MS`

Zeit-Schwellwert für Bewegungsprüfung in Millisekunden.

Typ:

```text
Ganzzahl
```

Standard:

```yaml
PLAYER_MOVEMENT_DURATION_THRESHOLD_IN_MS: 500
```

---

### `CORRECT_PLAYER_MOVEMENT`

Legt fest, ob erkannte Bewegungsabweichungen korrigiert werden.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
CORRECT_PLAYER_MOVEMENT: false
```

Für normale private Server meist:

```yaml
CORRECT_PLAYER_MOVEMENT: false
```

---

## Telemetrie und Content-Logs

### `EMIT_SERVER_TELEMETRY`

Legt fest, ob Server-Telemetrie gesendet wird.

Mögliche Werte:

```text
true
false
```

Empfohlen:

```yaml
EMIT_SERVER_TELEMETRY: false
```

---

### `CONTENT_LOG_FILE_ENABLED`

Aktiviert Content-Logdateien.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
CONTENT_LOG_FILE_ENABLED: false
```

Für Fehlersuche bei Add-ons oder Packs kann aktiviert werden:

```yaml
CONTENT_LOG_FILE_ENABLED: true
```

---

### `CONTENT_LOG_LEVEL`

Legt die Detailstufe der Content-Logs fest.

Mögliche Werte:

```text
verbose
info
warning
error
```

Standard:

```yaml
CONTENT_LOG_LEVEL: info
```

Bedeutung:

| Wert | Bedeutung |
|---|---|
| `verbose` | Sehr ausführlich |
| `info` | Normale Informationen |
| `warning` | Warnungen |
| `error` | Nur Fehler |

---

### `CONTENT_LOG_CONSOLE_OUTPUT_ENABLED`

Gibt Content-Logs zusätzlich in der Konsole aus.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
CONTENT_LOG_CONSOLE_OUTPUT_ENABLED: false
```

Für Fehlersuche:

```yaml
CONTENT_LOG_CONSOLE_OUTPUT_ENABLED: true
```

---

## Chat und Spielerinteraktion

### `CHAT_RESTRICTION`

Legt Chat-Einschränkungen fest.

Mögliche Werte:

```text
None
Dropped
Disabled
```

Standard:

```yaml
CHAT_RESTRICTION: None
```

Bedeutung:

| Wert | Bedeutung |
|---|---|
| `None` | Keine Chat-Einschränkung |
| `Dropped` | Chat-Nachrichten können verworfen werden |
| `Disabled` | Chat deaktiviert |

---

### `DISABLE_PLAYER_INTERACTION`

Deaktiviert Spielerinteraktionen.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
DISABLE_PLAYER_INTERACTION: false
```

Wenn aktiviert, können Spielerinteraktionen eingeschränkt werden.

---

### `DISABLE_PERSONA`

Deaktiviert Persona-/Charakter-Anpassungen.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
DISABLE_PERSONA: false
```

---

### `DISABLE_CUSTOM_SKINS`

Deaktiviert benutzerdefinierte Skins.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
DISABLE_CUSTOM_SKINS: false
```

Für strengere Serverregeln:

```yaml
DISABLE_CUSTOM_SKINS: true
```

---

### `MSA_GAMERTAGS_ONLY`

Beschränkt Namen auf Microsoft-/Xbox-Gamertags.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
MSA_GAMERTAGS_ONLY: false
```

---

## Live Console

### `ENABLE_WEB_CONSOLE`

Aktiviert die WinoMC Live Console in der Home-Assistant-Add-on-Oberfläche.

Mögliche Werte:

```text
true
false
```

Empfohlen:

```yaml
ENABLE_WEB_CONSOLE: true
```

Wenn diese Option aktiv ist, startet das Add-on zusätzlich zur Bedrock-Server-Instanz eine kleine interne Web-Konsole.

Die Konsole wird über Home-Assistant-Ingress geöffnet und ist dadurch direkt in Home Assistant eingebettet.

Über die Live Console können Bedrock-Konsolenbefehle gesendet werden, zum Beispiel:

```text
say Hallo
list
op PlayerName
save hold
save resume
stop
```

Wichtig: Die Live Console ist ein Admin-Werkzeug. Darüber können serverrelevante Befehle ausgeführt werden.

---

### `WINOMC_CONSOLE_HISTORY_LIMIT`

Legt fest, wie viele Log-Zeilen die Live Console beim Öffnen zunächst anzeigen soll.

Typ:

```text
Ganzzahl
```

Empfohlen:

```yaml
WINOMC_CONSOLE_HISTORY_LIMIT: 300
```

Kleinere Werte laden schneller.

Größere Werte zeigen mehr Verlauf an, können die Oberfläche aber unübersichtlicher machen.

Für normale private Server sind Werte zwischen `200` und `500` sinnvoll.

---

## System und Updates

### `TZ`

Zeitzone des Containers.

Typ:

```text
Text
```

Beispiel:

```yaml
TZ: Europe/Berlin
```

Weitere Beispiele:

```yaml
TZ: UTC
```

```yaml
TZ: America/New_York
```

---

### `PACKAGE_BACKUP_KEEP`

Anzahl der Bedrock-Paket-Backups, die behalten werden.

Typ:

```text
Ganzzahl
```

Standard:

```yaml
PACKAGE_BACKUP_KEEP: 2
```

Empfohlen:

```yaml
PACKAGE_BACKUP_KEEP: 2
```

---

### `DOWNLOAD_PROGRESS`

Zeigt beim Download Fortschrittsinformationen an.

Mögliche Werte:

```text
true
false
```

Standard:

```yaml
DOWNLOAD_PROGRESS: false
```

Bei Fehlersuche oder langsamen Downloads:

```yaml
DOWNLOAD_PROGRESS: true
```

---

### `VARIABLES`

Zusätzliche Variablen für fortgeschrittene Konfiguration.

Typ:

```text
Text
```

Standard:

```yaml
VARIABLES: ""
```

Nur verwenden, wenn genau bekannt ist, welche zusätzlichen Variablen benötigt werden.

---

# WinoMC Live Console

Die WinoMC Live Console ist die empfohlene Methode, um Befehle direkt an den laufenden Bedrock Server zu senden.

Die Oberfläche ist über den Home-Assistant-Ingress des Add-ons erreichbar.

Voraussetzung:

```yaml
ENABLE_WEB_CONSOLE: true
```

Nach dem Start des Add-ons kann die Konsole über die Add-on-Oberfläche geöffnet werden.

Die Live Console bietet:

- Eingabefeld für Bedrock-Konsolenbefehle
- Live-Ausgabe der letzten Server- und Konsolenmeldungen
- Schnellbefehle für häufige Aktionen
- Befehlsübergabe an die interne WinoMC-FIFO-Konsole

Beispiele für Befehle in der Live Console:

```text
say Hallo zusammen
list
op PlayerName
deop PlayerName
save hold
save query
save resume
stop
```

Befehle werden ohne führenden Slash eingegeben.

Richtig:

```text
say hello
```

Nicht nötig:

```text
/say hello
```

Falls versehentlich ein führender Slash eingegeben wird, sollte der Befehl trotzdem entfernt beziehungsweise normalisiert werden.

---

# Konsolenbefehle über Home-Assistant-Automationen

Zusätzlich zur Live Console unterstützt das Add-on weiterhin STDIN.

Dadurch können Bedrock-Konsolenbefehle über Home Assistant Automationen, Skripte oder Blueprints gesendet werden.

Beispiel:

```yaml
action: hassio.app_stdin
data:
  app: <vollständiger_addon_slug>
  input:
    command: "say hello"
```

Der vollständige Add-on-Slug steht in der Add-on-URL.

Beispiel-URL:

```text
/config/app/repositoryid_winomc-bedrock/info
```

Der zu verwendende Slug wäre dann:

```text
repositoryid_winomc-bedrock
```

Wichtig: Zwischen Repository-ID und Add-on-Slug steht ein Unterstrich `_`.

---

## Beispiele für Automations-Konsolenbefehle

Nachricht an alle Spieler:

```yaml
action: hassio.app_stdin
data:
  app: <vollständiger_addon_slug>
  input:
    command: "say Server startet gleich neu"
```

Spieler zum Operator machen:

```yaml
action: hassio.app_stdin
data:
  app: <vollständiger_addon_slug>
  input:
    command: "op PlayerName"
```

Server speichern:

```yaml
action: hassio.app_stdin
data:
  app: <vollständiger_addon_slug>
  input:
    command: "save hold"
```

Server stoppen:

```yaml
action: hassio.app_stdin
data:
  app: <vollständiger_addon_slug>
  input:
    command: "stop"
```

---

# Geplanter Neustart

Da bei `VERSION: LATEST` beim Start nach der aktuellen Bedrock-Version gesucht wird, ist ein geplanter Neustart sinnvoll.

Beispiel-Ablauf:

```text
04:00 Uhr Bedrock Server Neustart
04:01 Uhr optional Friend Broadcast Neustart
```

Für einen Neustart wird verwendet:

```yaml
action: hassio.app_restart
data:
  app: <vollständiger_addon_slug>
```

---

# Backup

Das Add-on unterstützt Cold Backup.

Einige automatisch heruntergeladene oder generierte Dateien werden vom Backup ausgeschlossen, zum Beispiel:

```text
bedrock_server*
behavior_packs/vanilla*
behavior_packs/chemistry*
resource_packs/vanilla*
resource_packs/chemistry*
```

Dadurch bleiben Backups kleiner und konzentrieren sich auf relevante Serverdaten.

---

# Import und Export

Das Add-on erstellt, falls verfügbar:

```text
/share/winomc/import
/share/winomc/export
```

Diese Ordner können verwendet werden, um Welten, Packs oder andere Dateien leichter zwischen Home Assistant und dem Add-on auszutauschen.

---

# Fehlerbehebung

## Server erscheint nicht als LAN-Spiel

Prüfen:

- `ENABLE_LAN_VISIBILITY: true`
- Client und Home Assistant im selben Netzwerk
- Keine WLAN-Isolation aktiviert
- Router blockiert keine Broadcast-/Multicast-Pakete
- Bedrock-Port ist UDP, nicht TCP
- Auf Konsolen kann die LAN-Sichtbarkeit je nach Plattform eingeschränkt sein

Alternative:

Server manuell im Minecraft-Client hinzufügen.

---

## Verbindung nicht möglich

Prüfen:

- Läuft das Add-on?
- Stimmt `SERVER_PORT`?
- Wird UDP verwendet?
- Ist `ONLINE_MODE` passend gesetzt?
- Ist die Allowlist aktiv?
- Ist der Spieler in `ALLOW_LIST_USERS` eingetragen?
- Blockiert eine Firewall den Port?

---

## Spieler können nicht beitreten

Prüfen:

```yaml
ALLOW_LIST: false
```

oder bei aktiver Allowlist:

```yaml
ALLOW_LIST: true
ALLOW_LIST_USERS: "PlayerName:XUID"
```

Außerdem prüfen:

```yaml
ONLINE_MODE: true
```

---

## Resource Pack wird nicht geladen

Prüfen:

- Pack liegt im richtigen Verzeichnis
- `TEXTUREPACK_REQUIRED` ist passend gesetzt
- Pack ist mit der verwendeten Minecraft-Version kompatibel
- Content-Logs für Fehlersuche aktivieren

Debug-Werte:

```yaml
CONTENT_LOG_FILE_ENABLED: true
CONTENT_LOG_LEVEL: info
CONTENT_LOG_CONSOLE_OUTPUT_ENABLED: true
```

---

## Live Console meldet `Leerer Befehl`

Wenn beim Senden eines Befehls in der Live Console folgende Meldung erscheint:

```text
Fehler: Leerer Befehl.
```

dann wurde der eingegebene Befehl nicht korrekt an das interne Console-Backend übergeben.

Prüfen:

- Add-on ist auf eine Version mit Live-Console-Fix aktualisiert
- Browser-Cache wurde nach dem Update neu geladen
- Add-on wurde nach dem Update vollständig neu gestartet
- `ENABLE_WEB_CONSOLE: true` ist gesetzt
- Der Befehl enthält sichtbaren Text, zum Beispiel `say hello`

Empfohlene Maßnahme:

1. Add-on stoppen.
2. Add-on neu bauen oder aktualisieren.
3. Add-on starten.
4. Home-Assistant-Seite hart neu laden.
5. Befehl erneut testen.

Testbefehl:

```text
say hello
```

---

## Server aktualisiert nicht

Prüfen:

```yaml
VERSION: LATEST
```

Dann Add-on neu starten.

Bei konkreter Version:

```yaml
VERSION: "1.21.93.1"
```

wird genau diese Version verwendet, soweit verfügbar.

---

## IPv6- oder Dual-Stack-Probleme

Wenn Clients Probleme mit IPv4/IPv6 haben, kann getestet werden:

```yaml
SERVER_PORT: 19132
SERVER_PORT_V6: 19132
ENABLE_BDS_V6BIND_FIX: true
```

Wenn das nicht benötigt wird:

```yaml
SERVER_PORT: 19132
SERVER_PORT_V6: 19133
ENABLE_BDS_V6BIND_FIX: false
```

---

# Sicherheitshinweise

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

# Empfohlene Werte für private Server

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
ENABLE_BDS_V6BIND_FIX: false
DOWNLOAD_PROGRESS: false
CONTENT_LOG_LEVEL: info
CHAT_RESTRICTION: None
DISABLE_CUSTOM_SKINS: false
ENABLE_WEB_CONSOLE: true
WINOMC_CONSOLE_HISTORY_LIMIT: 300
```

---

# Bekannte Hinweise

- Minecraft Bedrock nutzt UDP.
- Ein Add-on-Neustart kann bei `VERSION: LATEST` auch ein Bedrock-Server-Update auslösen.
- LAN-Sichtbarkeit ist abhängig vom Netzwerk und vom Client-Gerät.
- Konsolenbefehle gehören zum Bedrock Server Add-on, nicht zum Friend Broadcast Add-on.
- Die Live Console ist ein Admin-Werkzeug und sollte nur von vertrauenswürdigen Home-Assistant-Benutzern verwendet werden.
- Friend Broadcast kann ergänzend genutzt werden, damit Konsolen den Server über Freunde/Xbox Live leichter finden.

---

# Credits

Dieses Add-on ist Teil des WinoMC Home Assistant Add-on-Repositories.

Technische Grundlage ist das Minecraft Bedrock Server Container-Image von itzg.

---

# Lizenz

Bitte beachte die Lizenzinformationen des Repositories sowie die Lizenzbedingungen der verwendeten Drittprojekte.