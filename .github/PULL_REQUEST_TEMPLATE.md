## Manual WinoMC 2.0.0 checklist

### Desktop
- [ ] Desktopmodus öffnet
- [ ] Keine blockierende Box im Hintergrund
- [ ] Fenster sind klickbar und verschiebbar
- [ ] Konsole funktioniert
- [ ] Übersicht zeigt RAM/Speicher/Spieler
- [ ] Dateien nur im Menüpunkt Dateien
- [ ] Explorer scrollt

### Klassisch
- [ ] Explorer nur unter Dateien
- [ ] Konsole korrekt angeheftet
- [ ] Scrollbereiche funktionieren
- [ ] Keine Layoutverschiebung durch Scrollbars

### Mobile
- [ ] Kein Resize-Handle
- [ ] Menü vollständig erreichbar
- [ ] Konsole lesbar
- [ ] Keine Desktop-Overlays
- [ ] Kein horizontaler Layoutbruch

### Backend safety
- [ ] Webschutz blockiert Upload, JSON-Upload und Datei schreiben serverseitig
- [ ] Webschutz blockiert ZIP/Export, Entpacken, Löschen, Verschieben und Papierkorb-Aktionen serverseitig
- [ ] Webschutz blockiert Restore, Backup löschen, Pack-Aktivierung, Spielerrechte speichern, Profile vorbereiten und Update vorbereiten

### Backups / Restore
- [ ] Backup erstellen
- [ ] Backup anzeigen
- [ ] Restore `config` prüfen
- [ ] Restore `world` prüfen
- [ ] Restore `complete` nur mit Testdaten prüfen
- [ ] Safety-Backup vor Restore wird erstellt
- [ ] Backup-Aufbewahrung prüfen

### Diagnose / Health
- [ ] Diagnose läuft
- [ ] Fehler werden verständlich angezeigt
- [ ] Kaputte JSON-Datei wird erkannt
- [ ] Health zeigt RAM/Speicher/Spieler/Backup/Schutzstatus

### Packs
- [ ] Resource Pack erkannt
- [ ] Behavior Pack erkannt
- [ ] manifest.json gelesen
- [ ] Defektes Pack wird als defekt angezeigt
- [ ] Pack aktivieren schreibt `world_resource_packs.json` / `world_behavior_packs.json`
- [ ] Pack deaktivieren entfernt den aktiven Eintrag

### Allowlist / Permissions
- [ ] Spieler hinzufügen
- [ ] Spieler entfernen durch Speichern ohne Eintrag
- [ ] Rolle ändern
- [ ] OP setzen über Rolle `operator`
- [ ] Ungültige XUID wird erkannt
- [ ] allowlist.json korrekt
- [ ] permissions.json korrekt

### Updates / Profile / Import-Export
- [ ] Update vorbereiten erstellt Backup und Statusdatei
- [ ] Profil vorbereiten erzeugt Empfehlung ohne Add-on-Optionen heimlich zu überschreiben
- [ ] Welt exportieren
- [ ] Bestehende Ziele werden nicht still überschrieben
- [ ] ZIP wird sicher verarbeitet

### RC final checks
- [ ] Webschutz-Status über `/api/web-protection` lesen und setzen
- [ ] Serverpersistenter Webschutz blockiert gefährliche POST-Route auch ohne Cookie-Manipulation
- [ ] Diagnose-Reparatur `ensure_directories` ausführen
- [ ] Diagnose-Reparatur für fehlende/ungültige `allowlist.json` und `permissions.json` prüfen
- [ ] URL-Import-Check lehnt `.jar` / Java-Mods ab
- [ ] URL-Import-Check blockiert localhost/private IPs
- [ ] Direkter HTTPS-Bedrock-Pack-Download wird geprüft und installiert
- [ ] Mobile Befehlshilfe ist sichtbar, scrollbar und übernimmt Vorschläge kontrolliert

### Safety Planner checks
- [ ] Diagnose zeigt Welt-Schutzstatus und Risikoampel
- [ ] `repair_all_safe` leert aktive World-Pack-Dateien nicht
- [ ] Rote Reparatur ohne Expertenbestätigung bricht ab
- [ ] URL-Import lädt zuerst in Quarantäne und liefert einen Plan
- [ ] Duplicate UUIDs werden nicht automatisch ersetzt
- [ ] Restore-Plan zeigt Pack-/Add-on-Auswirkungen und verlangt Bestätigung

### Add-on Manager local import checks
- [ ] Freier URL-Download ist deaktiviert und öffnet kein Netzwerk
- [ ] Import-Eingang `/share/winomc/import` wird katalogisiert
- [ ] `.mcpack`, `.mcaddon`, `.mcworld`, `.mctemplate` werden erkannt
- [ ] `.jar` / ausführbare Dateien werden als nicht unterstützt angezeigt
- [ ] Lokale Updates über UUID/Version werden angezeigt
- [ ] Add-on Manager Apply wird durch Webschutz blockiert
