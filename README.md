# [BETA] WinoMC 2.0.0 – Bedrock Server Framework für Home Assistant

WinoMC ist ein **Beta-Add-on-Repository** für Home Assistant. Im Mittelpunkt steht ein einzelner Minecraft Bedrock Dedicated Server, der einfach, sicher und verständlich verwaltet werden soll.

> Keep it simple, with innovative UX and modern design.

## Was WinoMC ist

WinoMC bringt den offiziellen Bedrock Dedicated Server in Home Assistant und ergänzt ihn um eine Weboberfläche für Alltag, Diagnose und sichere Dateiabläufe. Die Zielgruppe sind private Server, Familien, Freundesgruppen und Vanilla-nahe Welten – nicht professionelle Cluster-Setups.

## Installation

Repository in Home Assistant hinzufügen:

```text
https://github.com/kasawino69/winomc-beta
```

Dann im Add-on-Store installieren:

```text
[BETA] WinoMC Bedrock Server
```

## Add-ons in diesem Repository

- `winomc-server-bedrock`: Haupt-Add-on für einen Bedrock Dedicated Server.
- `winomc-friend-broadcast`: ergänzendes Broadcast-/Automation-Add-on.
- `winomc-blueprints-proposal`: optionale Home-Assistant-Blueprints.

## WinoMC 2.0.0 Fokus

- ein Server, keine Multi-Instanzen
- Webkonsole mit Desktop-, klassischer und Mobile-Ansicht
- sichere Dateioperationen mit Webschutz und Backend-Prüfung
- Backup, Restore, Diagnose und Health-Übersicht
- Pack-Aktivierung für Welt-Pack-Dateien
- Allowlist-/Permissions-Verwaltung über UI/API
- Update-Vorbereitung mit Backup statt riskanter Live-Fake-Automation
- Erststart-Profile als vorbereitete Home-Assistant-Konfigurationsvorschläge

## Weboberfläche

Die Weboberfläche bietet Konsole, Dateimanager, Backups, Diagnose, Packs, Spielerrechte, Import/Export, Updates und Profile. Desktop, klassische Ansicht und Mobile bleiben getrennte Bedienkonzepte. Mobile zeigt keine PC-Workbench.

## Sicherheit

WinoMC begrenzt Dateioperationen auf erlaubte WinoMC-Verzeichnisse, prüft Pfade, blockiert Path Traversal und schützt ZIP-Entpacken vor ZIP Slip. Webschutz wird serverseitig für gefährliche Aktionen erzwungen, nicht nur über deaktivierte UI-Buttons.

## Nicht-Ziele

WinoMC 2.0.0 baut keine Multi-Instanzen, kein Cluster, keinen Proxy, keinen Teleport-Service und keine Gameplay-Modifikationen. WinoMC ist das Framework um den Server herum, nicht das Spiel selbst.

## Support / Issues

Bitte Fehler mit Add-on-Version, Architektur, kurzer Beschreibung, relevanter UI-Ansicht und anonymisierten Logs melden. Keine privaten Namen, Tokens, IP-Adressen oder personenbezogenen Daten veröffentlichen.

## Credits und Lizenz

Minecraft und Bedrock Dedicated Server gehören Mojang/Microsoft. WinoMC liefert keine eigenen Gameplay-Add-ons. Lizenz siehe `LICENSE`.
