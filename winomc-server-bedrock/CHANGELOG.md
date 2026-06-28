## Changelog

### next

* Geplante weitere Verbesserungen
* Weitere Optimierungen für Bedienbarkeit, Dokumentation und Add-on-Kompatibilität

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
