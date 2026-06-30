# [BETA] WinoMC Bedrock Server 2.0.0

WinoMC ist ein Home-Assistant-Add-on für **einen** offiziellen Minecraft Bedrock Dedicated Server. Version 2.0.0 macht daraus ein nutzerfreundliches Framework: starten, sichern, diagnostizieren, reparieren und verwalten – ohne JSON-, Linux- oder Container-Wissen.

## Was WinoMC 2.0.0 bietet

- Server starten, stoppen und neu starten
- Live-Konsole mit Befehlseingabe
- stabiles Webinterface für Desktop, klassische Ansicht und Mobile
- Dateimanager mit Upload/Download, sofern Webschutz es erlaubt
- Backup & Restore unter `/config/backups`
- Diagnose & Reparaturhinweise
- Health-Dashboard mit Spielern, RAM, Speicher, Ports, Backup-Status und Schutzstatus
- Resource-Pack- und Behavior-Pack-Prüfung
- Allowlist- und Rollenübersicht für Operator, Member und Visitor
- Update-Schutz mit Backup-, Speicher- und Zielversionsprüfung
- sichererer Import/Export für Welten, Packs und ZIP-Dateien
- Erststart-Profile für Familienserver, Vanilla Survival, Kreativserver, Freunde und Tests

## Bewusste Nicht-Ziele

WinoMC 2.0.0 ist **kein** Multi-Instanz-, Cluster-, Proxy-, Teleport- oder Gameplay-Modifikationssystem. Es bleibt ein Framework um einen Bedrock Dedicated Server herum.

## Schnellstart

1. Repository in Home Assistant hinzufügen.
2. Add-on `[BETA] WinoMC Bedrock Server` installieren.
3. `VERSION` auf `LATEST` lassen oder eine konkrete BDS-Version eintragen.
4. `SERVER_NAME`, `LEVEL_NAME`, `MAX_PLAYERS`, `ONLINE_MODE` und `ALLOW_LIST` prüfen.
5. Add-on starten.
6. Weboberfläche öffnen und im Erststart-Assistenten ein Profil als Orientierung wählen.
7. Vor größeren Änderungen ein Backup erstellen.

## Backups und Restore

WinoMC speichert Framework-Backups persistent in `/config/backups`. Unterstützt werden Welt-, Config- und Komplettbackups. Metadaten enthalten Name, Datum, BDS-Version, Weltname, Backup-Typ, Größe und Status. Die Aufbewahrung wird über `WINOMC_BACKUP_KEEP` gesteuert.

Vor Restore, Import oder Update soll ein Sicherheitsbackup erstellt werden. Restore darf bestehende Daten nicht still überschreiben.

## Diagnose

Die Diagnose prüft Serverordner, Weltordner, Schreibrechte, Speicherplatz, `server.properties`, Ports, `allowlist.json`, `permissions.json`, Pack-Ordner, Konsole, Logs und Backup-Status. Ergebnisse werden als OK, Warnung oder reparierbar angezeigt.

## Packs

Resource Packs und Behavior Packs werden über `manifest.json` erkannt. WinoMC zeigt Name, Typ, UUID, Version, Beschreibung und Fehler wie fehlendes Manifest oder doppelte UUIDs verständlich an.

## Allowlist und Rechte

Die UI erklärt Spielername, XUID, Allowlist-Status und Rolle. Warnungen helfen bei leerer Allowlist, fehlender XUID, Operator ohne Allowlist oder deaktiviertem Online Mode. Bestehende Optionen wie `ALLOW_LIST_USERS`, `OPS`, `MEMBERS` und `VISITORS` bleiben kompatibel.

## Import / Export

Importe und Exporte nutzen erlaubte Verzeichnisse unter `/share/winomc/import`, `/share/winomc/export` und `/config`. ZIP-Dateien werden gegen ZIP Slip geprüft. Bestehende Ziele werden nicht still überschrieben.

## Webschutz

Webschutz darf nicht nur UI-Buttons verstecken: Backend-Endpunkte müssen direkte Aufrufe ebenfalls blockieren, wenn Schreib-, Download-, Export-, Import-, Lösch- oder Restore-Aktionen gesperrt sind.

## Troubleshooting

- Server nicht sichtbar: UDP-Port 19132 prüfen und LAN Visibility aktivieren.
- Keine Spieleranzeige: in der Konsole `list` ausführen, damit aktuelle Werte im Log stehen.
- Pack defekt: `manifest.json`, UUID und Version prüfen.
- Restore unsicher: erst manuelles Komplettbackup erstellen und Server stoppen.

## Credits und Lizenz

WinoMC integriert den offiziellen Bedrock Dedicated Server in Home Assistant. Minecraft/BDS gehören Mojang/Microsoft. Siehe Repository-Lizenz.
