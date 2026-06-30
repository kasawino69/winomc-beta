# Changelog

### 2.0.0

#### Added
* Framework-Foundation für einen einzelnen, perfekt verwaltbaren Bedrock Server.
* Backup & Restore-Struktur mit persistentem `/config/backups`, Backup-Typen und Aufbewahrung.
* Diagnose-Seite für Dateien, Konfiguration, Allowlist, Permissions, Packs, Prozess, Netzwerk und Backups.
* Health-Dashboard mit WinoMC-Version, Spieler-, RAM-, Speicher-, Backup- und Schutzstatus.
* Pack-Prüfung für Resource Packs und Behavior Packs inklusive Manifest-, UUID- und Versionsanzeige.
* Spielerrechte-Übersicht für Allowlist, XUID und Rollen.
* Update-Schutz-Prüfung vor BDS-Updates.
* Import-/Export-Übersicht mit Sicherheitsmodell gegen stilles Überschreiben.
* Erststart-Profile für Familienserver, Vanilla Survival, Kreativserver, private Freunde und Tests.
* Validierungsskript `scripts/validate-winomc.sh` als einfacher Release-Check.

#### Changed
* Version auf `2.0.0` gesetzt.
* Desktop, klassische Ansicht und Mobile werden in der Weboberfläche stärker getrennt.
* Explorer bleibt auf den Menüpunkt `Dateien` begrenzt.
* Dokumentation auf nutzerfreundliches Framework-Erlebnis ausgerichtet.

#### Fixed
* Weitere UI-Härtung gegen unsichtbare Desktop-Overlays, blockierende Layer und nicht scrollbar nutzbare Explorerbereiche.
* Fehlende Health-Werte werden als `Nicht verfügbar` behandelt, statt Layout oder JavaScript zu brechen.

#### Security
* Zentrale Pfadvalidierung bleibt Grundlage für Upload, Download, Import, Export, Backup, Restore, Löschen und ZIP-Entpacken.
* Backup-/Restore- und Import-/Export-Flows sind auf erlaubte WinoMC-Verzeichnisse begrenzt.
* Update-Schutz warnt vor fehlendem Backup, knappem Speicherplatz und unklarer Zielversion.

#### Migration
* Keine Multi-Instanz-Migration. Bestehende Welten, Packs, Allowlist, Permissions und `server.properties` werden nicht automatisch verschoben oder gelöscht.
* Bestehende Optionen bleiben erhalten; neue 2.0.0-Funktionen lesen vorhandene Dateien defensiv.

#### Notes
* Multi-Instanzen, Cluster, Proxies, eigene Gameplay-Add-ons und Spielmechanik-Eingriffe sind bewusst nicht Teil von WinoMC 2.0.0.


### next

* Geplante weitere Verbesserungen
* Weitere Optimierungen für Bedienbarkeit, Dokumentation und Add-on-Kompatibilität

### 1.6.14.23b
* Klassische PC-Ansicht: Dateiexplorer sauber an den Inhaltsbereich oberhalb der Live Console gebunden.
* Klassische PC-Ansicht: Dateiliste nutzt den verfügbaren Platz im Dateien-Tab und scrollt intern.
* Klassische PC-Ansicht: Explorer läuft nicht mehr hinter die Live Console und verdeckt keine Dateizeilen.
* Klassische PC-Ansicht: Dateiexplorer wird ausschließlich im aktiven Menüpunkt `Dateien` dargestellt.
* Andere PC-Menüpunkte reservieren keine Explorer-Fläche und zeigen keine Explorer-Reste mehr.
* PC-Workbench/Desktop-Dateifenster bleibt von der klassischen Frame-Korrektur getrennt.
* Mobile-Ansicht bleibt unverändert und weiterhin von PC-Layoutregeln getrennt.

### 1.6.14.22b

* Klassische PC-Ansicht: Dateiexplorer sauber an den Inhaltsbereich oberhalb der Live Console gebunden.
* Klassische PC-Ansicht: Dateiliste nutzt den verfügbaren Platz im Dateien-Tab und scrollt intern.
* Klassische PC-Ansicht: Explorer läuft nicht mehr hinter die Live Console und verdeckt keine Dateizeilen.
* Klassische PC-Ansicht: Dateiexplorer wird ausschließlich im aktiven Menüpunkt `Dateien` dargestellt.
* Andere PC-Menüpunkte reservieren keine Explorer-Fläche und zeigen keine Explorer-Reste mehr.
* PC-Workbench/Desktop-Dateifenster bleibt von der klassischen Frame-Korrektur getrennt.
* Mobile-Ansicht bleibt unverändert und weiterhin von PC-Layoutregeln getrennt.
* Ursache dokumentiert und behoben: alte UI-Fixes wurden zwar teilweise ausgelagert, aber der Patch-Mechanismus entfernte nur die aktuellen 1.6.14.21b-IDs und konnte beim nächsten Lauf alte oder aktuelle Injektionen parallel stehen lassen.
* Patch-Mechanismus idempotent erweitert: alte 1.6.14.21b- und neue 1.6.14.22b-Style-/Script-Blöcke werden vor jeder Neu-Injektion entfernt und danach zuverlässig neu eingefügt.
* Version gesetzt auf `WinoMCConsole/1.6.14.22`.
* PC- und Mobile-Shell bleiben strikt getrennt über `winomc-pc` und `winomc-mobile`.
* PC-Dateimanager in der klassischen Ansicht nutzt jetzt ebenfalls ein einspaltiges Explorer-Layout, damit der ausgelagerte PC-Editor nicht mehr über Grid-/Splitter-Spalten klein gerechnet wird.
* PC-Workbench-Dateifenster bleibt ein großes, intern scrollbar nutzbares Fenster ohne versteckte Editor-/Splitter-Platzhalter.
* PC-Router beobachtet nur noch relevante Body-Klassen statt alle Style-Änderungen im gesamten DOM, damit die Reparaturlogik keine selbst ausgelösten Mutation-Loops erzeugt.
* Mobile-Tab-Isolation bleibt eigenständig und blendet den Dateiexplorer außerhalb des aktiven Dateien-Menüs aus.

### 1.6.14.21b

* PC- und Mobile-UI strikt getrennt: eigene CSS-Dateien, eigene JavaScript-Module und ein kleiner Shell-Router als einzige Brücke.
* Neue PC-UI-Dateien ergänzt:
  * `rootfs/usr/local/share/winomc-console/pc.css`
  * `rootfs/usr/local/share/winomc-console/pc.js`
* Neue Mobile-UI-Dateien ergänzt:
  * `rootfs/usr/local/share/winomc-console/mobile.css`
  * `rootfs/usr/local/share/winomc-console/mobile.js`
* Neuer Shell-Router ergänzt:
  * `rootfs/usr/local/share/winomc-console/shell-router.js`
* Der Patch-Mechanismus lädt die getrennten UI-Dateien und injiziert PC- und Mobile-Code getrennt in die Webconsole.
* Alte UI-Notfallpatches von 1.6.14.14b bis 1.6.14.20b werden beim Patchen entfernt, damit sie nicht weiter gegen die neue Struktur arbeiten.
* PC-Editor wird im PC-Modul aus dem Dateimanager-Grid in eine eigene PC-Layer verschoben und dadurch von alten Grid-/Mobile-Regeln getrennt.
* PC-Editor nutzt eigene Zustände und eigene CSS-Regeln:
  * `winomc-pc`
  * `winomc-pc-editor-open`
  * `winomc-pc-editor-fullscreen`
  * `winomc-pc-editor`
* Mobile nutzt eigene Zustände und eigene CSS-Regeln:
  * `winomc-mobile`
* Mobile stellt nur aktive Menüpunkte dar und erhält keine PC-Editor-/Desktop-Fensterlogik.
* Gemeinsame Logik wie Datei-API, Dateiliste, Lesen/Speichern, Upload, Download, Konsole und Status bleibt als Modul im bestehenden Webconsole-Kern erhalten.
* Version gesetzt auf `WinoMCConsole/1.6.14.21`.

### 1.6.14.20b

* PC-Editor weiter stabilisiert: normales Öffnen nutzt jetzt ein zentriertes, großes Arbeitsfenster statt ein breakpoint-abhängiges Seitenfenster.
* PC-Editor ist nicht mehr von der Home-Assistant-Ingress-Iframe-Breite abhängig.
* PC-Editor-Größe wird beim Öffnen, bei Fenstergrößenänderung und bei alten Editor-Zuständen laufend stabilisiert.
* Editor-Aktionsleiste wird auf PC wieder als kompakte Button-Zeile dargestellt und nicht mehr als große vertikale Mobile-Schaltflächen.
* Editor-Vollbild bleibt ein eigener Vollbildzustand innerhalb des WinoMC-Iframes.
* Alte Blur-, Modal- und Card-Maximize-Zustände werden beim PC-Editor entfernt.
* Desktop-Dateiexplorer bleibt weiterhin auf eine große, einspaltige Fensterfläche mit intern scrollbarer Dateiliste gehärtet.
* Version gesetzt auf `WinoMCConsole/1.6.14.20`.

### 1.6.14.19b

* PC-Erkennung läuft nicht mehr über @media (min-width: 1051px), weil Home-Assistant-Ingress auf PC oft schmale Iframes erzeugt.
* Neue Trennung über Eingabegerät/Browser:
* PC: winomc-pc-shell
* Mobile: winomc-mobile-shell
* PC-Editor wird per Runtime hart als großes Vordergrundfenster gesetzt.
* Alte Blur-/Modal-/Card-Overlays werden beim PC-Editor aktiv entfernt.
* Editor-Größe wird zusätzlich per Inline-Styles stabilisiert, damit alte CSS-Regeln ihn nicht wieder klein/rechts anordnen.
* Desktop-Dateiexplorer wird im Desktop-Modus auf eine große nutzbare Fensterfläche gezwungen.
* Datei-Grid im Desktop-Modus bleibt einspaltig; versteckter Editor/Splitter reserviert keinen Platz mehr.
* Version steht auf 1.6.14.19b.

### 1.6.14.18b

* Mobile- und PC-UI-Regeln sauber getrennt, damit Änderungen am PC die Mobile-Ansicht nicht mehr beeinflussen.
* PC-Editor neu verdrahtet: Öffnen, Schließen und Vollbild nutzen eigene PC-Zustände statt Mobile-/Card-Overlay-Logik.
* PC-Editor entfernt alte Blur-/Modal-/Card-Maximize-Zustände und öffnet als großes Vordergrundfenster.
* PC-Workbench/Desktop-Modus: Dateiexplorer nutzt ein einspaltiges, hohes Dateifenster ohne reservierten Editor-/Splitter-Leerraum.
* Desktop-Dateiliste bleibt intern scrollbar und erhält eine brauchbare Mindesthöhe.
* Die neuen UI-Overrides werden in einem eigenen finalen Style-Block nach alten Desktop-Ingress-Regeln eingefügt.
* Version gesetzt auf WinoMCConsole/1.6.14.18.

### 1.6.14.17b

* Mobile: Dateiexplorer wird nur noch im aktiven Dateien-Menü angezeigt und nicht mehr auf allen Menüpunkten eingeblendet.
* PC: Editor öffnet wieder als großes Overlay statt als zu kleiner Bereich im Explorer-Grid.
* PC: Editor-Vollbild entfernt alte Card-/Blur-Zustände und nutzt die verfügbare Vordergrundfläche.
* PC-Workbench/Desktop-Modus: Dateiexplorer bekommt eine brauchbare Mindestgröße und eine intern scrollbare Dateiliste.
* Desktop-Dateifenster reserviert keinen unnötigen Platz mehr für einen versteckten Editor/Splitter.
* Version gesetzt auf WinoMCConsole/1.6.14.17.

### 1.6.14.16b

* PC-UI-Zustände getrennt: Card-Maximize, Editor-Vollbild und Desktop-Fenster-Maximize verwenden nicht mehr dieselbe Overlay-/Blur-Logik.
* Editor: Vollbild entfernt Card-Maximize-Zustände und öffnet als eigener Vordergrundzustand ohne Blur-Overlay.
* Editor: normal geöffnete Dateien bleiben als Editorbereich im Dateimanager statt als falsches globales Overlay zu erscheinen.
* Desktop-Modus: Dateifenster öffnet wieder mit brauchbarer Standardgröße und korrigiert alte gespeicherte zu kleine Dateifenster.
* Desktop-Modus: Explorer-Liste nutzt die verfügbare Fensterhöhe und bleibt intern scrollbar.
* Klassische PC-Ansicht: aktive Dashboard-Kacheln erhalten eine eigene Scrollregion, damit untere Kacheln erreichbar bleiben.
* Version gesetzt auf WinoMCConsole/1.6.14.16.

### 1.6.14.15b

* Klassische PC-Ansicht: aktive Kacheln im persönlichen Dashboard bleiben auch bei vielen Kacheln scrollbar erreichbar.
* Editor: Vollbild entfernt alte Blur-/Card-Maximize-Zustände und öffnet wieder als echtes Editor-Fenster.
* Desktop-Modus: Dateiexplorer nutzt die verfügbare Fensterhöhe wieder stabiler und ohne ungenutzten Editor-/Leerbereich.
* Desktop-Modus: Dateitabelle bleibt intern scrollbar und erhält wieder eine brauchbare Inhaltsfläche.
* Mobile, Datei-API und Serverlogik wurden nicht funktional umgebaut.
* Version gesetzt auf WinoMCConsole/1.6.14.15.

### 1.6.14.14b

* Klassische PC-Ansicht: persönliches Dashboard bekommt eine belastbare Scrollfläche im oberen Inhalts-Frame.
* Editor: Vollbild in der klassischen PC-Ansicht öffnet wieder als echtes Editor-Fenster statt nur ein Blur-Overlay zu zeigen.
* Editor: alte Card-Maximize-/Blur-Zustände werden in der klassischen PC-Ansicht beim Editor-Vollbild entfernt.
* PC-Workbench, Mobile, Datei-API und Serverlogik wurden nicht funktional umgebaut.
* Version gesetzt auf WinoMCConsole/1.6.14.14.

### 1.6.14.13b

* Klassische PC-Ansicht weiter gehärtet: Navigation, Inhalt und Live Console bleiben als drei klare Frames erhalten.
* Dateimanager: Der Editor ist im Explorer wieder ausgeblendet und erscheint erst beim Öffnen/Bearbeiten einer Datei.
* Dateimanager: Die Explorer-Inhaltsfläche nutzt den verfügbaren Platz wieder vollständig und bleibt intern scrollbar.
* Persönliches Dashboard: neue Befehle und aktive Kacheln bleiben innerhalb des Dashboard-Frames scrollbar erreichbar.
* Befehlshilfe: Vorschläge und Hilfstext sind optisch sauberer getrennt.
* PC-Workbench, Mobile, Datei-API und Serverlogik wurden nicht funktional umgebaut.
* Version gesetzt auf WinoMCConsole/1.6.14.13.

### 1.6.14.12b

* klassische PC-Ansicht nutzt jetzt sauber:
* Frame 1: Navigation links
* Frame 2: Inhaltsbereich rechts
* Frame 3: Live Console unten
* wenn die Live Console größer/kleiner gezogen wird, verkleinern/vergrößern sich Navigation und Inhaltsbereich gemeinsam
der Größenänderungsknopf der Live Console bleibt in der klassischen PC-Ansicht vorhanden
* persönliches Dashboard bekommt eine eigene Scrollfläche, damit Kacheln erreichbar bleiben
* Explorer bleibt intern scrollbar und wird nicht mehr künstlich winzig gemacht
* PC-Workbench, Mobile, Datei-API und Serverlogik wurden nicht funktional umgebaut
* Version gesetzt auf WinoMCConsole/1.6.14.12

### 1.6.14.11b

* der Größenänderungsgriff der Live Console ist in der klassischen PC-Ansicht wieder vorhanden
der Griff ist nur in sinnvoll nutzbaren Zuständen aktiv, nicht bei eingeklappt/versteckt/Vollbild
* Größenänderungen der Live Console verändern nicht mehr ständig die Layout-Höhe von Navigation und Dateimanager
der Dateimanager/Explorer bekommt wieder eine größere nutzbare Inhaltsfläche
die Dateiliste bleibt intern scrollbar
* Desktop-Workbench, Mobile, Serverlogik, Datei-API und Dashboard-Funktionen wurden nicht funktional umgebaut
* Version gesetzt auf WinoMCConsole/1.6.14.11

### 1.6.14.10b

* klassische PC-Ansicht: der freie Drag-Größenregler der Live Console wird ausgeblendet
* dadurch kann er nicht mehr versehentlich die Navigations-/Layout-Höhe beeinflussen
* die Größenknöpfe der Live Console funktionieren am PC wieder:
* Kompakt
* Normal
* Groß
* Vollbild
* die PC-Workbench-Konsole bleibt weiterhin verschiebbar und größenveränderbar
* der Desktop-Freiflächen-Fix aus 1.6.14.9 bleibt erhalten
* Mobile wurde funktional nicht angefasst
* Version gesetzt auf WinoMCConsole/1.6.14.10

### 1.6.14.9b

* PC-Desktop-Freifläche wird wieder bis zur Taskleiste korrekt als Desktop-Fläche behandelt
der dunkle Blocker-Bereich unterhalb des Desktops wird beseitigt
* Live Console wird nicht mehr beim Bewegen in der Größe verändert
* Live Console wird nicht mehr künstlich unten rechts eingesnappt
* Größenänderung der Live Console bleibt wieder möglich
* klassische Ansicht und Mobile wurden nicht funktional angefasst
* Version gesetzt auf WinoMCConsole/1.6.14.9

### 1.6.14.8b

WinoMC Console Fehlerbehebungen

### 1.6.14.7b

WinoMC Console Fehlerbehebungen

### 1.6.14.4b

#### PC Workbench / Desktop-Härtung

* Gezielt den blockierenden unsichtbaren Bereich in der PC-Workbench gehärtet.
* Stale Classic-Layout-Zustände wie `has-maximized-card` werden in der PC-Workbench entfernt.
* Klassische Card-Maximize-Overlays dürfen in der PC-Desktop-Umgebung keine Klicks mehr blockieren.
* Nicht geöffnete oder minimierte Desktop-Fenster erhalten keine Pointer-Events mehr.
* Verwaiste Editor-/Modal-Backdrops werden in der PC-Workbench deaktiviert, wenn kein Editor wirklich geöffnet ist.
* Desktop-Icons, Taskbar, Fensterleisten, geöffnete Fenster und bewegliche Live Console bleiben weiterhin bedienbar.

#### Scope

* Nur Härtung und Bugfix für die PC-Desktop-Umgebung.
* Keine Änderungen an Mobile UX.
* Keine Änderungen an Datei-/Backend-/CodeQL-Logik.
* Keine neuen Layoutmodi.

#### Version

* Version auf `WinoMCConsole/1.6.14.4` angehoben.

### 1.6.14.3b

#### Mobile UX Hardening

* Live Console auf Mobile weiter gehärtet:
  * Der Größen-Ziehgriff wird auf Mobile vollständig deaktiviert.
  * Der Ziehgriff erscheint auch im eingeklappten Zustand nicht mehr.
  * Eingeklappte Live Console bleibt innerhalb der sichtbaren Browserfläche.
  * iOS-/Browser-Safe-Area wird beim eingeklappten Zustand stärker berücksichtigt.
  * Mobile nutzt weiterhin ausschließlich die Bedienflächen `Kompakt`, `Normal`, `Groß`, `Vollbild` und `Ausklappen`.

#### Mobile Editor

* Editor-Overlay auf Mobile modal abgesichert:
  * Hintergrundinteraktionen werden blockiert, solange der Editor geöffnet ist.
  * Ein eigener Backdrop verhindert versehentliche Klicks oder Scrollgesten auf die Seite hinter dem Editor.
  * Editor bleibt als Vordergrund-Overlay nutzbar, ohne dass Datei-Explorer oder andere UI-Elemente im Hintergrund ausgelöst werden.

#### Reliability

* Bekannte Zustände gezielt gehärtet statt Layoutlogik erneut umzubauen.
* Keine neuen Darstellungsmodi eingeführt.
* Bestehendes Mobile-/PC-Verhalten aus 1.6.14.2 bleibt erhalten.
* Version auf `WinoMCConsole/1.6.14.3` angehoben.

### 1.6.14.2

#### UX / Mobile Live Console

* Mobile Größenlogik der Live Console überarbeitet.
* `Groß` ist auf Mobile wieder ein großer angedockter Konsolenmodus und kein Vollbild-Alias mehr.
* `Vollbild` ist nun der einzige echte Vollbildmodus.
* Erneuter Klick auf `Vollbild` beziehungsweise der angezeigte `Normal`-Button kehrt zuverlässig zur vorherigen Größe zurück.
* Mobile Konsolengrößen begrenzt:
  * `Kompakt`: kleinste nutzbare Ansicht mit Eingabe und ungefähr drei Logzeilen.
  * `Normal`: mittlere Standardansicht.
  * `Groß`: maximal etwa halbe Bildschirmhöhe.
  * `Vollbild`: echtes Overlay für längere Konsolenarbeit.
* Mobile Touch-Verhalten der Konsolenbuttons stabilisiert, damit keine Textmarkierung oder falsche Button-Aktion ausgelöst wird.

#### UX / Mobile Dateimanager

* Mobile Dateimanager-Ansicht stärker auf die Dateiliste fokussiert.
* Sekundäre Werkzeuge bleiben hinter `Werkzeuge anzeigen` gebündelt, unabhängig von der tatsächlichen CSS-Browserbreite.
* Kopfbereich des Dateimanagers kompakter gestaltet.
* Status, Beschreibung, Breadcrumb und doppelte Explorer-Aktionsleiste auf Mobile reduziert oder ausgeblendet.
* Upload-Zone kompakter gemacht.
* Dateiliste erhält deutlich mehr Höhe und bleibt der zentrale Arbeitsbereich.
* Mobile Datei-Karten kompakter gestaltet:
  * kleinere Abstände,
  * weniger Label-Ballast,
  * kompaktere Aktionstaste,
  * bessere Scrollbarkeit.

#### Maintenance

* Version auf `WinoMCConsole/1.6.14.2` angehoben.
* Kein Backend-/Dateisystemverhalten verändert.
* Security-/CodeQL-Logik aus den vorherigen Versionen bleibt unverändert.
* Lokale Prüfungen:
  * `python3 -m py_compile`
  * `node --check` für das eingebettete JavaScript
  * ZIP-Struktur geprüft

### 1.6.14.1

#### UX / Live Console

* Vollbild-Schaltfläche der Live Console korrigiert.
* Ein Klick auf **Vollbild** öffnet die Live Console als Vollbild-Overlay.
* Ein erneuter Klick auf dieselbe Schaltfläche kehrt zuverlässig zur vorherigen Größe zurück.
* Der Button zeigt im Vollbildmodus nun korrekt **Normal** an und führt die Rückkehr zur vorherigen Größe aus.
* Die alte doppelte Behandlung der Vollbild-Schaltfläche wurde abgefangen, damit ältere Größen-Handler den Klick nicht mehr vorher verbrauchen.

#### UX / PC Navigation

* Eingeklappte PC-Navigation weiter bereinigt.
* Bei kleinen PC-Browserfenstern zeigt die eingeklappte Navigation jetzt konsequent nur Icons.
* Abgeschnittene oder halb sichtbare Menütexte in der Icon-Leiste wurden unterbunden.
* Der Inhaltsbereich bleibt neben der eingeklappten Navigation nutzbar.

#### UX / Mobile Dateimanager

* Mobile Dateimanager-Ansicht kompakter gestaltet.
* Sekundäre Dateimanager-Werkzeuge werden auf Mobile hinter einer neuen Schaltfläche **Werkzeuge anzeigen** zusammengefasst.
* Standardmäßig sichtbar bleiben nur die wichtigsten Felder zum Navigieren im Dateisystem.
* Datei-Inhaltsbereich erhält mehr vertikalen Platz.
* Dateiliste nutzt den verfügbaren Platz besser aus und bleibt scrollbar.
* Upload-Zone und Kopfbereich wurden auf Mobile reduziert, damit der Explorer nicht mehr von Bedienelementen verdrängt wird.

#### Maintenance

* Version auf `WinoMCConsole/1.6.14.1` angehoben.
* Python-Syntaxprüfung mit `python3 -m py_compile` durchgeführt.
* JavaScript-Syntaxprüfung mit `node --check` durchgeführt.
* Repo-ZIP-Struktur geprüft.

### 1.6.14

#### UX / Navigation

* PC-Workbench-Navigation im klassischen PC-Modus erneut stabilisiert.
* Eingeklappte PC-Navigation hinterlässt keinen großen leeren Zwischenraum mehr.
* PC-Workbench-Button wird nach dynamischen UI-Aufräumarbeiten erneut verdrahtet und bleibt funktionsfähig.

#### Live Console

* Neue Vollbild-Funktion für die Live Console ergänzt.
* Vollbild funktioniert jetzt in klassischer PC-Ansicht, PC-Workbench und Mobile.
* Erneuter Druck auf **Vollbild** kehrt zur vorherigen Konsolengröße zurück.
* Im eingeklappten Zustand wird nur noch **Ausklappen** angezeigt; Kompakt, Normal, Groß und Anzeige leeren werden ausgeblendet.
* Mobile Kompaktansicht leicht erhöht, damit Logzeilen und Eingabe besser erreichbar bleiben.

#### Serverübersicht / Monitoring

* Übersicht um Server-Metriken erweitert:
  * Spieleranzeige aus dem letzten `list`-Output
  * Arbeitsspeicher-Verbrauch
  * Speicherplatz des `/config`-Datenbereichs
  * System-Load als Zusatzinformation
* Status-API um `metrics` erweitert.
* Nach dem Befehl `list` wird die Spieleranzeige automatisch nachgeladen.

#### Maintenance

* Version auf `WinoMCConsole/1.6.14` angehoben.
* Datei syntaktisch geprüft.
* ZIP-Struktur für den Repo-Pfad geprüft.

### 1.6.13.2

#### UX / Mobile Live Console

* Mobile Live-Console-Größenlogik überarbeitet.
* Der mobile Zieh-/Resize-Griff wurde deaktiviert, da Touch-Browser diesen Bereich zu leicht als Markier-/Scrollgeste interpretieren.
* Mobile Größen sind jetzt bewusst über Schaltflächen gesteuert:
  * **Kompakt**: Eingabe bleibt sichtbar, Logbereich zeigt ungefähr drei Zeilen.
  * **Normal**: größerer Logbereich mit ungefähr zehn Zeilen.
  * **Vollbild**: Live Console öffnet als Vollbild-Bottom-Sheet ohne Seitenwechsel oder Refresh.
* Im mobilen Kompaktmodus bleibt die Befehlseingabe sichtbar.
* iOS-/Browser-Safe-Area bleibt berücksichtigt.

#### UX / Mobile Editor

* Datei-Editor auf Mobile neu ausgerichtet.
* Editor öffnet jetzt als echtes Vollbild-Overlay über der Oberfläche.
* Der Inhaltsbereich bekommt den Hauptplatz und ist nicht mehr auf wenige Zeilen gequetscht.
* Editor-Bedienelemente liegen kompakt unten und überlappen den Inhalt nicht mehr.
* Hinweisboxen werden mobil ausgeblendet, damit der Textbereich nutzbar bleibt.

#### UX / Datei-Explorer

* Beim Öffnen einer Datei im Editor wird der Editor sichtbar in den Fokus gebracht.
* Das verhindert den Eindruck, dass beim Öffnen einer weiter unten liegenden Datei nichts passiert.

#### Maintenance

* Version auf `WinoMCConsole/1.6.13.2` angehoben.
* Datei syntaktisch geprüft.

### 1.6.13.1

#### UX / Navigation

* PC-Workbench wieder als eigener Navigationspunkt in der PC-Ansicht ergänzt.
* PC-Workbench bleibt auf Mobile bewusst ausgeblendet, da der Modus dort keinen sinnvollen Nutzen hat.
* Alte Legacy-Einträge wie `Desktop-Modus` werden weiterhin bereinigt, ohne den neuen PC-Workbench-Eintrag zu entfernen.

#### Konsole / Befehlshilfe

* Befehlshilfe stark erweitert und an die offizielle Minecraft-Bedrock-Befehlsliste angepasst.
* Gamerules vollständig ergänzt, inklusive Boolean-, Integer- und `playerwaypoints`-Varianten.
* Vorschläge werden auf PC und Mobile nur noch in die Eingabe übernommen und niemals direkt ausgeführt.
* Mobile Touch-Auswahl der Vorschläge abgesichert, damit kein unbeabsichtigter Submit ausgelöst wird.
* Platzhalter-Befehle wie `gamemode creative <player>` bleiben als editierbare Eingabe stehen, bis der Nutzer den fehlenden Wert ergänzt und selbst sendet.

#### Mobile UX

* Editor-Overlay auf Mobile korrigiert: Bedienelemente überlappen den Inhaltsbereich nicht mehr.
* Editor-Aktionen sind mobil horizontal scrollbar und nehmen weniger vertikalen Platz ein.
* Live-Console-Schieber auf Mobile wieder nutzbar gemacht.
* Eingeklappte mobile Live Console kann über den Schieber wieder in einen normalen, veränderbaren Zustand gebracht werden.

#### Dashboard

* Dashboard-Kacheln lösen beim Klick auf die Kachel selbst keinen Befehl mehr aus.
* Befehle werden nur noch über die sichtbare Schaltfläche `Ausführen` gestartet.
* Drag & Drop am PC bleibt erhalten; Mobile behält das Aktionsmenü.

#### Maintenance

* Version auf `WinoMCConsole/1.6.13.1` angehoben.
* Datei syntaktisch geprüft.
* JavaScript extrahiert und mit Node geprüft.

### 1.6.13

#### UX / Shell Cleanup

* PC- und Mobile-Erkennung überarbeitet: schmale PC-Browserfenster werden nicht mehr fälschlich wie Mobile/Tablet behandelt.
* Mobile bleibt Mobile: Die PC-Workbench ist auf Smartphones bewusst nicht mehr auswählbar und alte Desktop-/Workbench-Menüeinträge werden bereinigt.
* Klassische PC-Ansicht behält auch bei kleineren Browserfenstern eine echte linke Navigation statt einer kaputten horizontalen Zwischenansicht.
* Veraltete `Desktop-Modus`-/`Workbench`-Navigationseinträge werden beim Laden automatisch entfernt.

#### Live Console

* Eingeklappte Live Console zeigt jetzt in allen Ansichten nur noch **Ausklappen**.
* Zusätzliche Größen-, Fenster- und Leer-Buttons werden im eingeklappten Zustand ausgeblendet.
* iPhone/Safari-Darstellung verbessert: Die eingeklappte Konsole liegt höher und bleibt oberhalb der Browser-Bedienleiste erreichbar.
* Menüpunkt **Konsole** wurde zur echten Kommandozentrale erweitert, statt leer oder redundant zu wirken.

#### Intelligente Befehlseingabe

* Neue nicht störende Befehlshilfe für Minecraft-Bedrock-Serverbefehle ergänzt.
* Vorschläge erscheinen nur beim Tippen und werden erst per Klick/Touch übernommen.
* Funktioniert ohne Tab-Taste und ist damit auch mobil bedienbar.
* Enthält häufige Server-, Spieler-, Welt-, Gamerule-, Backup-, Chat-, Inventar- und Expertenbefehle.

#### Dashboard

* Dashboard-Kacheln können am PC per Drag & Drop neu angeordnet werden.
* Mobile behält bewusst die sicheren Menüaktionen, da Drag & Drop auf Touch-Geräten weniger zuverlässig ist.
* Kachel-Aktionen wurden in ein kompaktes Menü verschoben: Nach oben, Nach unten, Entfernen.
* Die bisherigen Sortierpfeile liegen nicht mehr dauerhaft sichtbar im Layout.

#### Dateimanager / PC Layout

* Dateiexplorer erhält im PC-Modus mehr nutzbare Höhe.
* Datei-Liste bekommt zusätzlichen unteren Scroll-Puffer, damit Elemente nicht von der Live Console verdeckt werden.
* PC-Workbench-Dateifenster erhält größere Mindestabmessungen für sinnvolles Arbeiten.

#### Maintenance

* Version auf `WinoMCConsole/1.6.13` angehoben.
* Keine Änderung an bestehenden Sicherheits-/CodeQL-Pfadprüfungen.
* Datei syntaktisch geprüft und Paketstruktur vorbereitet.

### 1.6.12

#### Webinterface / Rethinking

* Webinterface-UX neu ausgerichtet nach dem Prinzip: **Keep it simple, modern UX, weniger Modi**.
* Tablet wurde als eigener Produktmodus entfernt.
* Es gibt jetzt nur noch zwei Zieloberflächen:
  * **Mobile UX** für Smartphones und kleine Touch-Displays
  * **PC UX** für Desktop-Browser, Laptops und große Displays
* Alte gespeicherte Tablet-Zustände werden automatisch auf `Auto` normalisiert.
* Die automatische Erkennung unterscheidet nicht mehr zwischen Mobile, Tablet und Desktop, sondern nur noch zwischen Mobile und PC.

#### Mobile UX

* PC-Workbench/Desktop-Modus ist auf Mobilgeräten deaktiviert.
* Mobile Geräte bleiben konsequent in der mobilen Oberfläche.
* Alte Desktop-/Workbench-Zustände aus vorherigen Sitzungen werden auf Mobile automatisch entfernt.
* Die Live Console bleibt im eingeklappten Zustand besser erreichbar und verschwindet nicht mehr unter der Browser-/iOS-Bedienleiste.
* Der mobile Dateimanager ist kompakter:
  * weniger hohe Dateikarten
  * kompaktere Metadaten
  * Aktionsmenü statt klobiger Button-Blöcke

#### PC UX

* PC-Browser werden nicht mehr fälschlich als Tablet behandelt.
* PC-Workbench bleibt PC-only und wird nicht mehr auf Mobile angeboten.
* Der Button wurde von `Desktop-Modus` auf `PC-Workbench` umbenannt, damit klarer ist, dass dieser Modus nur für große Displays gedacht ist.
* Klassische PC-Ansicht und PC-Workbench werden sauberer getrennt.

#### Dateimanager Re-Design

* Dateiexplorer und Editor wurden entkoppelt.
* Der Dateiexplorer nutzt jetzt den verfügbaren Arbeitsbereich deutlich besser.
* Der Editor ist nicht mehr dauerhaft rechts neben dem Explorer sichtbar.
* Beim Bearbeiten oder Vorschauen einer Datei öffnet sich der Editor als Overlay/Vollbild-Panel ohne Seitenwechsel und ohne Refresh.
* Dadurch bleibt der Explorer übersichtlicher und die Dateiliste bekommt deutlich mehr Platz.
* Das bestehende Aktionen-Menü pro Datei bleibt erhalten und wird auf Mobile/PC einheitlicher dargestellt.

#### Maintenance / Cleanup

* Adaptive UX-Logik vereinfacht.
* Alte `tablet`-Preference wird nicht mehr als gültige Auswahl akzeptiert.
* UI-State-Wechsel zwischen Mobile, PC klassisch und PC-Workbench wurden robuster gemacht.
* Version auf `WinoMCConsole/1.6.12` angehoben.

### 1.6.11.4

#### UX / Adaptive Layout

* Auto-Erkennung für Desktop/Tablet/Mobil korrigiert.
* PC-Browser mit Touch-Unterstützung werden nicht mehr fälschlich als Tablet erkannt.
* Defekte Tablet-/Mobile-Navigation nach vorher eingeklappter Sidebar behoben.
* Mobile und Tablet-Profile entfernen verwaiste Sidebar-Rail-Zustände automatisch.

#### Mobile / iPhone

* Live Console berücksichtigt nun die sichtbare Browserfläche über `visualViewport`.
* Eingeklappte Live Console bleibt über der iOS-/Browser-Bedienleiste erreichbar.
* Im eingeklappten Zustand wird mobil nur noch der relevante Ausklappen-Button angezeigt.
* Console-Bedienelemente verschwinden nicht mehr im unteren Bildschirmrand.

#### Desktop / Klassische Ansicht

* Der Button `Desktop-Modus` / `Klassische Ansicht` richtet sich nun nach dem echten aktiven Zustand und nicht nur nach dem erkannten UX-Profil.
* Wechsel zwischen klassischer Ansicht und Desktop-Modus robuster gemacht.
* Version auf `WinoMCConsole/1.6.11.4` angehoben.

### 1.6.11.3

#### UX / Classic Console

* Bug behoben, bei dem die Live Console in der klassischen Ansicht nach dem Einklappen durch Ziehen am Resize-Griff in einen widersprüchlichen Zustand geraten konnte.
* Der Resize-Griff ist im eingeklappten oder minimierten klassischen Zustand nun deaktiviert.
* Beim manuellen Resize wird die Console sauber in den normalen Modus zurückgeführt und die Beschriftung der Buttons bleibt korrekt.

#### UX / Dateimanager

* Scrollverhalten des Dateiexplorers in der klassischen PC-Ansicht erneut stabilisiert.
* Der Dateimanager nutzt auf großen Bildschirmen nun einen festen, viewportbasierten internen Scrollbereich oberhalb der Live Console.
* Untere Dateien und Aktionen bleiben erreichbar, auch wenn die Live Console geöffnet ist.

#### UX / Mobile & Desktop-Wechsel

* Wechsel von Mobile/Tablet in den Desktop-Modus robuster gemacht.
* Der Desktop-Modus wird bei manueller Auswahl nun direkt erzwungen und nicht mehr durch die automatische Geräteerkennung zurückgesetzt.
* Wechsel vom Desktop-Modus zurück in die klassische Ansicht bereinigt verwaiste Desktop-Fenster, Overlays, Inline-Positionen und blockierende Zustände zuverlässiger.

#### Maintenance

* Version auf `WinoMCConsole/1.6.11.3` angehoben.
* Bestehende Sicherheits- und Dateimanager-Funktionen aus 1.6.11.2 bleiben erhalten.

### 1.6.11.2

#### UX / Responsive Layout

* Fehler behoben, bei dem die klassische Ansicht am PC nach aktivem Desktop-Modus nicht mehr zuverlässig geöffnet wurde.
* Wechsel von Desktop-Modus zurück zur klassischen Ansicht stabilisiert, ohne dass ein Seitenrefresh nötig ist.
* Verwaiste Desktop-Zustände werden beim Wechsel in die klassische Ansicht nun konsequent entfernt:
  * Desktop-Fensterklassen
  * Desktop-Taskbar/Layer
  * maximierte Karten-Overlays
  * blockierende Pointer-/Overlay-Zustände
* Mobile Bedienbarkeit nach dem Wechsel Desktop → Klassisch verbessert.
* Klassische Ansicht bleibt im Auto-Modus möglich, auch wenn der PC grundsätzlich als Desktop-Gerät erkannt wird.

#### Dateimanager

* Dateiaktionen pro Datei/Ordner in ein kompaktes Aktionsmenü zusammengefasst.
* Die vorher sehr klobigen Aktionsbuttons werden nicht mehr dauerhaft untereinander angezeigt.
* Aktionsmenü funktioniert in Mobile-, Tablet-, klassischer PC- und Desktop-Ansicht.
* Bestehende Aktionen bleiben erhalten:
  * Öffnen / Download / Editor
  * ZIP / Export
  * Verschieben
  * MD5-Prüfung
  * Entpacken
  * Löschen / Wiederherstellen

#### Mobile UX

* Dateiaktionen auf iPhone und kleinen Displays platzsparender dargestellt.
* Schaltflächen im Dateimanager nehmen deutlich weniger permanenten Platz ein.
* Mobile Ansicht bleibt nach Layoutwechseln besser bedienbar.

#### Maintenance

* Version auf `WinoMCConsole/1.6.11.2` angehoben.
* Bestehende CodeQL-/Security-Umbauten bleiben erhalten.
* Datei syntaktisch geprüft.

### 1.6.11.1

#### UX / Mobile

* Fehler behoben, bei dem die Oberfläche nach dem Wechsel vom Desktop-Modus zurück in die klassische Ansicht auf Mobile/Touch-Geräten teilweise nicht mehr korrekt bedienbar war.
* Verwaiste Desktop-Fensterzustände, Inline-Größen und Desktop-Overlays werden beim Wechsel in die klassische Ansicht nun konsequent bereinigt.
* Mobile Dateimanager-Ansicht kompakter gestaltet:
  * kleinere Aktionsbuttons
  * horizontale Aktionsleiste je Datei
  * weniger vertikaler Platzverbrauch pro Datei
  * kompaktere Upload-Zone und Toolbar
* Mobile Safe-Area- und Scroll-Verhalten aus den vorherigen Versionen bleibt erhalten.

#### File Explorer

* Dateien und Ordner können nun über eine neue Schaltfläche **Verschieben** verschoben werden.
* Drag & Drop innerhalb des Dateimanagers ergänzt:
  * Dateien/Ordner können auf Ordner gezogen werden.
  * Dateien/Ordner können auf die Upload-/Drop-Zone gezogen werden, um sie in den aktuell geöffneten Ordner zu verschieben.
  * Drag & Drop ist in Mobile, Tablet und Desktop verfügbar, sofern das Gerät Drag & Drop unterstützt.
* Neue MD5-Schaltfläche für Dateien ergänzt.
* MD5-Hash wird serverseitig berechnet und in der Oberfläche angezeigt; wenn möglich wird der Hash in die Zwischenablage kopiert.
* Verschieben ist im Papierkorb gesperrt, damit Papierkorb-Einträge weiterhin über Wiederherstellen/Löschen verwaltet werden.

#### Security / Safety

* Neue Backend-API `/api/files/move` nutzt die vorhandene sichere Root-/Pfadprüfung.
* Verschieben des Wurzelordners wird blockiert.
* Verschieben eines Ordners in sich selbst wird blockiert.
* Zielüberschreibung ist nur nach expliziter Bestätigung möglich.
* Bei überschriebenen Dateien wird, sofern möglich, vorher ein Backup erstellt.
* Neue Backend-API `/api/files/md5` arbeitet nur mit Dateien aus erlaubten WinoMC-Dateibereichen.

#### Maintenance

* Version auf `WinoMCConsole/1.6.11.1` angehoben.
* Datei syntaktisch geprüft.
* Bestehende adaptive Profile `Auto`, `Mobil`, `Tablet` und `Desktop` bleiben erhalten.

### 1.6.11

#### UX / Adaptive Layout

* Adaptive UX Engine für Mobile, Tablet und Desktop ergänzt.
* Neue Darstellungsmodi in der Oberfläche:
  * Auto
  * Mobil
  * Tablet
  * Desktop
* Auto-Modus erkennt Viewport, Touch-Fähigkeit, Pointer-Typ und Ausrichtung und wählt daraus das passende UX-Profil.
* Die gewählte Darstellung wird lokal im Browser gespeichert.
* Der bisherige Desktop-Modus bleibt erhalten, ist jetzt aber Teil des neuen Desktop-Profils.
* Der Button „Desktop-Modus“ wechselt künftig sauber zwischen Desktop-Workbench und automatischer klassischer Ansicht.

#### Mobile UX

* Eigene Mobile-Ansicht für iPhone und Android vorbereitet.
* Header, Navigation, Karten, Aktionen und Formulare wurden für kleine Touch-Displays angepasst.
* Navigation wird auf Mobile als kompakte horizontale Touch-Navigation dargestellt.
* Eingeklappte Sidebar kann auf Mobile nicht mehr als defekte vertikale Icon-Leiste hängen bleiben.
* Live Console wird auf Mobile als kompakter Bottom-Sheet-Bereich behandelt.
* iOS Safe-Area wird berücksichtigt, damit Inhalte und Bedienelemente nicht hinter Browser- oder Systemleisten verschwinden.
* Hauptinhalt bleibt oberhalb der Live Console scrollbar.
* Konsolenbedienung, Eingabefeld und Senden-Button bleiben erreichbar.

#### Tablet UX

* Eigene Tablet-Zwischenansicht für iPad, Android-Tablets und Touch-Laptops ergänzt.
* Tablet-Navigation ist touchfreundlich und horizontal scrollbar.
* Dashboard und Karten nutzen den verfügbaren Platz besser als Mobile, bleiben aber einfacher als die Desktop-Workbench.
* Dateimanager nutzt auf größeren Tablets weiterhin eine geteilte Explorer-/Editor-Ansicht.
* Live Console bleibt als stabiles Dock erreichbar, ohne den Inhalt unbrauchbar zu verdecken.

#### Dateimanager / Mobile

* Dateiliste wird auf Mobile als Kartenliste dargestellt statt als breite Tabelle.
* Dateiaktionen bleiben auf kleinen Displays erreichbar und umbrechen kontrolliert.
* Dateiname, Typ, Größe, Änderungsdatum und Aktionen bleiben auf Mobile lesbar.
* Editor und Vollbild-Editor berücksichtigen die mobile Live Console.

#### Maintenance

* Version auf `WinoMCConsole/1.6.11` angehoben.
* Lokale Syntaxprüfung mit `python3 -m py_compile` durchgeführt.
* JavaScript-Syntaxprüfung mit `node --check` durchgeführt.
* Bestehende CodeQL-/Security-Umbauten aus den vorherigen Versionen bleiben erhalten.

### 1.6.1.9

#### Web Console / Layout

* Live-Konsole im klassischen Layout robuster gegen ungünstige Browsergrößen gemacht.
* Bedienelemente der Live-Konsole bleiben jetzt erreichbar, auch wenn das Fenster in den mittelbreiten Layoutbereich wechselt.
* Console-Buttons laufen bei wenig Breite nicht mehr unterhalb des sichtbaren Dock-Bereichs aus dem Bild.
* Console-Buttons bleiben auf einer horizontal scrollbaren Bedienleiste, statt den Header unkontrolliert nach unten zu vergrößern.
* Eingabezeile und Logbereich werden innerhalb der festen Live-Konsole stabiler berechnet.
* Eingeklappte Konsole wurde leicht erhöht, damit Kopfzeile und Bedienung nicht abgeschnitten werden.
* Bei niedriger Fensterhöhe wird die Konsolenhöhe begrenzt, damit keine Bedienelemente aus dem sichtbaren Bereich rutschen.

#### Maintenance

* Version auf `WinoMCConsole/1.6.1.9` angehoben.
* CodeQL-/Pfadsicherheitslogik aus 1.6.1.7 und der Dateiexplorer-Scrollfix aus 1.6.1.8 bleiben erhalten.
* Änderung betrifft nur Layout/CSS der Live-Konsole.

### 1.6.1.8

#### Web Console / Dateimanager

* Scrollverhalten im klassischen Dateiexplorer der Webkonsole korrigiert.
* Die Dateiliste erhält im klassischen Modus nun einen eigenen vertikalen Scrollbereich.
* Dateien am unteren Ende langer Ordnerlisten bleiben dadurch erreichbar, auch wenn die Live-Konsole unten eingeblendet ist.
* Tabellenkopf im Dateimanager bleibt beim Scrollen sichtbar.
* Desktop-Modus bleibt unverändert, da dort bereits das Fenster selbst korrekt scrollt.

#### UI / Layout

* Klassischer Dateimanager berücksichtigt die feste Konsolenleiste am unteren Bildschirmrand besser.
* Explorer- und Editor-Karte nutzen im klassischen Modus nun eine begrenzte Höhe mit internem Scrollen statt unkontrolliert nach unten aus dem sichtbaren Bereich zu wachsen.
* Touch-/Ingress-Scrolling für Home Assistant verbessert.

#### Maintenance

* Version auf `WinoMCConsole/1.6.1.8` angehoben.
* Keine Änderungen an der CodeQL-Sicherheitslogik aus 1.6.1.7.
* Keine Änderungen an Nutzeroptionen oder API-Endpunkten.

### 1.6.1.7

#### Security / CodeQL

* Weitere Reduzierung der offenen CodeQL-Meldungen im `winomc-console-server`.
* Dateisystem-Zugriffe strukturell überarbeitet, damit geprüfte Pfade nicht mehr als rohe, request-beeinflusste Strings bis zu `open`, `listdir`, `stat`, `getsize`, `remove`, `replace`, `copy2`, `move` oder `mkstemp` weitergereicht werden.
* Neue interne `VerifiedPath`-Pfadklasse ergänzt:
  * Pfade werden weiterhin normalisiert und gegen erlaubte WinoMC-Root-Verzeichnisse geprüft.
  * Symlink-Komponenten bleiben blockiert.
  * Dateisystem-Sinks erhalten nun einen geprüften `PathLike`-Wrapper statt direkt den aus Request-Daten abgeleiteten String.
* Root-, interne und Runtime-Pfadoperationen vereinheitlicht über:
  * `verify_root_path(...)`
  * `verify_internal_path(...)`
  * `verify_runtime_path(...)`
* Mehrere verbleibende `py/path-injection`-Flows aus den allgemeinen Dateioperationen entschärft, insbesondere bei:
  * Datei öffnen
  * Existenzprüfung
  * Dateitypprüfung
  * Verzeichnislisting
  * Dateigröße und Stat-Informationen
  * Ordnererstellung
  * temporären Dateien
  * Entfernen, Ersetzen, Kopieren und Verschieben
* FIFO-Zugriff für Konsolenbefehle auf geprüften Runtime-Pfad umgestellt.
* Dateierstellung weiter gehärtet: der sichere Open-Opener verwendet nun restriktive Rechte `0600` statt `0666`.

#### Reliability

* Unbenutzte lokale Variablen entfernt:
  * `zip_path = None` im temporären ZIP-Zweig
  * `log_parent` beim Start der Webkonsole
* Temporäre ZIP-Erstellung, gespeicherter ZIP-Export, Upload, Download, Editor, Papierkorb und ZIP-Slip-Schutz erneut per Smoke-Test geprüft.
* Datei erneut mit `python3 -m py_compile` syntaktisch geprüft.

#### Maintenance

* Keine CodeQL-/LGTM-Suppression-Kommentare verwendet.
* Keine reine Alert-Unterdrückung.
* Zentrale Sicherheitslogik klarer getrennt in:
  * Pfadvalidierung
  * geprüfte `PathLike`-Objekte
  * eigentliche Dateisystemoperationen
* Version auf `WinoMCConsole/1.6.1.7` angehoben.

### 1.6.1.6

#### Security / CodeQL

* Download- und ZIP-Auslieferung im `winomc-console-server` strukturell überarbeitet.
* Die generische Funktion `_send_file(file_path, ...)` wurde entfernt, damit kein request-beeinflusster Pfad mehr als Parameter bis zu `open(...)` weitergereicht wird.
* Temporäre ZIP-Downloads werden nun über einen serverseitig erzeugten temporären Dateihandle erstellt und direkt aus diesem Handle gestreamt.
* ZIP-Dateinamen für temporäre Downloads und gespeicherte Exporte werden serverseitig erzeugt und nicht mehr aus Request-Werten wie `root` zusammengesetzt.
* Der von CodeQL gemeldete Flow aus `create_zip_from_paths(...)` über `zip_info["zip_path"]` in `_send_file(...)` wurde entfernt.
* Normale Datei-Downloads laufen über eine eigene Root-/Relativpfad-Downloadfunktion statt über einen generischen Vollpfad-Streamer.
* ZIP-Ziele für gespeicherte Exporte werden über `mkstemp_root(...)` im erlaubten Export-Root erzeugt.
* Temporäre ZIPs ohne Export-Speicherung verwenden `tempfile.TemporaryFile(...)` und besitzen keinen von außen beeinflussbaren Pfadnamen.

#### Reliability

* ZIP-Streams werden nach der Auslieferung kontrolliert geschlossen.
* Unvollständige gespeicherte ZIP-Dateien werden bei Fehlern bereinigt.
* ZIP-Suffix-Erzeugung korrigiert, sodass gespeicherte Exportdateien wieder sauber mit `.zip` enden.
* Datei weiterhin syntaktisch mit `python3 -m py_compile` geprüft.

#### Maintenance

* Keine CodeQL-/LGTM-Suppression-Kommentare verwendet.
* Keine reine Alert-Unterdrückung.
* Der problematische Pfad-Parameter-Flow wurde aus dem Code entfernt.
* Interne Download-Auslieferung klarer getrennt in:
  * `_send_stream(...)` für bereits geöffnete sichere Handles
  * `_send_root_download(...)` für normale Downloads aus erlaubten WinoMC-Roots
  * `_send_zip_info(...)` für temporäre ZIP-Streams

### 1.6.1.5

#### Security / CodeQL

* Weitere echte Behebung der CodeQL-Meldungen `py/path-injection` im `winomc-console-server`.
* Die zentrale Änderung: Dateioperationen führen die Pfadvalidierung jetzt direkt in derselben Funktion aus, in der anschließend der Dateisystemzugriff erfolgt.
* `listdir_root(...)` und weitere Root-Dateioperationen wurden so umgebaut, dass CodeQL den Ablauf besser nachvollziehen kann:
  * Pfad wird mit `os.path.abspath(...)`, `os.path.realpath(...)` und `os.path.normpath(...)` kanonisiert.
  * Der kanonisierte Pfad wird direkt gegen den erlaubten Root-Bereich geprüft.
  * Erst danach erfolgt `os.listdir(...)`, `os.stat(...)`, `os.path.getsize(...)`, `open(...)`, `os.makedirs(...)`, `os.replace(...)`, `os.remove(...)`, `shutil.move(...)` oder `shutil.rmtree(...)`.
* Indirekte Muster wie `os.listdir(assert_safe_path(...))` beziehungsweise `safe_path = assert_safe_path(...); os.listdir(safe_path)` wurden für die relevanten Sinks entfernt.
* Runtime-Dateizugriffe für Log und FIFO wurden ebenfalls expliziter abgesichert:
  * `runtime_path_exists(...)`
  * `runtime_getsize(...)`
  * `open_runtime(...)`
  * `ensure_runtime_parent_dir(...)`
* Download-Auslieferung erneut angepasst:
  * Download-Pfad wird lokal in `_send_file(...)` kanonisiert und geprüft.
  * `isfile`, `getsize` und `open` verwenden danach denselben geprüften lokalen Pfad.
* ZIP-Erstellung und ZIP-Import weiter gehärtet:
  * `archive.write(...)`, `os.walk(...)` und `zipfile.ZipFile(...)` verwenden geprüfte lokale Pfade.
  * ZIP-Slip-Schutz bleibt aktiv.
* Interne Papierkorb- und Settings-Dateioperationen wurden von direkten `assert_safe_internal_path(...)`-Ausdrücken an Dateisystem-Sinks auf explizite sichere Wrapper umgestellt.

#### Reliability

* Leere `except: pass`-Blöcke bleiben entfernt.
* Temporäre Upload-, Editor-, ZIP- und Settings-Dateien werden weiterhin kontrolliert bereinigt.
* Symlink-Schutz bleibt aktiv, insbesondere bei Schreib-, Lösch-, Download- und Traversal-relevanten Pfaden.

#### Maintenance

* Keine CodeQL-/LGTM-Suppression-Kommentare verwendet.
* Keine Alert-Unterdrückung eingebaut.
* Die Sicherheitslogik wurde näher an das von CodeQL empfohlene Muster gebracht: normalisieren, gegen erlaubten Basisordner prüfen, danach erst Dateisystemzugriff.
* Lokale Prüfung durchgeführt:
  * `python3 -m py_compile`
  * AST-Check auf leere `except: pass`-Blöcke
  * Smoke-Tests für Listing, Lesen, Upload-Schreiben, Traversal-Block, Symlink-Block, ZIP-Slip-Block und ZIP-Erstellung

### 1.6.1.4

#### Security / CodeQL

* CodeQL-Handling für `py/path-injection` im `winomc-console-server` erneut überarbeitet.
* Pfadprüfung so angepasst, dass der geprüfte Pfad für CodeQL klarer als bereinigter Wert erkennbar ist:
  * Normalisierung über `os.path.normpath(...)`
  * Symlink-Auflösung über `os.path.realpath(...)`
  * explizite Base-Prefix-Prüfung mit `startswith(...)`
  * separate Behandlung des Root-Ordners selbst
* `os.path.commonpath(...)` aus der zentralen CodeQL-relevanten Pfadprüfung entfernt, da CodeQL diese Custom-Hilfslogik nicht zuverlässig als Sanitizer erkannt hat.
* Download-Auslieferung überarbeitet:
  * validierter Download-Pfad wird nur einmal berechnet
  * `isfile`, `getsize` und `open` arbeiten danach mit demselben geprüften lokalen Pfad
  * kein erneutes Verschachteln von `assert_safe_download_path(...)` direkt im Filesystem-Sink
* Schutz gegen Path-Traversal bleibt erhalten und wurde CodeQL-freundlicher formuliert.
* Symlink-Schutz bleibt aktiv, um Ausbrüche aus erlaubten WinoMC-Verzeichnissen zu verhindern.

#### Reliability

* Datei erneut syntaktisch geprüft.
* Leere `except: pass`-Blöcke bleiben entfernt.
* Bestehende Sicherheitsprüfungen für Upload, Download, Editor, ZIP-Import, ZIP-Export, Papierkorb und Runtime-Dateien bleiben erhalten.

#### Maintenance

* Keine CodeQL-/LGTM-Suppression-Kommentare verwendet.
* Kein reines Unterdrücken von Alerts.
* Sicherheitslogik näher an das von CodeQL empfohlene Muster gebracht: erst normalisieren, dann gegen einen erlaubten Basisordner prüfen, danach erst Dateisystemzugriff.
* Version für Release `1.6.1.4` vorbereitet.

### 1.6.1.3

#### Security / CodeQL

* Echte Behebung der offenen CodeQL-Meldungen im `winomc-console-server`
* Unsichere Datei- und Pfadoperationen im Web-Dateimanager überarbeitet
* Schutz gegen Path-Traversal verbessert, insbesondere bei:
  * Datei-Downloads
  * Datei-Uploads
  * Datei-Bearbeitung
  * Datei-Löschung
  * Papierkorb-Funktionen
  * Wiederherstellung aus dem Papierkorb
  * ZIP-Import und ZIP-Export
* Pfadzugriffe werden nun konsequent gegen erlaubte WinoMC-Verzeichnisse geprüft
* Zugriffe außerhalb der freigegebenen Datenbereiche werden blockiert
* `..`-Traversal, ungültige Pfadsegmente und manipulierte Zielpfade werden abgewiesen
* Schutz gegen ZIP-Slip beim Entpacken von Archiven ergänzt
* Symlink-basierte Umgehungen im Dateimanager blockiert
* Runtime-Dateipfade für Konsole, Log und FIFO stärker eingeschränkt

#### Reliability

* Leere `except: pass`-Blöcke entfernt
* Fehlerbehandlung im `winomc-console-server` verbessert
* Relevante Fehler werden nun sauber protokolliert oder kontrolliert behandelt
* Stille Fehlerunterdrückung reduziert, um Debugging und Wartbarkeit zu verbessern

#### Maintenance

* Alte CodeQL-/LGTM-Suppression-Kommentare entfernt
* CodeQL-Probleme nicht mehr nur kommentiert, sondern technisch behoben
* Sicherheitsrelevante Hilfsfunktionen für sichere Pfadauflösung und Dateioperationen ergänzt
* Keine beabsichtigten Änderungen am normalen Verhalten der Webkonsole
* Keine Änderung an bestehenden Nutzeroptionen oder Add-on-Konfigurationen

### 1.6.1.2

* CodeQL-Pfadwarnungen (`py/path-injection`) in der Web-Konsole gehärtet.
* Pfadprüfung zentral auf `realpath` plus `commonpath` umgestellt.
* Upload, JSON-Upload, Datei-Editor, ZIP-Export/Entpacken, Papierkorb und Download-Pfade prüfen Ziele vor Dateioperationen erneut gegen erlaubte WinoMC-Root-Verzeichnisse.
* Add-on-Version auf 1.6.1.2 angehoben, damit Home Assistant die Sicherheitskorrektur als Update erkennt.

### 1.6.1.1

* Fehler bei der Erstellung der `allowlist.json` behoben.
* `ALLOW_LIST_USERS` im Format `Gamertag:XUID` wird jetzt korrekt in getrennte `name`- und `xuid`-Felder geschrieben.
* Name-only-Einträge wie `Gamertag` bleiben als Fallback weiterhin möglich.
* Verbindungsabbrüche mit Bedrock-Fehlerdetails wie `Boat` oder `Spyglass` bei aktivierter Allowlist behoben.

### 1.6.1

* Klassische Dateiexplorer-Ansicht korrigiert: Ordner- und Dateiliste besitzen jetzt eine eigene Scrollhöhe.
* Tabellenkopf der Dateiliste bleibt beim Scrollen sichtbar.
* Explorer- und Editorbereich laufen nicht mehr unter die angedockte Live Console.
* Add-on-Version auf 1.6.1 angehoben, damit Home Assistant die Änderung als Update erkennt.

### 1.6.0

* WinoMC Framework- und Host-Optimierungen ergänzt, ohne spielinterne Behavior Packs oder Gameplay-Eingriffe.
* Neuer Host-Optimierungsmodus für den Bedrock-Start ergänzt: `off`, `balanced`, `host_friendly`, `low_power`, `server_priority` und `expert`.
* Bedrock Dedicated Server wird jetzt über einen WinoMC-Optimierungs-Wrapper gestartet.
* Optionale CPU-Priorität, I/O-Priorität und CPU-Affinity für hostfreundlicheren Betrieb vorbereitet.
* Optionale jemalloc-Nutzung vorbereitet; automatisch konservativ, mit Fokus auf amd64 als primäres Ziel.
* Laufzeitanalyse beim Start ergänzt, inklusive Hinweisen für hohe Sichtweite, hohe Tickdistanz und große Spielerlimits.
* aarch64 bleibt experimentell, erhält aber konservative Host-Optimierungen und klare Log-Hinweise.
* Neue Home-Assistant-UI-Optionen für WinoMC Host-Optimierung ergänzt.
* Add-on-Version auf 1.6.0 angehoben, damit Home Assistant die Änderung als Update erkennt.

### 1.5.7.6

* Klassische Ansicht erweitert: Neuer Menüpunkt **Desktop-Modus** direkt unter **Experten** ergänzt.
* Der neue Menüpunkt schaltet sofort in den Desktop-Modus, ohne vorher über die Übersicht gehen zu müssen.
* Add-on-Version auf 1.5.7.6 angehoben, damit Home Assistant die Änderung als Update erkennt.

### 1.5.7.5

* Desktop-Icon-Layer für breite Home-Assistant-Ingress-Ansichten korrigiert.
* Der Desktop nutzt jetzt auch oberhalb des bisherigen kleinen Breakpoints ein relatives, stabiles Icon-Grid.
* Der scheinbar blockierende dunkle Hintergrund in größeren Browserfenstern wird dadurch vermieden.
* Desktop-Icons bleiben sichtbar und anklickbar, ohne das Browserfenster verkleinern zu müssen.
* Add-on-Version auf 1.5.7.5 angehoben, damit Home Assistant die Änderung als Update erkennt.

### 1.5.7.4

* Desktop-Workbench-Viewport korrigiert: Der Desktop-Modus belegt jetzt den kompletten sichtbaren Ingress-Bereich und erzeugt keinen zusätzlichen Root-Scrollbereich mehr.
* Alte gespeicherte Desktop-Fensterpositionen werden einmalig bereinigt, damit kein altes Übersicht-Fenster den Desktop großflächig verdeckt.
* Desktop-Fenster werden beim Öffnen und bei Größenänderungen wieder in den sichtbaren Bereich geklemmt.
* Die Übersicht wird im Desktop-Modus nicht mehr automatisch als großes Fenster geöffnet; der Desktop startet wieder frei nutzbar mit Icons und Taskleiste.
* Add-on-Version auf 1.5.7.4 angehoben, damit Home Assistant die Änderung als Update erkennt.

### 1.5.7.3

* Vor dem Start der Webconsole wird die eingebettete Datei winomc-console-server automatisch und idempotent gepatcht.
* Alte has-maximized-card / .card.maximized Overlay-Zustände werden entfernt.
* Das Desktop-Layer darf keine Klicks mehr blockieren.
* Desktop-Fenster, Icons, Taskbar, Startmenü und Konsole bleiben klickbar.
* Der Patch läuft nur beim Start und erkennt selbst, ob er schon vorhanden ist.

### 1.5.7.2

* Desktop-Overlay-Fix ergänzt
* Stale Maximized-Card-Overlays blockieren den Desktop-Modus nicht mehr
* Desktop-Workbench bereinigt beim Öffnen automatisch alte klassische Maximieren-Zustände
* Desktop-Icons und Fenster bleiben auch bei großen Viewports bedienbar

### 1.5.7.1

* Web-Schutz erweitert: Download und ZIP-Download werden jetzt ebenfalls gesperrt, solange der Web-Schutz aktiv ist
* Web-Schutz-Zustand wird zusätzlich per Cookie an das Backend gespiegelt, damit direkte Download-Endpunkte ebenfalls blockiert werden
* Seitenscrollbar-Hotfix ergänzt: Kopfzeile bleibt einzeilig, Scrollbar-Platz wird stabil reserviert und die klassische Ansicht springt nicht mehr nach unten

### 1.5.7

* Eingeklappte Navigation als Icon-Leiste korrigiert
* Menüicons bleiben bei geringer Höhe erreichbar und scrollbar

* Klassische Layout-Abstände für Übersicht, Dashboard und Dateimanager weiter bereinigt
* Dateimanager um Web-Schutz ergänzt: Änderungen, Upload, Entpacken, Löschen, Wiederherstellen und Export-Schreibaktionen können in der Weboberfläche gesperrt werden
* Web-Schutz klar benannt: betrifft nur die Weboberfläche, nicht die Server-Schreibrechte
* Papierkorb-Aufbewahrung persistent einstellbar: nie automatisch, 3, 7, 14, 30, 60 oder 90 Tage
* Papierkorb-Vorschau klarer vom Editor getrennt: Vorschau leeren / Vorschau Vollbild statt Editor-Aktionen
* Papierkorb-Dateien bleiben schreibgeschützt, bis sie wiederhergestellt werden
* Marketplace-/Pack-Hinweis verständlicher formuliert
* Dashboard-Kommandopalette stark erweitert um weitere Bedrock-Admin-Befehle mit gezielten Abfragen für Spielername, Menge, Koordinaten, Item, Effekt und weitere Parameter
* Dashboard-Kacheln und Aktionsbuttons weiter vereinheitlicht

### 1.5.6

* Mein Dashboard überarbeitet: keine lange Aktionsliste mehr, stattdessen kompakte Such-/Auswahlzeile im Stil einer Command Palette.
* Dashboard-Kacheln optisch vereinheitlicht und Ausführen-Schaltflächen konsistenter ausgerichtet.
* Papierkorb-Dateien sind im Editor nur noch als Vorschau geöffnet und können nicht mehr direkt gespeichert werden.
* Schreibzugriff auf den Papierkorb zusätzlich im Backend blockiert.
* Eingeklappte Sidebar in der klassischen Ansicht stabilisiert, damit Icons nicht mehr aus dem sichtbaren Bereich gescrollt werden.
* Abstände und Bedienflächen im Dateimanager weiter bereinigt.

### 1.5.5

* Klassische Ansicht weiter bereinigt und die Serversteuerung auf die Übersicht beschränkt
* Eingeklappte Navigation verbessert: echter Icon-only-Modus ohne horizontales Wegscrollen
* Live Console im Desktop-Modus vereinfacht: Fenstersteuerung über Minimieren, Maximieren und Schließen; Einklappen im Desktop-Modus entfernt
* Fehler behoben, bei dem die Desktop-Konsole zu klein wurde und nicht mehr sinnvoll bedienbar war
* Editor-Vollbild verbessert: Bedienleiste bleibt oben erreichbar und wird nicht mehr von der Live Console verdeckt
* Dateimanager erweitert: Löschen in einen WinoMC-Papierkorb ergänzt
* Papierkorb-Bereich ergänzt und automatisches Bereinigen alter Papierkorb-Inhalte vorbereitet
* Papierkorb kann über die Web Console geleert werden
* Wiederherstellen aus dem Papierkorb ergänzt
* Konfliktbehandlung beim Wiederherstellen ergänzt, falls am Originalpfad bereits wieder eine Datei oder ein Ordner existiert
* Papierkorb-Icon im Desktop-Modus ergänzt
* Direkter Papierkorb-Zugriff im klassischen Dateimanager ergänzt
* Explorer um zusätzlichen Aktualisieren-Button im Explorer-Bereich ergänzt
* Dateiliste wird nach relevanten Dateiaktionen zuverlässiger aktualisiert
* Persönliches Dashboard neu strukturiert: aktive Kacheln und verfügbare Aktionen sind getrennt
* Bereits hinzugefügte Dashboard-Aktionen werden im Hinzufügen-Bereich ausgeblendet
* Standard-Dashboard entschlackt und kritische Aktionen nicht mehr vorausgewählt
* Abstände, Button-Ausrichtung und Informationsblöcke in der Web Console vereinheitlicht
* Hintergrund- und Scrollverhalten in der klassischen Ansicht verbessert

### 1.5.4

* Desktop-Workbench-Konsole überarbeitet
* Live Console im Desktop-Modus als echtes bewegliches Fenster nutzbar gemacht
* Konsole kann im Desktop-Modus verschoben, minimiert, maximiert und über die Taskleiste wiederhergestellt werden
* Konsolenposition und Größe werden im Browser gespeichert
* Fehler behoben, bei dem die Live Console nach dem Einklappen im Desktop-Modus leer bzw. statisch wirkte
* Minimieren-Schaltfläche für die Live Console ergänzt
* Mobile Darstellung der Desktop-Konsole weiter abgesichert
* Klassische Ansicht bereinigt: Desktop-Fensterleisten werden dort nicht mehr angezeigt
* Mein Dashboard in der klassischen Ansicht stabilisiert
* Falsch platzierte Minimieren-/Maximieren-/Schließen-Schaltflächen in der klassischen Ansicht entfernt
* Alte dauerhaft ausgeblendete Karten werden automatisch wiederhergestellt
* Desktop-Fenster schließen Inhalte nicht mehr dauerhaft aus der Oberfläche aus
* Maximieren-Overlay von Kartenmodulen abgesichert
* Layout-Reset löscht jetzt auch gespeicherte Desktop-Konsolenpositionen

### 1.5.3

* Neuer optionaler Desktop-Workbench-Modus ergänzt
* Desktop-Verknüpfungen für Übersicht, Dateien, Konsole, Server, Packs, Backups, Netzwerk, Dashboard und Experten ergänzt
* Startmenü mit allen Web-Console-Modulen ergänzt
* Taskleiste mit offenen und minimierten Fenstern ergänzt
* Module können im Desktop-Modus als Fenster geöffnet, verschoben, minimiert, maximiert und geschlossen werden
* Fensterpositionen und geöffnete Desktop-Module werden im Browser gespeichert
* Mobile Desktop-Ansicht erkennt schmale Geräte und nutzt Fullscreen-Module statt frei schwebender Fenster
* Eingeklappte Sidebar auf echten Icons-only-Modus korrigiert
* Classic-Ansicht bleibt weiterhin verfügbar

### 1.5.2

* Web Console zur `WinoMC Dynamic Workbench` weiterentwickelt
* Sidebar einklappbar gemacht, Desktop mit Icon-only-Modus und mobilem Scroll-Menü
* Live Console dynamisch gemacht: Höhe per Drag-Leiste veränderbar, einklappbar und maximierbar
* Dateimanager modernisiert: Explorer-/Editor-Bereich per Split-Griff vergrößerbar
* Editor-Komfort ergänzt: Vollbild, Schriftgröße, Zeilenumbruch an/aus und weiterhin JSON-Prüfung vor dem Speichern
* Module/Karten können eingeklappt, maximiert oder ausgeblendet werden
* Workbench-Layout wird im Browser gespeichert und kann per Button zurückgesetzt werden
* Mobile Ansicht für iPhone, Tablet und schmale Displays verbessert
* Micro-Interaktionen und visuelle Rückmeldungen für eine modernere Bedienung ergänzt

### 1.5.1

* Web Console zum WinoMC Control Center erweitert
* Menüstruktur neu geordnet: Übersicht, Mein Dashboard, Konsole, Server, Packs & Add-ons, Backups, Netzwerk, Dateien und Experten
* Bisheriges personalisierbares Dashboard in **Mein Dashboard** umbenannt
* Neue globale **Übersicht** als feste Startseite für alle Nutzer ergänzt
* Eigene **Konsole**-Seite ergänzt; die angedockte Live Console bleibt weiterhin dauerhaft unten sichtbar
* Neues **Server**-Modul für Schnellaktionen, Spielmodus, Schwierigkeit, Spielregeln und Mehrspieler-Aktionen ergänzt
* Neues **Packs & Add-ons**-Modul für Resource Packs, Behavior Packs, Importordner und Weltdateien ergänzt
* Neues **Backups**-Modul mit sicherem Welt-Export vorbereitet
* Neues **Netzwerk**-Modul mit IPv4-, IPv6-, LAN- und Dual-Stack-Hinweisen ergänzt
* Neuer **Dateimanager** in der Web Console ergänzt
* Dateimanager unterstützt erlaubte WinoMC-Roots: `/config`, `/config/worlds`, `/config/resource_packs`, `/config/behavior_packs`, `/config/world_templates`, `/share/winomc/import` und `/share/winomc/export`
* Klickbarer Breadcrumb-Pfad ergänzt, z. B. `config:/worlds/world/db`
* Direkte Pfadeingabe mit Button **Pfad öffnen** ergänzt
* Datei-Download ergänzt
* Ordner-Download als ZIP ergänzt
* ZIP-Erstellung nach `/share/winomc/export` ergänzt
* Drag-&-Drop-Upload robuster gemacht
* Upload-Fix für Umgebungen ergänzt, in denen Home Assistant Ingress keinen normalen `Content-Length`-Header weitergibt
* JSON-Fallback-Upload für kleinere Dateien ergänzt
* Integrierter Texteditor für freigegebene Textdateien ergänzt
* JSON-Prüfung vor dem Speichern von `.json`-Dateien ergänzt
* Automatisches Datei-Backup vor dem Speichern ergänzt
* Sicheres Entpacken von `.zip`, `.mcpack`, `.mcaddon`, `.mcworld` und `.mctemplate` ergänzt
* Schutz vor Pfad-Ausbruch, Symlinks und unsicheren Archivpfaden ergänzt
* Sicherer Welt-Export mit `save hold`, `save query`, ZIP-Erstellung und anschließendem `save resume` ergänzt
* Neue optionale Limits für Web-Console-Dateifunktionen ergänzt

### 1.5.0

* Hinzufügen von neuen Funktionen für die Web Console

### 1.4.8

* Bereinigung und Dokumentation

### 1.4.7

* Experimentelle Unterstützung für `aarch64` / ARM64 ergänzt
* Add-on-Architektur um `aarch64` erweitert
* Box64 wird bei ARM64-Builds installiert
* Native Runtime erkennt ARM64 zur Laufzeit und startet den Mojang Bedrock Dedicated Server über `box64`
* Neue Option `USE_BOX64` ergänzt
* `amd64` bleibt unverändert und startet weiterhin direkt über `./bedrock_server`
* Vorbereitung für spätere eigene WinoMC-ARM64-Base fortgesetzt

### 1.4.6

* Native Unterstützung für `ENABLE_BDS_V6BIND_FIX` ergänzt
* WinoMC-eigener IPv6-Bind-Fix wird jetzt aus Quellcode im Repository gebaut
* Keine externe Download-Abhängigkeit für den IPv6-Fix beim Docker-Build
* Native Runtime setzt `LD_PRELOAD`, wenn `ENABLE_BDS_V6BIND_FIX=true` aktiv ist
* Warnung ergänzt, wenn IPv4- und IPv6-Port gleich sind, der IPv6-Bind-Fix aber deaktiviert ist
* Dual-Stack-Betrieb mit gleichem IPv4-/IPv6-Port vorbereitet

### 1.4.4

* Native `MC_PACK`-Importlogik ergänzt
* Unterstützung für `.mcpack`, `.mcaddon`, `.mcworld`, `.mctemplate` und `.zip` ergänzt
* `MC_PACK` kann auf eine Datei, einen Ordner unter `/share/winomc/import` oder eine HTTP/HTTPS-URL zeigen
* `FORCE_WORLD_COPY` nativ umgesetzt
* `FORCE_PACK_COPY` nativ umgesetzt
* Native Paket-Backups vor BDS-Updates ergänzt
* `PACKAGE_BACKUP_KEEP` zur Begrenzung alter Paket-Backups nativ umgesetzt
* Weitere itzg-Komfortfunktionen in die native WinoMC Runtime übernommen

### 1.4.3

* Native Runtime weiter bereinigt
* `VERSION=EXISTING` schreibt jetzt auch `allowlist.json` und `permissions.json`, bevor der vorhandene Bedrock Server gestartet wird
* Fehlerzweig für `VERSION=EXISTING` vereinfacht
* Doppelte Log-Ausgabe bei `BDS_AUTO_UPDATE=false` entfernt
* Doppelte Erstellung von `server.properties` bei `BDS_AUTO_UPDATE=false` entfernt
* Kleine Stabilitäts- und Wartbarkeitsverbesserungen an `winomc-native-start`

### 1.4.2

Bereinigung

### 1.4.1

* Dockerfile final auf direkte Ubuntu-Basis umgestellt
* Veraltete `build.yaml`-Abhängigkeit entfernt
* Build-Probleme durch nicht gesetztes `BUILD_FROM` behoben
* Native WinoMC Runtime erfolgreich mit eigener Basis gebaut und gestartet
* Add-on-Update auf native Runtime erfolgreich getestet
* Alte itzg-/Home-Assistant-Base-Abhängigkeit weiter bereinigt

### 1.4.0

* Docker-Basis von `itzg/minecraft-bedrock-server` auf eine eigene Ubuntu-basierte WinoMC-Runtime umgestellt
* Native Runtime ist jetzt der Standard für den Bedrock Server
* `itzg`-Runtime wird nicht mehr benötigt und bei alten Einstellungen automatisch auf `native` umgeleitet
* Architektur vorübergehend auf `amd64` begrenzt, da der native Mojang Bedrock Dedicated Server ohne itzg-/Box64-Hilfen getestet wird
* Benötigte Systempakete für nativen BDS-Start direkt im WinoMC-Image ergänzt
* Vorbereitung für eine spätere eigene `ghcr.io/kasawino69/winomc-bedrock-base` fortgesetzt

### 1.3.9

Umstellung auf Native

### 1.3.8.1

Fehlerbehebungen

### 1.3.8

* `BDS_DIRECT_DOWNLOAD_URL` bleibt als optionale Expertenoption ohne Pflichtfeld erhalten
* Native WinoMC Bedrock Runtime erfolgreich startfähig gemacht
* Nativer Start lädt den offiziellen Mojang Bedrock Dedicated Server, schreibt `server.properties` und startet den Server ohne `/opt/bedrock-entry.sh`
* Native Runtime um `allowlist.json` aus `ALLOW_LIST_USERS` erweitert
* Native Runtime um `permissions.json` aus `OPS`, `MEMBERS` und `VISITORS` erweitert
* XUID-Auflösung für Permissions vorbereitet, damit Gamertags nach Möglichkeit automatisch aufgelöst werden
* Vorbereitung für die spätere Umstellung von der itzg-Basis auf eine eigene WinoMC-/Home-Assistant-Base fortgesetzt

### 1.3.7

Fehlerbehebungen

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
