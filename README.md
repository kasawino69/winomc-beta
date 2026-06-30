# [BETA] WinoMC 2.0.0 – Bedrock Server Framework für Home Assistant

WinoMC betreibt **einen** Minecraft Bedrock Dedicated Server in Home Assistant und macht Verwaltung, Sicherheit und Diagnose für normale Endanwender verständlich. WinoMC 2.0.0 setzt bewusst **keine Multi-Instanzen, Cluster, Proxies oder Gameplay-Add-ons** um.

> Keep it simple, with innovative UX and modern design.

## Fokus

- ein Server, stabil und gut verwaltbar
- moderne Weboberfläche für Desktop, klassische Ansicht und Mobile
- Live-Konsole, Dateimanager, Import/Export und Pack-Verwaltung
- Backup & Restore als Kernworkflow unter `/config/backups`
- Diagnose, Reparaturhinweise, Health-Dashboard und Update-Schutz
- Allowlist- und Rechteverwaltung ohne JSON-Pflichtwissen
- Home-Assistant-nahes Bedienkonzept statt einschüchterndem Admin-Panel

## Sicherheit und Einfachheit

Dateioperationen bleiben auf erlaubte WinoMC-Verzeichnisse begrenzt. Upload, Download, Import, Export, Backup, Restore und ZIP-Entpacken nutzen zentrale Pfadprüfung, blockieren Path Traversal und schützen gegen ZIP Slip. Kritische Aktionen sollen nachvollziehbar sein und vor Überschreiben ein Backup ermöglichen.

## Architekturentscheidung 2.0.0

WinoMC 2.0.0 ist kein Multi-Instanz-System. Die Version stärkt die Foundation: Backups, Diagnose, Health, Updates, Packs, Rechte, Import/Export und Dokumentation für einen einzelnen Bedrock-Server.

## Add-ons

- `winomc-server-bedrock`: Haupt-Add-on für den Bedrock Dedicated Server
- `winomc-friend-broadcast`: ergänzendes Broadcast-/Automation-Add-on
- `winomc-blueprints-proposal`: optionale Home-Assistant-Blueprints

## Hinweise

`amd64` bleibt die priorisierte Architektur. `aarch64` bleibt experimentell. Prüfe vor produktivem Einsatz die manuelle PR-Checkliste und erstelle ein vollständiges Backup deiner Welt.

## Lizenz

Siehe `LICENSE`. Minecraft und Bedrock Dedicated Server gehören Mojang/Microsoft; WinoMC liefert keine eigenen Gameplay-Add-ons und verändert keine Spielmechaniken.
