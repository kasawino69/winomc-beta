# [BETA] WinoMC Entwicklungs-Channel

Für die Stable Version bitte zur anderen Repository wechseln:

```text
https://github.com/kasawino69/winomc
```

**BETA WinoMC** bringt Minecraft Bedrock als Home-Assistant-Add-on auf dein System.

Installieren, einstellen, starten und spielen — mit einer modernen Weboberfläche, Live-Konsole, Dateimanager, Mobile-Ansicht und sinnvollen Werkzeugen für Alltag, Wartung und Serververwaltung.

[BETA] WinoMC richtet sich an alle, die einen Minecraft Bedrock Server bequem zu Hause betreiben möchten, ohne dafür ständig per SSH, Terminal oder Dateifreigaben arbeiten zu müssen.

---

## Was ist [BETA] WinoMC?

[BETA] WinoMC ist ein Home-Assistant-Add-on-Repository für Minecraft Bedrock.

Im Mittelpunkt steht das Add-on:

```text
[BETA] WinoMC Bedrock Server
```

Damit kannst du einen offiziellen Minecraft Bedrock Dedicated Server direkt in Home Assistant betreiben.

[BETA] WinoMC ist dabei mehr als nur ein Startscript für den Server.  
Das Projekt möchte den Serverbetrieb einfacher, übersichtlicher und angenehmer machen — besonders für private Server, Familien, Freundesgruppen und Vanilla-nahe Welten.

---

## Was [BETA] WinoMC bietet

- Minecraft Bedrock Server direkt in Home Assistant
- einfache Installation über den Home-Assistant-Add-on-Store
- komfortable Konfiguration über die Home-Assistant-Oberfläche
- moderne Web-Konsole direkt im Browser
- Live Console mit intelligenter Befehlshilfe
- Dateimanager für Welten, Packs und Serverdateien
- Datei-Editor mit Sicherheitsfunktionen
- Dashboard für eigene Schnellaktionen
- Import und Export von Welten, Packs und Add-ons
- Home-Assistant-Backup-Unterstützung
- LAN-Sichtbarkeit im Heimnetzwerk
- IPv4 und IPv6
- optionale Unterstützung für ARM64
- Mobile Ansicht für Smartphones
- PC-Ansicht für große Bildschirme

---

## Warum [BETA] WinoMC?

[BETA] WinoMC wurde mit einem klaren Ziel entwickelt:

> Minecraft Bedrock Server sollen sich in Home Assistant einfach, sicher und angenehm bedienen lassen.

Viele Serverlösungen funktionieren technisch, fühlen sich aber im Alltag oft wie reine Admin-Werkzeuge an. [BETA] WinoMC versucht, daraus ein nutzbares Produkt zu machen:

- verständliche Einstellungen statt unnötiger Hürden
- Weboberfläche statt dauerhaftem Terminal
- Mobile Bedienung statt Desktop-Zwang
- Dateimanager statt manueller Dateisuche
- Live Console statt versteckter Logs
- Befehlshilfe statt Befehle auswendig lernen
- Backup- und Importfunktionen direkt im Workflow
- klare Trennung zwischen normaler Nutzung und fortgeschrittener Verwaltung

Das Motto von [BETA] WinoMC:

```text
Keep it simple, with innovative UX and modern design.
```

---

## Weboberfläche

[BETA] WinoMC enthält eine eigene Weboberfläche in Home Assistant.

Dort findest du unter anderem:

- Serverübersicht
- Live Console
- intelligente Minecraft-Befehlseingabe
- Dashboard für eigene Aktionen
- Dateimanager
- Datei-Editor
- Import- und Exportfunktionen
- Netzwerk- und Statusinformationen

Die Oberfläche ist für zwei Nutzungssituationen gedacht:

### PC

Für Desktop, Notebook und große Browserfenster.

Die PC-Ansicht bietet viel Platz, eine klare Navigation, größere Arbeitsbereiche und eine komfortable Bedienung mit Maus und Tastatur.

### Mobile

Für Smartphones.

Die Mobile-Ansicht ist auf Touch-Bedienung ausgelegt. Sie verzichtet bewusst auf überladene Desktop-Funktionen und nutzt kompakte Menüs, große Bedienflächen und Vollbild-Ansichten für wichtige Werkzeuge.

---

## Live Console

Die Live Console zeigt die Serverausgabe und erlaubt das Senden von Befehlen.

Die integrierte Befehlshilfe unterstützt beim Schreiben von Minecraft Bedrock Befehlen.  
Vorschläge helfen beim Ausfüllen, führen aber nichts ungefragt aus.

Beispiele:

```text
say Hallo zusammen
list
gamerule keepinventory true
weather clear
time set day
```

---

## Dateimanager und Editor

Der Dateimanager hilft beim Verwalten von Welten, Packs, Add-ons und Serverdateien.

Mögliche Aktionen:

- Dateien ansehen
- Dateien bearbeiten
- Dateien hochladen
- Dateien herunterladen
- Dateien verschieben
- Dateien löschen
- ZIP-Dateien erstellen
- ZIP-Dateien entpacken
- MD5-Prüfsummen prüfen
- Welt- und Pack-Dateien verwalten

Der Editor öffnet sich als Overlay beziehungsweise Vollbildansicht.  
Dadurch bleibt der Dateimanager übersichtlich und der Editor bekommt genug Platz.

---

## Import, Export und Backups

[BETA] WinoMC unterstützt typische Minecraft-Bedrock-Dateien:

```text
.mcworld
.mcpack
.mcaddon
.mctemplate
.zip
```

Damit lassen sich Welten, Resource Packs, Behavior Packs und Add-ons einfacher in den Server übernehmen.

Für Sicherheit im Alltag setzt [BETA] WinoMC auf:

- Home-Assistant-Backups
- Exportfunktionen
- Sicherheitskopien vor Dateiänderungen
- übersichtliche Importpfade
- kontrollierte Dateioperationen über die Weboberfläche

Vor größeren Änderungen an Welten oder Packs sollte trotzdem immer ein vollständiges Backup erstellt werden.

---

## Für wen ist [BETA] WinoMC gedacht?

[BETA] WinoMC passt besonders gut für:

- private Minecraft Bedrock Server
- Familienserver
- Freundesgruppen
- Vanilla- und Vanilla+-Welten
- Home-Assistant-Nutzerinnen und Nutzer
- Menschen, die einen Server bedienen möchten, ohne alles per Terminal zu machen
- alle, die Minecraft Bedrock sauber in ihr Smart Home integrieren möchten

---

## Add-ons in diesem Repository

### [BETA] WinoMC Bedrock Server

Das Haupt-Add-on für den Minecraft Bedrock Dedicated Server.

Es enthält Serverbetrieb, Weboberfläche, Dateimanager, Konsole, Import, Export und die wichtigsten Verwaltungsfunktionen.

### [BETA] WinoMC Friend Broadcast

Ein optionales Zusatz-Add-on, das bei bestimmten Geräten und Netzwerksituationen helfen kann, einen Bedrock-Server über Freundes-/Broadcast-Mechanismen sichtbarer zu machen.

Das Haupt-Add-on bleibt der [BETA] WinoMC Bedrock Server.

---

## Installation

### Repository zu Home Assistant hinzufügen

[![Repository zu Home Assistant hinzufügen](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https://github.com/kasawino69/winomc-beta)

Oder manuell in Home Assistant:

1. **Einstellungen** öffnen
2. **Add-ons** öffnen
3. **Add-on Store** öffnen
4. oben rechts die drei Punkte wählen
5. **Repositorys** öffnen
6. diese URL hinzufügen:

```text
https://github.com/kasawino69/winomc-beta
```

Danach das gewünschte [BETA] WinoMC Add-on installieren.

---

## Dokumentation

Die ausführliche Dokumentation zum Haupt-Add-on findest du hier:

```text
WinoMC-server-bedrock/README.md
```

Dort werden Einrichtung, Optionen, Speicherorte, Import, Export, Netzwerk, Web-Konsole und Fehlerbehebung genauer erklärt.

---

## Support

Fehler, Wünsche und Sicherheitsmeldungen können über GitHub Issues gemeldet werden:

```text
https://github.com/kasawino69/WinoMC/issues
```

Bitte bei Fehlern möglichst angeben:

- verwendete WinoMC-Version
- Home-Assistant-Version
- Systemarchitektur, zum Beispiel `amd64` oder `aarch64`
- kurze Beschreibung des Problems
- relevante Logs ohne private Daten
- was erwartet wurde und was tatsächlich passiert ist

Bitte keine Tokens, Zugangsdaten, privaten Weltdateien oder persönlichen Daten öffentlich posten.

WICHTIG:
Für die [BETA] WinoMC Versionen wird kein Support gegeben.

---

## Sicherheit

Die Weboberfläche ist ein Verwaltungswerkzeug.  
Wer Zugriff darauf hat, kann Serverbefehle ausführen und Dateien verändern.

Für private Server wird empfohlen:

- Microsoft/Xbox-Authentifizierung aktiv lassen
- Allowlist verwenden
- Operator-Rechte nur vertrauenswürdigen Spielern geben
- vor größeren Änderungen Backups erstellen
- keine Zugangsdaten oder privaten Daten in Issues veröffentlichen

---

## Credits

WinoMC basiert ursprünglich auf der Arbeit von:

- `williamcorsel/hassio-addons`

Weitere Inspirationen und Vorlagen stammen unter anderem von:

- `alexbelgium/hassio-addons`

Danke außerdem an:

- `itzg/docker-minecraft-bedrock-server` für viele gute Ideen, Verhaltensweisen und Kompatibilitätsreferenzen rund um Minecraft Bedrock Server Container
- `poeggi/bds-ipv6fix` für die technische Beschreibung und Idee des IPv6-Bind-Fixes
- `Box64` für die Möglichkeit, den Bedrock Dedicated Server experimentell auf ARM64 auszuführen
- die Home-Assistant-Community
- die Minecraft-Community

[BETA] WinoMC-spezifische Anpassungen, Weboberfläche, UX, Add-on-Integration und Weiterentwicklung werden im [BETA] WinoMC-Projekt gepflegt.

---

## Lizenz

Dieses Repository steht unter der MIT-Lizenz, soweit nicht anders angegeben.

Drittprojekte behalten ihre jeweiligen eigenen Lizenzen und Rechte.

Minecraft, Minecraft Bedrock, Bedrock Dedicated Server, Mojang und Microsoft sind Marken oder Eigentum der jeweiligen Rechteinhaber.

Home Assistant ist ein Projekt der Home-Assistant-Community und ihrer jeweiligen Rechteinhaber.

WinoMC ist kein offizielles Minecraft-, Mojang-, Microsoft- oder Home-Assistant-Projekt.

WinoMC ist nicht offiziell mit Mojang, Microsoft, Home Assistant, itzg, poeggi, Box64 oder den ursprünglichen Upstream-Repositories verbunden, sofern nicht ausdrücklich anders angegeben.
