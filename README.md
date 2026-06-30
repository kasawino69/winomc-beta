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
- serverseitig persistenter Webschutz mit Backend-Prüfung
- Backup, Restore, Diagnose-Reparatur und Health-Übersicht
- Pack-Aktivierung für Welt-Pack-Dateien
- URL-Import für direkte Bedrock-Pack/Add-on-Dateien
- Allowlist-/Permissions-Verwaltung über UI/API
- Update-Vorbereitung mit Backup statt riskanter Live-Fake-Automation
- Erststart-Profile als vorbereitete Home-Assistant-Konfigurationsvorschläge

## Weboberfläche

Die Weboberfläche bietet Konsole, Dateimanager, Backups, Diagnose, Packs, Spielerrechte, Import/Export, Updates und Profile. Desktop, klassische Ansicht und Mobile bleiben getrennte Bedienkonzepte. Mobile zeigt keine PC-Workbench. Die Mobile Befehlshilfe ist als scrollbares, touchfreundliches Panel ausgelegt; Einfügen passiert kontrolliert über Vorschlag oder Button.

## Sicherheit

WinoMC begrenzt Dateioperationen auf erlaubte WinoMC-Verzeichnisse, prüft Pfade, blockiert Path Traversal und schützt ZIP-Entpacken vor ZIP Slip. Webschutz wird serverseitig persistent gespeichert und für gefährliche Aktionen erzwungen, nicht nur über Cookies oder deaktivierte UI-Buttons.

## Safety Planner und Risikoampel

WinoMC nutzt für Reparatur, Import und Restore einen Safety Planner: erst analysieren, Risiko erklären, Backup planen, bestätigen und dann ausführen. Die Risikoampel nutzt `green`, `yellow` und `red`. Auto-Reparaturen erzwingen nicht blind Vanilla und leeren aktive Add-on-/Pack-Dateien nicht automatisch; Add-on-, Marketplace- oder unbekannte Welten werden vorsichtig behandelt.

## URL-Import

WinoMC ist kein Internet-Downloader: freier URL-Download ist deaktiviert. Nutzer laden Bedrock-Dateien selbst von MCPEDL, CurseForge, GitHub, Marketplace Export oder eigenen Quellen herunter und legen sie in `/share/winomc/import` oder laden sie über WinoMC hoch. Der Add-on Manager erkennt `.mcpack`, `.mcaddon`, `.mcworld`, `.mctemplate` und geeignete `.zip`, katalogisiert Import-Eingang/Installiert/Aktiv/Lokale Updates/Probleme, prüft Manifest, Größe, Symlinks, ZIP Slip, Java-Mod-Marker und Duplicate UUIDs und installiert erst nach Safety-Plan/Bestätigung. Java-Mods (`.jar`, Forge/Fabric/NeoForge) werden freundlich abgelehnt. Restore nutzt eine Vorschau mit Speicherplatzprüfung und Safety-Backup.

## Nicht-Ziele

WinoMC 2.0.0 baut keine Multi-Instanzen, kein Cluster, keinen Proxy, keinen Teleport-Service und keine Gameplay-Modifikationen. WinoMC ist das Framework um den Server herum, nicht das Spiel selbst.

## Support / Issues

Bitte Fehler mit Add-on-Version, Architektur, kurzer Beschreibung, relevanter UI-Ansicht und anonymisierten Logs melden. Keine privaten Namen, Tokens, IP-Adressen oder personenbezogenen Daten veröffentlichen.

## Credits und Lizenz

Minecraft und Bedrock Dedicated Server gehören Mojang/Microsoft. WinoMC liefert keine eigenen Gameplay-Add-ons. Lizenz siehe `LICENSE`.
