# [BETA] WinoMC Friend Broadcast

Das **[BETA] WinoMC Friend Broadcast Add-on** zeigt deinen [BETA] WinoMC Bedrock Server über Xbox Live beziehungsweise die Freunde-Liste an.

Damit können Spieler den Server einfacher finden, besonders wenn die normale LAN-Anzeige auf Konsolen wie Nintendo Switch, Xbox oder mobilen Geräten nicht zuverlässig funktioniert.

Das Add-on ist als Ergänzung zum **[BETA] WinoMC Bedrock Server** gedacht.

---

## Funktionen

* Macht den Bedrock Server über Xbox Live/Freunde sichtbar
* Nutzt einen separaten Microsoft/Xbox-Account als Broadcast-Account
* Kann den echten Bedrock Server abfragen
* Kann bei nicht erreichbarem Server auf konfigurierte Werte zurückfallen
* Kann Freunde automatisch hinzufügen oder entfernen
* Speichert Login- und Konfigurationsdaten persistent im Add-on-Konfigurationsverzeichnis
* Unterstützt Home-Assistant-Backups über Cold Backup

---

## Voraussetzungen

Du brauchst:

* Einen laufenden Minecraft Bedrock Server
* Einen separaten Microsoft/Xbox-Account für Friend Broadcast
* Einen Bedrock-Server-Port, meistens `19132`
* Spieler müssen den Broadcast-Account als Freund hinzufügen oder vom Broadcast-Account eingeladen werden

Empfohlen:

* [BETA] WinoMC Bedrock Server läuft auf demselben Home-Assistant-System
* Friend Broadcast und Bedrock Server laufen beide im Host-Netzwerk
* Der Broadcast-Account ist **nicht** dein Hauptaccount

---

## Installation

1. Öffne Home Assistant.
2. Gehe zu **Einstellungen → Add-ons → Add-on Store**.
3. Füge dieses Repository hinzu, falls noch nicht geschehen.
4. Installiere **[BETA] WinoMC Friend Broadcast**.
5. Öffne die Add-on-Konfiguration.
6. Passe die Einstellungen an.
7. Starte das Add-on.

Beim ersten Start kann eine Microsoft/Xbox-Anmeldung erforderlich sein. Folge den Anweisungen im Add-on-Protokoll.

---

## Empfohlene Grundkonfiguration

Wenn der [BETA] WinoMC Bedrock Server auf demselben Home-Assistant-Host läuft, ist eine typische Konfiguration:

```yaml
TARGET_IP: "123.123.123.123"
TARGET_PORT: 19132
HOST_NAME: "[BETA] WinoMC Server"
WORLD_NAME: "world"
PLAYERS: 0
MAX_PLAYERS: 10
QUERY_SERVER: true
WEB_QUERY_FALLBACK: false
CONFIG_FALLBACK: true
SESSION_UPDATE_INTERVAL: 30
AUTO_FOLLOW: true
AUTO_UNFOLLOW: false
INITIAL_INVITE: true
FRIEND_SYNC_UPDATE_INTERVAL: 60
EXPIRE_FRIENDS: false
EXPIRY_DAYS: 15
EXPIRY_CHECK: 1800
DEBUG_MODE: false
SUPPRESS_SESSION_UPDATE_MESSAGE: true
RESET_AUTH_CACHE: false
```

Wichtig: `TARGET_IP` sollte auf die Adresse zeigen, unter der Friend Broadcast den Bedrock Server erreichen kann.

Für dein Home-Assistant-System kann das zum Beispiel sein:

```yaml
TARGET_IP: "127.0.0.1"
```

`0.0.0.0` ist als Zieladresse meistens nicht sinnvoll, weil es keine konkrete Serveradresse ist.

---

## UI-Einstellungen

### `TARGET_IP`

Die IP-Adresse des Bedrock Servers.

Beispiel:

```yaml
TARGET_IP: "127.0.0.1"
```

Wenn der Bedrock Server auf demselben Home-Assistant-System läuft, verwende am besten die IP-Adresse deines Home-Assistant-Hosts.

Nicht empfohlen:

```yaml
TARGET_IP: "0.0.0.0"
```

`0.0.0.0` ist eher eine Bind-Adresse für Dienste, aber keine gute Zieladresse für einen Client, der einen Server erreichen soll.

---

### `TARGET_PORT`

Der Port des Bedrock Servers.

Standard:

```yaml
TARGET_PORT: 19132
```

Dieser Wert sollte zum Port deines [BETA] WinoMC Bedrock Servers passen.

Wenn dein Bedrock Server auf einem anderen Port läuft, musst du diesen Wert entsprechend anpassen.

---

### `HOST_NAME`

Der Name, der für den Server angezeigt werden soll.

Beispiel:

```yaml
HOST_NAME: "[BETA] WinoMC Server"
```

Dieser Name wird verwendet, wenn Friend Broadcast die Serverinformationen aus der Konfiguration nimmt oder als Fallback nutzt.

Empfehlung:

```yaml
HOST_NAME: "[BETA] WinoMC Server"
```

oder ein eigener Name, zum Beispiel:

```yaml
HOST_NAME: "Spielwiese"
```

---

### `WORLD_NAME`

Der angezeigte Weltname.

Beispiel:

```yaml
WORLD_NAME: "world"
```

Dieser Wert wird vor allem für die angezeigten Serverinformationen verwendet.

Wenn dein Bedrock Server eine andere Welt nutzt, kannst du hier denselben Namen eintragen.

---

### `PLAYERS`

Die angezeigte aktuelle Spieleranzahl.

Standard:

```yaml
PLAYERS: 0
```

Wenn `QUERY_SERVER` aktiv ist und der Bedrock Server erfolgreich abgefragt werden kann, werden echte Werte verwendet.

Wenn der Server nicht abgefragt werden kann und `CONFIG_FALLBACK` aktiv ist, wird dieser konfigurierte Wert verwendet.

---

### `MAX_PLAYERS`

Die angezeigte maximale Spieleranzahl.

Standard:

```yaml
MAX_PLAYERS: 10
```

Dieser Wert sollte ungefähr zur Einstellung deines Bedrock Servers passen.

Wenn dein Bedrock Server zum Beispiel maximal 10 Spieler erlaubt:

```yaml
MAX_PLAYERS: 10
```

---

### `QUERY_SERVER`

Legt fest, ob Friend Broadcast den Bedrock Server aktiv abfragen soll.

Standard:

```yaml
QUERY_SERVER: true
```

Empfohlen:

```yaml
QUERY_SERVER: true
```

Wenn aktiviert, versucht Friend Broadcast, echte Serverinformationen vom Bedrock Server zu holen.

Dazu gehören je nach Serverantwort zum Beispiel:

* Servername
* Weltname
* Spieleranzahl
* maximale Spieleranzahl

Wenn diese Abfrage fehlschlägt, kann je nach Einstellung `CONFIG_FALLBACK` verwendet werden.

---

### `WEB_QUERY_FALLBACK`

Legt fest, ob ein zusätzlicher Web-Fallback für Serverabfragen genutzt werden soll.

Standard:

```yaml
WEB_QUERY_FALLBACK: false
```

Empfohlen:

```yaml
WEB_QUERY_FALLBACK: false
```

Für ein lokales Home-Assistant-Setup ist dieser Wert normalerweise nicht nötig.

---

### `CONFIG_FALLBACK`

Legt fest, ob bei fehlgeschlagener Serverabfrage die Werte aus der Add-on-Konfiguration genutzt werden sollen.

Standard:

```yaml
CONFIG_FALLBACK: true
```

Empfohlen:

```yaml
CONFIG_FALLBACK: true
```

Wenn der Bedrock Server kurzzeitig nicht erreichbar ist, kann Friend Broadcast trotzdem mit den konfigurierten Werten weiterlaufen.

Typischer Loghinweis bei nicht erreichbarem Server:

```text
Failed to ping server, falling back to config values
```

Das bedeutet: Friend Broadcast konnte den Bedrock Server gerade nicht abfragen und nutzt stattdessen die Werte aus der Konfiguration.

---

### `SESSION_UPDATE_INTERVAL`

Intervall für die Aktualisierung der Xbox-Live-Session.

Standard:

```yaml
SESSION_UPDATE_INTERVAL: 30
```

Der Wert ist in Sekunden angegeben.

Empfehlung:

```yaml
SESSION_UPDATE_INTERVAL: 30
```

Ein niedrigerer Wert aktualisiert häufiger, kann aber unnötig viele Updates erzeugen.

Ein höherer Wert reduziert Updates, kann aber dazu führen, dass Änderungen langsamer sichtbar werden.

---

### `AUTO_FOLLOW`

Legt fest, ob Friend Broadcast neue Kontakte automatisch zurückfolgen soll.

Standard:

```yaml
AUTO_FOLLOW: true
```

Empfohlen:

```yaml
AUTO_FOLLOW: true
```

Das ist praktisch, wenn Spieler den Broadcast-Account als Freund hinzufügen. Friend Broadcast kann dann automatisch zurückfolgen.

---

### `AUTO_UNFOLLOW`

Legt fest, ob Friend Broadcast Kontakte automatisch wieder entfernen soll.

Standard:

```yaml
AUTO_UNFOLLOW: false
```

Empfohlen:

```yaml
AUTO_UNFOLLOW: false
```

Das automatische Entfernen von Freunden sollte nur aktiviert werden, wenn du bewusst eine automatische Freundeslisten-Pflege möchtest.

---

### `INITIAL_INVITE`

Legt fest, ob beim ersten Kontakt beziehungsweise beim Synchronisieren eine Einladung ausgelöst werden soll.

Standard:

```yaml
INITIAL_INVITE: true
```

Empfohlen:

```yaml
INITIAL_INVITE: true
```

Damit können Spieler leichter auf den Server aufmerksam werden.

Wenn du keine automatischen Einladungen möchtest:

```yaml
INITIAL_INVITE: false
```

---

### `FRIEND_SYNC_UPDATE_INTERVAL`

Intervall für die Freundeslisten-Synchronisierung.

Standard:

```yaml
FRIEND_SYNC_UPDATE_INTERVAL: 60
```

Der Wert ist in Sekunden angegeben.

Empfehlung:

```yaml
FRIEND_SYNC_UPDATE_INTERVAL: 60
```

Ein niedriger Wert synchronisiert häufiger, ein höherer Wert reduziert die Last.

---

### `EXPIRE_FRIENDS`

Legt fest, ob alte Freunde automatisch entfernt werden sollen.

Standard:

```yaml
EXPIRE_FRIENDS: false
```

Empfohlen:

```yaml
EXPIRE_FRIENDS: false
```

Wenn aktiviert, kann Friend Broadcast alte Kontakte nach einer bestimmten Zeit entfernen.

Das ist eher für öffentliche oder größere Server sinnvoll.

---

### `EXPIRY_DAYS`

Anzahl der Tage, nach denen Freunde als abgelaufen gelten können.

Standard:

```yaml
EXPIRY_DAYS: 15
```

Dieser Wert wird nur relevant, wenn `EXPIRE_FRIENDS` aktiviert ist.

Beispiel:

```yaml
EXPIRE_FRIENDS: true
EXPIRY_DAYS: 15
```

Dann können Freunde nach 15 Tagen als abgelaufen behandelt werden.

---

### `EXPIRY_CHECK`

Intervall für die Prüfung abgelaufener Freunde.

Standard:

```yaml
EXPIRY_CHECK: 1800
```

Der Wert ist in Sekunden angegeben.

`1800` Sekunden entsprechen 30 Minuten.

Dieser Wert ist nur relevant, wenn `EXPIRE_FRIENDS` aktiviert ist.

---

### `DEBUG_MODE`

Aktiviert zusätzliche Debug-Ausgaben.

Standard:

```yaml
DEBUG_MODE: false
```

Empfohlen für normalen Betrieb:

```yaml
DEBUG_MODE: false
```

Bei Problemen kann aktiviert werden:

```yaml
DEBUG_MODE: true
```

Debug-Modus ist hilfreich, wenn:

* der Server nicht angezeigt wird
* die Anmeldung nicht klappt
* Friend Broadcast keine Freunde synchronisiert
* die Serverabfrage fehlschlägt

Nach der Fehlersuche sollte Debug wieder deaktiviert werden.

---

### `SUPPRESS_SESSION_UPDATE_MESSAGE`

Unterdrückt wiederholte Session-Update-Meldungen im Log.

Standard:

```yaml
SUPPRESS_SESSION_UPDATE_MESSAGE: true
```

Empfohlen:

```yaml
SUPPRESS_SESSION_UPDATE_MESSAGE: true
```

Wenn deaktiviert, kann das Protokoll deutlich voller werden.

Für Debugging kann kurzzeitig genutzt werden:

```yaml
SUPPRESS_SESSION_UPDATE_MESSAGE: false
```

---

### `RESET_AUTH_CACHE`

Löscht beim Start den gespeicherten Microsoft/Xbox-Login-Cache.

Standard:

```yaml
RESET_AUTH_CACHE: false
```

Normalbetrieb:

```yaml
RESET_AUTH_CACHE: false
```

Nur bei Login-Problemen aktivieren:

```yaml
RESET_AUTH_CACHE: true
```

Wenn aktiviert, löscht das Add-on den gespeicherten Login-Cache beim Start. Danach ist meistens eine neue Anmeldung notwendig.

Wichtig: Nach erfolgreicher Neuanmeldung wieder auf `false` setzen.

Empfohlener Ablauf bei Login-Problemen:

1. `RESET_AUTH_CACHE` auf `true` setzen.
2. Add-on starten.
3. Neue Anmeldung durchführen.
4. Add-on stoppen.
5. `RESET_AUTH_CACHE` wieder auf `false` setzen.
6. Add-on erneut starten.

---

## Persistenz

Das Add-on speichert seine Daten unter:

```text
/config
```

Dort liegen unter anderem:

* erzeugte Konfiguration
* Login-Cache
* Authentifizierungsdaten
* Friend-Broadcast-Daten

Das Add-on nutzt das Home-Assistant-Add-on-Konfigurationsverzeichnis mit Schreibzugriff.

Dadurch bleiben wichtige Daten auch nach einem Neustart erhalten.

---

## Backup

Das Add-on unterstützt Cold Backup.

Das bedeutet: Home Assistant kann die Add-on-Daten sichern, während das Add-on für das Backup gestoppt wird.

---

## Home Assistant Automationen

Friend Broadcast unterstützt keine Konsolenbefehle per STDIN.

Das ist normal.

Für Friend Broadcast bitte **nicht** verwenden:

```yaml
action: hassio.app_stdin
```

Für Neustarts wird verwendet:

```yaml
action: hassio.app_restart
data:
  app: <vollständiger_addon_slug>
```

Beispiel:

```yaml
action: hassio.app_restart
data:
  app: f2435c57_WinoMC-friend-broadcast
```

Den vollständigen Add-on-Slug findest du in der Add-on-URL.

Beispiel-URL:

```text
/config/app/f2435c57_[BETA] WinoMC-friend-broadcast/info
```

Der zu verwendende Slug ist dann:

```text
f2435c57_[BETA] WinoMC-friend-broadcast
```

Wichtig: Zwischen Repository-ID und Add-on-Slug steht ein Unterstrich `_`.

---

## Empfohlene Automationen

### Geplanter Neustart

Ein geplanter Neustart kann sinnvoll sein, wenn Friend Broadcast dauerhaft laufen soll.

Empfohlen:

```text
04:10 Uhr Friend Broadcast Neustart
```

Wenn auch der Bedrock Server nachts neu gestartet wird, sollte Friend Broadcast danach neu gestartet werden.

Beispiel:

```text
04:00 Uhr Bedrock Server Neustart
04:01:30 Uhr Friend Broadcast Neustart
```

---

### Running Watchdog

Empfohlen ist ein Home-Assistant-Watchdog, der prüft, ob das Add-on läuft.

Wenn Friend Broadcast gestoppt ist, startet Home Assistant es automatisch wieder.

Dazu kann der Home-Assistant-Supervisor-Running-Sensor des Add-ons verwendet werden.

---

## Fehlerbehebung

### Add-on unterstützt kein STDIN

Fehler:

```text
App ... does not support writing to stdin
```

Das ist bei Friend Broadcast normal.

Friend Broadcast ist kein Minecraft-Server und nimmt keine Konsolenbefehle an.

Für Friend Broadcast nutzt du:

```yaml
hassio.app_restart
```

Nicht:

```yaml
hassio.app_stdin
```

---

### Bedrock Server wird nicht gefunden

Logmeldung:

```text
Failed to ping server, falling back to config values
```

Bedeutung:

Friend Broadcast konnte den Bedrock Server gerade nicht abfragen.

Prüfen:

* Läuft der Bedrock Server?
* Stimmt `TARGET_IP`?
* Stimmt `TARGET_PORT`?
* Läuft der Bedrock Server im Host-Netzwerk?
* Ist der Port `19132/udp` erreichbar?
* Ist `QUERY_SERVER` aktiviert?
* Ist `CONFIG_FALLBACK` aktiviert?

Empfohlene Werte:

```yaml
TARGET_IP: "Minecraft Server IP (123.123.123.123)"
TARGET_PORT: 19132
QUERY_SERVER: true
CONFIG_FALLBACK: true
```

---

### Spieler sehen den Server nicht

Prüfen:

* Wurde der Broadcast-Account als Freund hinzugefügt?
* Ist der Broadcast-Account korrekt angemeldet?
* Läuft Friend Broadcast?
* Läuft der Bedrock Server?
* Ist `AUTO_FOLLOW` aktiviert?
* Ist `INITIAL_INVITE` aktiviert?
* Sind Xbox-Live-Dienste erreichbar?
* Ist die Nintendo-Switch-/Xbox-/Minecraft-Freundesliste aktualisiert?

Empfohlene Werte:

```yaml
AUTO_FOLLOW: true
INITIAL_INVITE: true
```

---

### Login funktioniert nicht mehr

Wenn der Microsoft/Xbox-Login nicht mehr funktioniert:

```yaml
RESET_AUTH_CACHE: true
```

Dann Add-on neu starten und die Anmeldung erneut durchführen.

Nach erfolgreicher Anmeldung wieder zurückstellen:

```yaml
RESET_AUTH_CACHE: false
```

---

### Zu viele Logmeldungen

Wenn das Protokoll zu voll ist:

```yaml
SUPPRESS_SESSION_UPDATE_MESSAGE: true
DEBUG_MODE: false
```

Für Fehlersuche kurzfristig:

```yaml
DEBUG_MODE: true
SUPPRESS_SESSION_UPDATE_MESSAGE: false
```

---

## Empfohlene Standardwerte

Für einen typischen privaten [BETA] WinoMC-Server:

```yaml
TARGET_IP: "127.0.0.1"
TARGET_PORT: 19132
HOST_NAME: "[BETA] WinoMC Server"
WORLD_NAME: "world"
PLAYERS: 0
MAX_PLAYERS: 10
QUERY_SERVER: true
WEB_QUERY_FALLBACK: false
CONFIG_FALLBACK: true
SESSION_UPDATE_INTERVAL: 30
AUTO_FOLLOW: true
AUTO_UNFOLLOW: false
INITIAL_INVITE: true
FRIEND_SYNC_UPDATE_INTERVAL: 60
EXPIRE_FRIENDS: false
EXPIRY_DAYS: 15
EXPIRY_CHECK: 1800
DEBUG_MODE: false
SUPPRESS_SESSION_UPDATE_MESSAGE: true
RESET_AUTH_CACHE: false
```

---

## Hinweise zur Sicherheit

Verwende für Friend Broadcast am besten einen separaten Microsoft/Xbox-Account.

Der Account sollte nicht dein privater Hauptaccount sein.

Wenn du das Add-on öffentlich oder mit vielen Spielern nutzt, prüfe besonders diese Optionen:

```yaml
AUTO_FOLLOW
AUTO_UNFOLLOW
EXPIRE_FRIENDS
EXPIRY_DAYS
```

---

## Bekannte Hinweise

* Friend Broadcast ersetzt keinen Bedrock Server.
* Friend Broadcast macht den Server nur leichter auffindbar.
* Konsolenbefehle wie `say hello` gehören zum Bedrock Server Add-on, nicht zu Friend Broadcast.
* Friend Broadcast nutzt keine STDIN-Kommandos.
* Wenn der Bedrock Server nicht erreichbar ist, kann Friend Broadcast auf konfigurierte Werte zurückfallen.
* Xbox Live, Microsoft-Login und externe Dienste können die Sichtbarkeit beeinflussen.

---

## Credits

Dieses Add-on ist Teil des [BETA] WinoMC Add-on-Repositories.

Das Repository basiert ursprünglich auf der Arbeit von:

* williamcorsel/hassio-addons

Weitere Anpassungen, Umbenennung und [BETA] WinoMC-spezifische Add-ons werden gepflegt von:

* kasawino69

Das Friend-Broadcast-Add-on nutzt MCXboxBroadcast als technische Grundlage für die Xbox-Live-/Freundeslisten-Funktionalität.

---

## Lizenz

Bitte beachte die Lizenzinformationen des Repositories sowie die Lizenzbedingungen der verwendeten Drittprojekte.
