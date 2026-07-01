## 2.1.1b - Manager-only Boot Hotfix

### Fixed
- Entfernt den alten Dockerfile-Restore, der den neuen 2.1b Manager-Server beim Image-Build wieder durch eine alte Ingress-Webkonsole aus Commit `9ea674ef...` überschrieben hat.
- Entfernt den automatischen globalen Single-Server-Start aus dem Add-on-Entrypoint.
- Entfernt die globale Console-FIFO-/STDIN-Bridge aus dem Startpfad von 2.1b.
- Entfernt `ENABLE_WEB_CONSOLE` aus der Home-Assistant-Add-on-Konfiguration, weil der WinoMC Manager das zentrale Webpanel ist und nicht als alte Webkonsole abgeschaltet werden soll.
- Entfernt den experimentellen Manager-Schalter aus der Nutzerkonfiguration, weil 2.1b bereits die neue Manager-Architektur ist.

### Changed
- WinoMC startet nun als Manager-only Add-on: Beim Add-on-Start wird kein Minecraft-Server mehr automatisch gestartet.
- Bedrock-Server werden künftig ausschließlich als Instanzen im WinoMC Manager erstellt und über instanzbezogene Aktionen gestartet, gestoppt oder neugestartet.
- Der HA-Konfigurationstab enthält nur noch globale Manager-/Bootstrap-Einstellungen wie Manager-Port, Sicherheitsmodus, Log-Level, Import/Export/Backup-Pfade und Dateilimits.
- Das Webpanel zeigt sichtbar `WinoMC Manager 2.1b.1`, damit der neue Manager sofort vom alten Single-Server-Webinterface unterscheidbar ist.

### Security
- Das neue Manager-Frontend verwendet korrektes HTML-Escaping für dynamische Werte aus API, Instanznamen, Fehlern und Logs.
- Runtime-/API-Fehler werden strukturiert und nutzerfreundlich angezeigt; technische Details bleiben aufklappbar.

### Validation
- Neue Zusatzvalidierung `scripts/validate-winomc-manager-only.sh` prüft, dass:
  - kein alter `9ea674ef`-Restore im Dockerfile vorhanden ist,
  - der Entrypoint keinen globalen Single-Server mehr startet,
  - `ENABLE_WEB_CONSOLE` nicht mehr im Config-Tab auftaucht,
  - die Manager-UI-Dateien vorhanden sind,
  - die Manager-UI instanzbezogene APIs nutzt,
  - keine globale `/api/command`-UI-Route verwendet wird,
  - der Python-Server weiterhin kompilierbar ist.

### Notes
- Bestehende alte Single-Server-Daten unter `/config` werden durch diesen Hotfix nicht aktiv gelöscht.
- Sie sind aber nicht mehr die neue Source of Truth für WinoMC 2.1b.
- Neue Bedrock-Server sollen über `/config/instances/<instance-id>/` vom Manager verwaltet werden.
