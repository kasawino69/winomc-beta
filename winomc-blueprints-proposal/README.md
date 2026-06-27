# [BETA] WinoMC Blueprints

Dieses Verzeichnis enthält Home-Assistant-Blueprints für die WinoMC Add-ons.

Die Blueprints helfen dabei, den **WinoMC Bedrock Server** und **WinoMC Friend Broadcast** automatisch zu steuern, regelmäßig neu zu starten, Konsolenbefehle auszuführen, Updates zu behandeln und bei Fehlern wiederherzustellen.

---

## Enthaltene Blueprints

Aktuell enthalten:

```text
blueprints/
  automation/
    winomc/
      addon_auto_update_restart.yaml
      bedrock_command_scheduler.yaml
      bedrock_scheduled_restart.yaml
      friend_broadcast_scheduled_restart.yaml
      winomc_friend_error_stack_restart.yaml
      winomc_running_watchdog.yaml
```

---

## Voraussetzungen

Für die Blueprints werden folgende WinoMC Add-ons empfohlen:

- WinoMC Bedrock Server
- WinoMC Friend Broadcast

Zusätzlich wird der Home-Assistant-Supervisor benötigt, da die Blueprints Supervisor-Aktionen verwenden.

Verwendete Home-Assistant-Aktionen:

```yaml
hassio.app_start
hassio.app_restart
hassio.app_stdin
update.install
```

---

## Wichtiger Hinweis zum Add-on-Slug

Viele Blueprints benötigen den **vollständigen Supervisor-Add-on-Slug**.

Dieser Slug ist meistens nicht nur:

```text
winomc-bedrock
```

sondern zum Beispiel:

```text
repositoryid_winomc-bedrock
```

oder:

```text
repositoryid_winomc-friend-broadcast
```

Den richtigen Slug findest du in Home Assistant in der URL der Add-on-Seite.

Beispiel-URL für Bedrock:

```text
/config/app/repositoryid_winomc-bedrock/info
```

Der einzutragende Slug ist dann:

```text
repositoryid_winomc-bedrock
```

Beispiel-URL für Friend Broadcast:

```text
/config/app/repositoryid_winomc-friend-broadcast/info
```

Der einzutragende Slug ist dann:

```text
repositoryid_winomc-friend-broadcast
```

Wichtig: Zwischen Repository-ID und Add-on-Slug steht ein Unterstrich `_`, kein Bindestrich `-`.

Richtig:

```text
repositoryid_winomc-bedrock
```

Falsch:

```text
repositoryid-winomc-bedrock
```

---

## Bedrock Add-on vorbereiten

Damit Blueprints für Bedrock-Konsolenbefehle funktionieren, muss das Bedrock Add-on STDIN unterstützen.

In der Datei:

```text
winomc-server-bedrock/config.yaml
```

muss auf Hauptebene stehen:

```yaml
stdin: true
```

Beispiel:

```yaml
slug: winomc-bedrock
init: false
boot: auto
startup: services
stdin: true
arch:
  - amd64
  - aarch64
```

Zusätzlich muss der Entry-Point des Bedrock Add-ons Home-Assistant-STDIN lesen und an die Bedrock-Konsole weitergeben.

Wenn im Add-on-Protokoll beim Start eine Meldung wie diese erscheint, ist die STDIN-Bridge aktiv:

```text
WinoMC STDIN bridge active
```

Oder beim Senden eines Befehls:

```text
WinoMC STDIN raw input
WinoMC STDIN command received
```

---

## Friend Broadcast vorbereiten

Friend Broadcast benötigt für Neustarts kein STDIN.

Wenn versucht wird, Friend Broadcast per `hassio.app_stdin` zu steuern, erscheint ein Fehler wie:

```text
App ... does not support writing to stdin
```

Das ist normal.

Friend Broadcast wird über diese Aktionen gesteuert:

```yaml
hassio.app_start
hassio.app_restart
```

Für Health-Events aus Friend Broadcast sollte in der Datei:

```text
winomc-friend-broadcast/config.yaml
```

auf Hauptebene stehen:

```yaml
homeassistant_api: true
```

Empfohlen zusätzlich:

```yaml
boot: auto
startup: application
homeassistant_api: true
```

Wenn Friend Broadcast Home Assistant bei Fehlern informieren soll, muss das Add-on ein Event vom Typ `winomc_addon_health` senden.

---

# Blueprint: Add-ons automatisch updaten und neu starten

Datei:

```text
blueprints/automation/winomc/addon_auto_update_restart.yaml
```

## Zweck

Prüft täglich zu einer gewünschten Uhrzeit die Update-Entities der WinoMC Add-ons.

Wenn ein Update verfügbar ist, wird `update.install` ausgeführt. Danach werden die Add-ons kontrolliert neu gestartet.

Dieser Blueprint ist für Nutzer gedacht, die Updates direkt über Home Assistant automatisieren möchten.

---

## Wichtig

Dieser Blueprint installiert Updates über Home Assistant.

Wenn keine automatischen Add-on-Updates gewünscht sind, sondern nur ein geplanter Neustart, nutze stattdessen:

```text
bedrock_scheduled_restart.yaml
friend_broadcast_scheduled_restart.yaml
```

---

## Home-Assistant-UI-Einstellungen

### Update-Zeitfenster

Die Uhrzeit, zu der Home Assistant täglich auf verfügbare Updates prüfen und diese installieren soll.

Standard:

```text
04:30:00
```

Empfehlung:

Ein Zeitpunkt, an dem normalerweise niemand auf dem Server spielt.

---

### Bedrock Update-Entity

Die Update-Entity des WinoMC Bedrock Server Add-ons.

Beispiel:

```text
update.winomc_bedrock_server_update
```

Der genaue Name kann je nach Home-Assistant-Installation abweichen.

Du findest die Entity unter:

```text
Einstellungen → Geräte & Dienste → Entitäten
```

Dort nach `WinoMC`, `Bedrock` oder `Update` suchen.

---

### Friend Broadcast Update-Entity

Die Update-Entity des WinoMC Friend Broadcast Add-ons.

Beispiel:

```text
update.winomc_friend_broadcast_update
```

Der genaue Name kann je nach Home-Assistant-Installation abweichen.

---

### Bedrock App-Slug

Der Add-on-Slug des Bedrock Add-ons.

Im Blueprint steht als Standard:

```text
winomc-bedrock
```

In Home Assistant wird aber meistens der vollständige Supervisor-Slug benötigt.

Beispiel:

```text
repositoryid_winomc-bedrock
```

Empfehlung:

Immer den vollständigen Slug aus der Add-on-URL verwenden.

---

### Friend Broadcast App-Slug

Der Add-on-Slug des Friend Broadcast Add-ons.

Im Blueprint steht als Standard:

```text
winomc-friend-broadcast
```

In Home Assistant wird aber meistens der vollständige Supervisor-Slug benötigt.

Beispiel:

```text
repositoryid_winomc-friend-broadcast
```

Empfehlung:

Immer den vollständigen Slug aus der Add-on-URL verwenden.

---

### Bedrock aktualisieren

Legt fest, ob das Bedrock Add-on automatisch aktualisiert werden soll.

Mögliche Werte:

```text
true
false
```

Standard:

```text
true
```

Wenn deaktiviert, wird Bedrock nicht automatisch über diesen Blueprint aktualisiert.

---

### Friend Broadcast aktualisieren

Legt fest, ob das Friend Broadcast Add-on automatisch aktualisiert werden soll.

Mögliche Werte:

```text
true
false
```

Standard:

```text
true
```

Wenn deaktiviert, wird Friend Broadcast nicht automatisch über diesen Blueprint aktualisiert.

---

### Backup vor Update anfordern

Legt fest, ob bei `update.install` ein Backup angefordert werden soll.

Mögliche Werte:

```text
true
false
```

Standard:

```text
true
```

Empfohlen:

```text
true
```

---

### Wartezeit vor Neustart

Kleine Pause nach `update.install`, bevor das Add-on neu gestartet wird.

Standard:

```text
30 Sekunden
```

Sinnvolle Werte:

```text
30 Sekunden
60 Sekunden
120 Sekunden
```

---

### Friend Broadcast nach Bedrock ebenfalls neu starten

Legt fest, ob Friend Broadcast nach einem Bedrock-Update beziehungsweise Bedrock-Neustart ebenfalls neu gestartet werden soll.

Mögliche Werte:

```text
true
false
```

Standard:

```text
true
```

Empfohlen:

```text
true
```

Warum?

Friend Broadcast fragt den Bedrock Server ab. Nach einem Bedrock-Neustart ist es sinnvoll, Friend Broadcast ebenfalls neu zu starten, damit die Verbindung sauber neu aufgebaut wird.

---

## Beispiel-Konfiguration

```text
Update-Zeitfenster: 04:30:00
Bedrock Update-Entity: update.winomc_bedrock_server_update
Friend Broadcast Update-Entity: update.winomc_friend_broadcast_update
Bedrock App-Slug: repositoryid_winomc-bedrock
Friend Broadcast App-Slug: repositoryid_winomc-friend-broadcast
Bedrock aktualisieren: true
Friend Broadcast aktualisieren: true
Backup vor Update anfordern: true
Wartezeit vor Neustart: 30 Sekunden
Friend Broadcast nach Bedrock ebenfalls neu starten: true
```

---

# Blueprint: Bedrock geplanter Konsolenbefehl

Datei:

```text
blueprints/automation/winomc/bedrock_command_scheduler.yaml
```

## Zweck

Führt zu einer festen Uhrzeit einen Bedrock-Konsolenbefehl über die Home-Assistant-Supervisor-Aktion `hassio.app_stdin` aus.

Beispiele:

```text
say hello
say Server startet gleich neu
op PlayerName
save hold
stop
```

---

## Voraussetzungen

Das WinoMC Bedrock Add-on muss STDIN unterstützen.

In der Bedrock Add-on-Konfiguration muss stehen:

```yaml
stdin: true
```

Zusätzlich muss der Entry-Point des Bedrock Add-ons die übergebenen Befehle an die Bedrock-Konsole weitergeben.

---

## Home-Assistant-UI-Einstellungen

### Bedrock App-Slug

Der vollständige Supervisor-Slug des Bedrock Add-ons.

Im Blueprint steht als Standard:

```text
winomc-bedrock
```

In vielen Installationen muss aber der vollständige Slug verwendet werden.

Beispiel:

```text
repositoryid_winomc-bedrock
```

Den Wert findest du in der Add-on-URL.

---

### Uhrzeit

Der Zeitpunkt, zu dem der Befehl täglich ausgeführt werden soll.

Standard:

```text
06:00:00
```

Beispiel:

```text
06:00:00
```

---

### Konsolenbefehl

Der Bedrock-Serverbefehl ohne führenden Slash.

Standard:

```text
say hello
```

Richtig:

```text
say hello
```

Falsch:

```text
/say hello
```

---

## Beispiel-Konfiguration

```text
Bedrock App-Slug: repositoryid_winomc-bedrock
Uhrzeit: 06:00:00
Konsolenbefehl: say hello
```

---

## Beispiel-Aktion

```yaml
action: hassio.app_stdin
data:
  app: repositoryid_winomc-bedrock
  input:
    command: "say hello"
```

---

# Blueprint: Bedrock geplanter Neustart

Datei:

```text
blueprints/automation/winomc/bedrock_scheduled_restart.yaml
```

## Zweck

Startet gezielt nur das WinoMC Bedrock Server Add-on neu.

Es werden keine Home-Assistant-Updates installiert und keine anderen Add-ons aktualisiert.

Dieser Blueprint ist sinnvoll, wenn der Bedrock Server beim Start selbst seine Version oder das Docker-Image prüft.

---

## Home-Assistant-UI-Einstellungen

### Bedrock Add-on Slug

Der Supervisor-Slug des Bedrock Add-ons.

Im Blueprint steht als Standard:

```text
winomc-bedrock
```

In Home Assistant wird aber meistens der vollständige Slug benötigt.

Beispiel:

```text
repositoryid_winomc-bedrock
```

Den Wert findest du in der Add-on-URL.

---

### Neustartzeit

Zeitpunkt für den täglichen Neustart.

Standard:

```text
04:00:00
```

Empfohlen:

```text
04:00:00
```

Wähle am besten eine Zeit, zu der normalerweise niemand spielt.

---

### Befehl vor Neustart

Optionaler Minecraft-Konsolenbefehl vor dem Neustart.

Standard:

```text
say Server startet in 30 Sekunden neu
```

Beispiele:

```text
say Server startet in 30 Sekunden neu
say Wartung startet gleich
save hold
```

Wenn kein Befehl vor dem Neustart gesendet werden soll, das Feld leer lassen.

---

### Wartezeit nach Vorab-Befehl

Sekunden zwischen Vorab-Befehl und Neustart.

Standard:

```text
30
```

Mögliche Werte laut Blueprint:

```text
0 bis 300 Sekunden
```

Empfohlen:

```text
30
```

---

## Beispiel-Konfiguration

```text
Bedrock Add-on Slug: repositoryid_winomc-bedrock
Neustartzeit: 04:00:00
Befehl vor Neustart: say Server startet in 30 Sekunden neu
Wartezeit nach Vorab-Befehl: 30
```

---

## Beispiel-Ablauf

```text
04:00:00 → say Server startet in 30 Sekunden neu
04:00:30 → Bedrock Add-on wird neu gestartet
```

---

# Blueprint: Friend Broadcast geplanter Neustart

Datei:

```text
blueprints/automation/winomc/friend_broadcast_scheduled_restart.yaml
```

## Zweck

Startet das WinoMC Friend Broadcast Add-on zu einer festgelegten Uhrzeit neu.

Es wird kein STDIN verwendet und es werden keine Updates installiert.

---

## Wichtig

Friend Broadcast unterstützt keine STDIN-Kommandos.

Nicht verwenden:

```yaml
action: hassio.app_stdin
```

Für Friend Broadcast verwenden:

```yaml
action: hassio.app_restart
```

---

## Home-Assistant-UI-Einstellungen

### Vollständiger Friend Broadcast Add-on Slug

Der vollständige Supervisor-Slug aus der Add-on-URL.

Beispiel:

```text
repositoryid_winomc-friend-broadcast
```

Wichtig: Zwischen Repository-ID und Add-on-Slug steht ein Unterstrich `_`.

---

### Neustartzeit

Uhrzeit, zu der Friend Broadcast täglich neu gestartet wird.

Standard:

```text
04:10:00
```

Empfohlen, wenn Bedrock vorher neu startet:

```text
04:10:00
```

Oder abhängig vom Bedrock-Start:

```text
04:02:00
04:05:00
04:10:00
```

---

## Beispiel-Konfiguration

```text
Vollständiger Friend Broadcast Add-on Slug: repositoryid_winomc-friend-broadcast
Neustartzeit: 04:10:00
```

---

## Beispiel-Aktion

```yaml
action: hassio.app_restart
data:
  app: repositoryid_winomc-friend-broadcast
```

---

# Blueprint: WinoMC Friend Fehler Stack Neustart

Datei:

```text
blueprints/automation/winomc/winomc_friend_error_stack_restart.yaml
```

## Zweck

Reagiert auf Health-Events aus WinoMC Friend Broadcast.

Wenn Friend Broadcast meldet, dass Bedrock nicht erreichbar ist, wird zuerst Bedrock und danach Friend Broadcast neu gestartet.

Typischer Fehler:

```text
Failed to ping server, falling back to config values
```

---

## Voraussetzungen

Friend Broadcast muss Home-Assistant-Events senden können.

In der Datei:

```text
winomc-friend-broadcast/config.yaml
```

sollte stehen:

```yaml
homeassistant_api: true
```

Das Friend-Broadcast-Startscript muss bei Fehlern ein Event senden.

Event-Typ:

```text
winomc_addon_health
```

Erwartete Event-Daten:

```json
{
  "addon": "friend-broadcast",
  "reason": "bedrock_unreachable",
  "message": "Failed to ping server, falling back to config values"
}
```

Nur wenn `addon` und `reason` zu diesen Werten passen, löst der Blueprint aus.

---

## Home-Assistant-UI-Einstellungen

### Vollständiger Bedrock Add-on Slug

Der vollständige Supervisor-Slug des Bedrock Add-ons.

Beispiel:

```text
repositoryid_winomc-bedrock
```

---

### Vollständiger Friend Broadcast Add-on Slug

Der vollständige Supervisor-Slug des Friend Broadcast Add-ons.

Beispiel:

```text
repositoryid_winomc-friend-broadcast
```

---

### Wartezeit nach Bedrock-Neustart

Zeit in Sekunden, die nach dem Bedrock-Neustart gewartet wird, bevor Friend Broadcast neu gestartet wird.

Standard:

```text
90
```

Mögliche Werte laut Blueprint:

```text
10 bis 600 Sekunden
```

Empfohlen:

```text
90
```

Sinnvolle Werte:

```text
60
90
120
180
```

Wenn Bedrock beim Start Updates lädt oder auf langsamer Hardware läuft, sollte ein höherer Wert genutzt werden.

---

### Cooldown nach Neustart

Zeit in Minuten, in der nach einem ausgelösten Stack-Neustart keine weitere Neustart-Schleife ausgeführt werden soll.

Standard:

```text
10
```

Mögliche Werte laut Blueprint:

```text
1 bis 60 Minuten
```

Empfohlen:

```text
10
```

Sinnvolle Werte:

```text
5
10
15
30
```

Der Cooldown verhindert Neustart-Schleifen, falls Friend Broadcast denselben Fehler mehrfach hintereinander meldet.

---

## Beispiel-Konfiguration

```text
Vollständiger Bedrock Add-on Slug: repositoryid_winomc-bedrock
Vollständiger Friend Broadcast Add-on Slug: repositoryid_winomc-friend-broadcast
Wartezeit nach Bedrock-Neustart: 90
Cooldown nach Neustart: 10
```

---

## Verhalten

Wenn Friend Broadcast dieses Event sendet:

```json
{
  "addon": "friend-broadcast",
  "reason": "bedrock_unreachable"
}
```

führt Home Assistant aus:

```text
1. Bedrock Add-on neu starten
2. Wartezeit abwarten
3. Friend Broadcast Add-on neu starten
4. Cooldown abwarten
```

---

# Blueprint: WinoMC Add-on Running Watchdog

Datei:

```text
blueprints/automation/winomc/winomc_running_watchdog.yaml
```

## Zweck

Überwacht, ob WinoMC Bedrock und WinoMC Friend Broadcast laufen.

Wenn eines der Add-ons gestoppt ist, wird es automatisch wieder gestartet.

Dieser Blueprint schützt gegen:

- Add-on versehentlich gestoppt
- Add-on nach Neustart nicht gestartet
- Add-on durch Fehler beendet
- Friend Broadcast läuft nicht mehr
- Bedrock Server läuft nicht mehr

---

## Voraussetzungen

Die Running-Sensoren der Add-ons müssen in Home Assistant aktiviert sein.

Gehe zu:

```text
Einstellungen → Geräte & Dienste → Home Assistant Supervisor
```

Dann die Add-on-Geräte suchen:

```text
WinoMC Bedrock Server
WinoMC Friend Broadcast
```

Dort jeweils den Sensor aktivieren, der ungefähr so heißt:

```text
Running
```

Danach stehen Binary-Sensoren zur Verfügung.

Beispiele:

```text
binary_sensor.winomc_bedrock_server_running
binary_sensor.winomc_friend_broadcast_running
```

Die genauen Entity-Namen können je nach Installation abweichen.

---

## Home-Assistant-UI-Einstellungen

### Vollständiger Bedrock Add-on Slug

Der vollständige Supervisor-Slug des Bedrock Add-ons.

Beispiel:

```text
repositoryid_winomc-bedrock
```

---

### Vollständiger Friend Broadcast Add-on Slug

Der vollständige Supervisor-Slug des Friend Broadcast Add-ons.

Beispiel:

```text
repositoryid_winomc-friend-broadcast
```

---

### Bedrock Running Binary Sensor

Der vom Home Assistant Supervisor bereitgestellte Running-Sensor für das Bedrock Add-on.

Beispiel:

```text
binary_sensor.winomc_bedrock_server_running
```

Der Sensor sollte `on` sein, wenn das Add-on läuft.

---

### Friend Broadcast Running Binary Sensor

Der vom Home Assistant Supervisor bereitgestellte Running-Sensor für das Friend Broadcast Add-on.

Beispiel:

```text
binary_sensor.winomc_friend_broadcast_running
```

Der Sensor sollte `on` sein, wenn das Add-on läuft.

---

### Prüfintervall

Alle wie viele Minuten geprüft werden soll.

Standard:

```text
1
```

Mögliche Werte laut Blueprint:

```text
1 bis 30 Minuten
```

Empfohlen:

```text
1
```

Hinweis:

Der Blueprint hat zusätzlich State-Trigger, die reagieren, wenn ein Running-Sensor für 1 Minute auf `off` steht.

---

### Wartezeit vor Friend-Start

Zeit in Sekunden, die nach einem Bedrock-Start gewartet wird, bevor Friend Broadcast gestartet wird.

Standard:

```text
90
```

Mögliche Werte laut Blueprint:

```text
10 bis 600 Sekunden
```

Empfohlen:

```text
90
```

Sinnvolle Werte:

```text
60
90
120
180
```

---

## Beispiel-Konfiguration

```text
Vollständiger Bedrock Add-on Slug: repositoryid_winomc-bedrock
Vollständiger Friend Broadcast Add-on Slug: repositoryid_winomc-friend-broadcast
Bedrock Running Binary Sensor: binary_sensor.winomc_bedrock_server_running
Friend Broadcast Running Binary Sensor: binary_sensor.winomc_friend_broadcast_running
Prüfintervall: 1
Wartezeit vor Friend-Start: 90
```

---

## Verhalten

Wenn Bedrock nicht läuft:

```text
Bedrock Running Sensor = off
→ Home Assistant startet Bedrock
→ Home Assistant wartet
→ Home Assistant startet Friend Broadcast, falls nötig
```

Wenn Friend Broadcast nicht läuft:

```text
Friend Broadcast Running Sensor = off
→ Home Assistant startet Friend Broadcast
```

---

# Empfohlene Kombination

Für einen stabilen WinoMC-Betrieb werden diese Automationen empfohlen:

## 1. Bedrock geplanter Neustart

Blueprint:

```text
bedrock_scheduled_restart.yaml
```

Empfohlene Einstellungen:

```text
Neustartzeit: 04:00:00
Befehl vor Neustart: say Server startet in 30 Sekunden neu
Wartezeit nach Vorab-Befehl: 30
```

---

## 2. Friend Broadcast geplanter Neustart

Blueprint:

```text
friend_broadcast_scheduled_restart.yaml
```

Empfohlene Einstellungen:

```text
Neustartzeit: 04:10:00
```

Damit startet Friend Broadcast nach dem Bedrock-Neustart neu.

---

## 3. Running Watchdog

Blueprint:

```text
winomc_running_watchdog.yaml
```

Empfohlene Einstellungen:

```text
Prüfintervall: 1
Wartezeit vor Friend-Start: 90
```

---

## 4. Friend Fehler Stack Neustart

Blueprint:

```text
winomc_friend_error_stack_restart.yaml
```

Empfohlene Einstellungen:

```text
Wartezeit nach Bedrock-Neustart: 90
Cooldown nach Neustart: 10
```

---

## 5. Optional: Geplante Bedrock-Kommandos

Blueprint:

```text
bedrock_command_scheduler.yaml
```

Beispiel:

```text
Uhrzeit: 06:00:00
Konsolenbefehl: say hello
```

---

## 6. Optional: Automatische Add-on-Updates

Blueprint:

```text
addon_auto_update_restart.yaml
```

Nur verwenden, wenn automatische Updates wirklich gewünscht sind.

Wenn keine automatischen Updates gewünscht sind, stattdessen geplante Neustarts verwenden.

---

# Empfohlene Zeitplanung

Beispiel für private Server:

```text
04:00:00 → Bedrock geplanter Neustart
04:10:00 → Friend Broadcast geplanter Neustart
06:00:00 → Optionaler Konsolenbefehl, z. B. say hello
ganztägig → Running Watchdog aktiv
ganztägig → Friend Fehler Stack Neustart aktiv
```

---

# Fehlerbehebung

## Fehler: App does not exist

Beispiel:

```text
App repositoryid-winomec-bedrock does not exist
```

Prüfen:

- Wurde der vollständige Add-on-Slug verwendet?
- Wurde ein Unterstrich `_` zwischen Repository-ID und Add-on-Slug verwendet?
- Wurde versehentlich ein Bindestrich `-` verwendet?
- Stimmt der Slug exakt mit der Add-on-URL überein?

Richtig:

```text
repositoryid_winomc-bedrock
```

Falsch:

```text
repositoryid-winomc-bedrock
```

---

## Fehler: App does not support writing to stdin

Beispiel:

```text
App repositoryid_winomc-friend-broadcast does not support writing to stdin
```

Das ist bei Friend Broadcast normal.

Friend Broadcast unterstützt keine Konsolenbefehle per STDIN.

Für Friend Broadcast verwenden:

```yaml
action: hassio.app_restart
data:
  app: repositoryid_winomc-friend-broadcast
```

Nicht verwenden:

```yaml
action: hassio.app_stdin
```

---

## Bedrock-Befehl kommt nicht im Spiel an

Prüfen:

- Ist `stdin: true` im Bedrock Add-on gesetzt?
- Läuft der aktuelle Bedrock-Entry-Point mit STDIN-Bridge?
- Wird der richtige vollständige Add-on-Slug verwendet?
- Erscheint im Add-on-Protokoll `WinoMC STDIN raw input`?
- Erscheint im Add-on-Protokoll `WinoMC STDIN command received`?

Wenn diese Logzeilen erscheinen, kommt der Befehl im Add-on an.

Wenn im Spiel nichts passiert, liegt das Problem danach bei der Übergabe an die Bedrock-Konsole.

---

## Friend meldet Bedrock nicht erreichbar

Typische Meldung:

```text
Failed to ping server, falling back to config values
```

Prüfen:

- Läuft Bedrock?
- Stimmt die Ziel-IP in Friend Broadcast?
- Stimmt der Bedrock-Port?
- Nutzt Bedrock UDP-Port `19132`?
- Ist `QUERY_SERVER` in Friend Broadcast aktiv?
- Ist `CONFIG_FALLBACK` aktiv?
- Startet Friend Broadcast eventuell zu früh nach Bedrock?

Empfehlung:

```text
Friend Broadcast erst 60 bis 180 Sekunden nach Bedrock starten.
```

---

## Running-Sensoren fehlen

Wenn die Running-Sensoren nicht auswählbar sind:

1. Home Assistant Supervisor Integration öffnen.
2. Add-on-Geräte suchen.
3. Deaktivierte Entitäten anzeigen.
4. Running-Sensoren aktivieren.
5. Automation neu erstellen oder bearbeiten.

---

# Hinweise

- Bedrock nutzt UDP.
- Friend Broadcast braucht kein STDIN.
- Bedrock-Kommandos werden nur an das Bedrock Add-on gesendet.
- Neustarts werden über `hassio.app_restart` ausgeführt.
- Automatisches Starten wird über `hassio.app_start` ausgeführt.
- Der vollständige Supervisor-Slug ist in der Add-on-URL sichtbar.
- Zwischen Repository-ID und Add-on-Slug steht ein Unterstrich `_`.
- Automatische Updates sollten nur aktiviert werden, wenn das ausdrücklich gewünscht ist.

---

# Lizenz

Bitte beachte die Lizenzinformationen des Repositories und der verwendeten Drittprojekte.