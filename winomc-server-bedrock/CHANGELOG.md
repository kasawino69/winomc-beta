## Changelog

### next

* Geplante weitere Verbesserungen
* Weitere Optimierungen für Bedienbarkeit, Dokumentation und Add-on-Kompatibilität

### 1.3.6

* Native WinoMC Bedrock Runtime als Vorschau vorbereitet
* Neue Option `WINOMC_RUNTIME_MODE` ergänzt
* `itzg` bleibt als Standard- und Fallback-Runtime erhalten
* Neuer nativer BDS-Downloader für den offiziellen Mojang Bedrock Dedicated Server ergänzt
* Native Runtime schreibt `server.properties` direkt aus den Home-Assistant-Add-on-Optionen
* Vorbereitung für spätere vollständige Entfernung der itzg-Runtime
* Backup-Ausschluss für interne WinoMC-BDS-Dateien ergänzt

### 1.3.5

* WinoMC Live Console weiter verbessert
* Konsole dauerhaft im unteren Bereich der Oberfläche sichtbar gemacht
* Live-Log und freie Befehlseingabe sind jetzt in allen Menüpunkten verfügbar
* Neuen Menüpunkt `Dashboard` hinzugefügt
* Individuell anpassbares Dashboard für häufig genutzte Aktionen ergänzt
* Dashboard-Kacheln können hinzugefügt, entfernt und sortiert werden
* Layout-Auswahl für das Dashboard ergänzt
* Dashboard-Einstellungen werden persistent im Browser gespeichert
* Konsolenhöhe kann zwischen kompakt, normal und groß umgeschaltet werden
* Gewählte Konsolenhöhe wird persistent gespeichert
* Benutzeroberfläche weiter auf bessere Alltagstauglichkeit und schnellere Bedienung optimiert
* Allgemeine Hinweise bereinigt
* Nicht notwendige Hinweise zu bewusst nicht übernommenen Optionen entfernt
* Kritische Hinweise bleiben nur dort erhalten, wo Befehle gefährlich, fortgeschritten oder besser über Welt-/Dateikonfiguration zu setzen sind


### 1.3.4

* WinoMC Live Console Oberfläche vollständig überarbeitet
* Neue kategorisierte Bedienoberfläche nach Minecraft-/Realm-ähnlicher Struktur ergänzt
* Kategorien für Übersicht, Allgemein, Fortgeschritten, Mehrspieler, Spielregeln, Pakete und Expertenbefehle hinzugefügt
* Schnellbefehle für häufig genutzte Server- und Spielregel-Einstellungen verbessert
* Eingabedialoge für Befehle mit Spielername, Nachricht oder Zahlenwert ergänzt
* `save hold`, `save query` und `save resume` aus der normalen Schnellleiste entfernt
* Backup-Befehle in einen separaten Expertenbereich verschoben
* Warnhinweise für potenziell kritische Konsolenbefehle verbessert
* Nicht sinnvolle Live-Console-Optionen wie Seed, Bonustruhe, Startkarte, Welterstellung, Experimente und Pack-Aktivierung bewusst aus der Oberfläche herausgelassen
* Benutzeroberfläche für bessere Übersichtlichkeit, Bedienbarkeit und Alltagstauglichkeit optimiert


### 1.3.3

* Fehlerbehebung für die WinoMC Live Console
* Problem behoben, bei dem über die Web-Konsole gesendete Befehle als leerer Befehl erkannt wurden
* Übergabe von Konsolenbefehlen über Home-Assistant-Ingress robuster gemacht
* Unterstützung für Befehlsübergabe per Query-Parameter, JSON-Body, Form-Body und Plain-Text-Body verbessert

### 1.3.2

* WinoMC Live Console hinzugefügt
* Neue Home-Assistant-Ingress-Oberfläche zum Senden von Befehlen an den Minecraft Bedrock Server ergänzt
* Live-Log-Ausgabe für die Server-Konsole vorbereitet
* Schnellbefehle für häufige Serverbefehle ergänzt
* Neue Option `ENABLE_WEB_CONSOLE` zum Aktivieren oder Deaktivieren der Web-Konsole hinzugefügt
* Neue Option `WINOMC_CONSOLE_HISTORY_LIMIT` für die Anzahl der angezeigten Log-Zeilen ergänzt
* Interne Konsolen-Kommunikation über FIFO erweitert
* Dockerfile für die neue Web-Konsole angepasst

### 1.3.1

* Kleine Fehlerbehebungen

### 1.3.0

* README vollständig überarbeitet
* Alle Add-on-UI-Einstellungen ausführlich dokumentiert
* Hinweise zu möglichen Ausfüllwerten und empfohlenen Standardwerten ergänzt
* Dokumentation für Speicherorte, Worlds, Resource Packs, Behavior Packs sowie Import- und Export-Verzeichnisse ergänzt
* Hinweise zu Home-Assistant-Automationen und geplanten Neustarts ergänzt
* Erklärung zur Übergabe von Minecraft-Bedrock-Konsolenbefehlen aus Home Assistant ergänzt
* Hinweise zum vollständigen Home-Assistant-Supervisor-Add-on-Slug ergänzt
* Dokumentation für LAN-Sichtbarkeit, UDP-Port und IPv6-/Dual-Stack-Konfiguration erweitert
* Fehlerbehebungshinweise für LAN-Sichtbarkeit, Verbindung, Allowlist, Resource Packs und IPv6 ergänzt
* Backup- und Persistenzhinweise aktualisiert
* Sicherheits- und Betriebshinweise für private Server ergänzt
* Dokumentation von privaten oder lokalen Beispielwerten bereinigt

### 1.2.9.1

* Automatisierungen Fehlerbehebung

### 1.2.9

* Automatisierungen Fehlerbehebung

### 1.2.8

* Automatisierungen Fehlerbehebung

### 1.2.7

* Neue Funktionen
* Blueprints
* Automatisierungen
* Command-Übergabe aus Home Assistant an den Minecraft Bedrock Server

### 1.2.6

* Diverse Fehlerbehebungen

### 1.2.5

* Speicherstruktur für Serverdaten verbessert
* Ordner für `worlds`, `behavior_packs`, `resource_packs` und `world_templates` werden beim Start automatisch vorbereitet
* `/share/winomc/import` und `/share/winomc/export` für einfacheren Import und Export von Welten und Packs vorbereitet
* Log-Ausgabe beim Start erweitert, damit Speicherorte für Worlds, Packs und Importe leichter nachvollziehbar sind
* YAML-Einrückung der Option `FORCE_GAMEMODE` korrigiert
* Add-on-Konfiguration für sichtbare Home-Assistant-Datenordner verbessert

### 1.2.4

* Weitere Optimierungen am Bedrock-Startverhalten
* Add-on-Konfiguration bereinigt
* Vorbereitung für stabilere Datenablage im Home-Assistant-Add-on-Konfigurationsordner

### 1.2.3

* Allgemeine Optimierungen
* Kleinere Stabilitätsverbesserungen

### 1.2.2.5

* Ausführungsproblem der LAN-Funktion behoben
* Startverhalten der LAN-Sichtbarkeit verbessert

### 1.2.2.4

* Allgemeine Fehlerbehebungen
* Kleinere Korrekturen an der Add-on-Konfiguration

### 1.2.2.3

* Weitere LAN-Fehlerbehebungen
* Verbesserungen für lokale Servererkennung im Netzwerk

### 1.2.2.2

* Verschiedene Fehlerbehebungen für LAN-Sichtbarkeit und IPv6
* Verbesserungen für Dual-Stack-Umgebungen

### 1.2.2.1

* Fehlerbehebungen für IPv6
* Verbesserungen der IPv6-Port-Konfiguration

### 1.2.2

* Mehrere Fehlerbehebungen für IPv6
* Verbesserte Unterstützung für IPv6- und Dual-Stack-Netzwerke

### 1.2.1

* Konfigurationsnamen korrigiert von @felixstorm
* `send-command` korrigiert von @felixstorm

### 1.2.0

* Native Home-Assistant-Backups behoben
* **Breaking Change:** Serverdaten werden jetzt im Home-Assistant-Add-on-Konfigurationsordner gespeichert
* Das Add-on versucht, bestehende Daten automatisch an den neuen Speicherort zu migrieren
* Vor dem Update wird empfohlen, bestehende Serverdaten manuell zu sichern

### 1.1.0

* Laden der HAOS-Optionen behoben

### 1.0.3

* Option `SERVER_AUTHORITATIVE_MOVEMENT` behoben

### 1.0.2

* Option `ENABLE_LAN_VISIBILITY` hinzugefügt

### 1.0.1

* Optionen werden automatisch als Umgebungsvariablen gesetzt
* Add-on-Name geändert

### 1.0.0

* Erste Veröffentlichung
