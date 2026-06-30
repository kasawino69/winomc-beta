# [BETA] WinoMC Bedrock Server 2.0.0

WinoMC betreibt **einen** Minecraft Bedrock Dedicated Server in Home Assistant. Version 2.0.0 ist kein Cluster- oder Multi-Instanz-System, sondern ein sicheres und verständliches Framework für normale Endanwender.

## Schnellstart

1. Add-on installieren.
2. `VERSION` auf `LATEST` lassen oder eine konkrete Bedrock-Version eintragen.
3. `SERVER_NAME`, `LEVEL_NAME`, `MAX_PLAYERS`, `ONLINE_MODE`, `ALLOW_LIST` und Ports prüfen.
4. Add-on starten.
5. Weboberfläche öffnen.
6. Unter **Backups** ein Komplettbackup erstellen, bevor größere Änderungen erfolgen.

## Weboberfläche

Die Oberfläche enthält Desktop-, klassische und Mobile-Ansicht. Der Dateiexplorer gehört in den Menüpunkt **Dateien**. Die Live-Konsole bleibt erreichbar. Mobile verzichtet bewusst auf PC-Workbench-Logik.

## Backups und Restore

WinoMC kann Welt-, Config-, Safety- und Komplettbackups unter `/config/backups` erstellen. Jedes Backup erhält Metadaten mit Name, Datum, Welt, Typ, Version, Größe und Status. Die Anzahl behaltener Backups wird über `WINOMC_BACKUP_KEEP` gesteuert.

Restore ist als sicherer Workflow umgesetzt: Backup auswählen, Modus `config`, `world` oder `complete` wählen, Safety-Backup vor Restore erstellen, ZIP-Pfade validieren und nur erlaubte Ziele unter `/config` wiederherstellen. Nach Restore sollte der Serverzustand in **Diagnose** und **Health** geprüft werden.

## Diagnose und Reparatur

Die Diagnose prüft Ordner, Weltpfad, Schreibrechte, Speicherplatz, `server.properties`, Ports, `allowlist.json`, `permissions.json`, Pack-Ordner, Konsole, Logs und Backup-Status. Sichere Diagnose-Reparaturaktionen können Ordner anlegen und fehlende/ungültige JSON-Dateien als valide leere Listen neu erzeugen. Vor dem Ersetzen vorhandener Dateien erstellt WinoMC Sicherungskopien; destruktive Reparaturen ohne Schutz gibt es nicht.

## Packs

Resource Packs und Behavior Packs werden über `manifest.json` erkannt. WinoMC zeigt Name, UUID, Version, Status und aktive Einträge an. Packs können für die aktuelle Welt aktiviert oder deaktiviert werden; dabei schreibt WinoMC valide `world_resource_packs.json` bzw. `world_behavior_packs.json` und erstellt vorher eine Sicherungskopie.

## Spielerrechte / Allowlist

WinoMC kann `allowlist.json` und `permissions.json` über eine UI/API speichern. Unterstützt werden Name, XUID, Allowlist-Status und Rollen `operator`, `member`, `visitor`. Vor Änderungen werden Sicherungskopien erzeugt. WinoMC warnt bei fehlender/ungültiger XUID, doppelten Einträgen, Operator ohne Allowlist, leerer aktiver Allowlist und deaktiviertem Online Mode.

## Import / Export und URL-Import

Der Dateimanager und die Import-/Export-Seite zeigen `/share/winomc/import` und `/share/winomc/export`. ZIP-Erstellung, ZIP-Entpacken und sicherer Welt-Export respektieren Webschutz und Pfadprüfungen. Bestehende Ziele werden nicht still überschrieben; Nutzer müssen Überschreiben bewusst erlauben oder eine Kopie wählen.

Der URL-Import kann direkte Bedrock-Pack/Add-on-URLs prüfen und installieren. Unterstützt werden `.mcpack`, `.mcaddon`, `.mcworld`, `.mctemplate` und geeignete `.zip`-Dateien mit gültigem Bedrock-Manifest. Java-Mods (`.jar`, Forge/Fabric/NeoForge) werden abgelehnt. Lokale/private Ziele, localhost und nicht-HTTPS-URLs werden blockiert. CurseForge-Projektseiten können nicht garantiert automatisch installiert werden; bitte dort den direkten Bedrock-Dateidownload kopieren. Webschutz blockiert URL-Import, wenn aktiv.

## Update-Schutz

WinoMC führt keinen riskanten Live-Update-Fake aus. Der Workflow **Update vorbereiten** erstellt ein Komplettbackup, kann Spieler per Konsole warnen, schreibt einen Update-Vorbereitungsstatus und fordert danach klar zum Add-on-Neustart auf. Beim Neustart greifen `BDS_AUTO_UPDATE`, `VERSION` oder `LATEST` wie bisher.

## Erststart-Profile

Profile wie Familienserver, Vanilla Survival, Kreativserver, Freunde und Test werden angezeigt und können vorbereitet werden. Da Home-Assistant-Add-on-Optionen nicht zuverlässig direkt aus der Webconsole überschrieben werden, speichert WinoMC eine Profil-Empfehlung und zeigt Werte zum Prüfen/Übernehmen an. Es behauptet nicht, Optionen automatisch angewendet zu haben.

## Webschutz

Webschutz ist serverseitig persistent unter `/config/.winomc/web_protection.json` gespeichert. Direkte API-Aufrufe werden blockiert, wenn Webschutz aktiv ist. Der UI-Schalter liest und setzt diesen Serverstatus; Cookies dienen höchstens noch als Komfort für ältere UI-Zustände.

## Mobile Befehlshilfe

Die Mobile Befehlshilfe ist touchfreundlich und scrollbar. Vorschläge werden sichtbar mit Befehl, Beschreibung und Einfügen-Aktion dargestellt. Scroll-Gesten sollen nicht versehentlich Befehle übernehmen; Desktop- und PC-Workbench-Logik bleiben getrennt.

## Troubleshooting

- Server nicht sichtbar: UDP-Port 19132/19133, Firewall und LAN Visibility prüfen.
- Spielerzahl unbekannt: in der Konsole `list` ausführen.
- Pack wird nicht aktiv: `manifest.json` muss UUID und Version enthalten.
- URL-Import scheitert: direkten HTTPS-Dateilink auf Bedrock-Datei verwenden; Java-Mods sind nicht unterstützt.
- Restore unsicher: erst Diagnose lesen, Server stoppen und Safety-Backup prüfen.
- Update nicht gestartet: Add-on nach vorbereiteten Update bewusst neu starten.

## Credits und Lizenz

Minecraft/BDS gehören Mojang/Microsoft. WinoMC verändert keine Spielmechaniken und liefert keine eigenen Gameplay-Add-ons. Lizenz siehe Repository.
