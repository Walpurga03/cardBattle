## Hauptmenü

Nach dem Start zeigt das Programm das Hauptmenü mit folgenden Optionen:

1. **Manage Cards**: Verwaltung der Karten.
2. **Manage Global Properties**: Verwaltung der globalen Eigenschaften.
3. **Create Backup**: Erstellen einer Sicherungskopie aller relevanten Dateien.
4. **Exit**: Programm beenden.

## Kartenverwaltung

Im Menü **Manage Cards** stehen Ihnen die folgenden Optionen zur Verfügung:

1. **Add Card**: Hinzufügen einer neuen Karte.
2. **Update Card**: Aktualisieren einer vorhandenen Karte.
3. **Delete Card**: Löschen einer Karte.
4. **View Cards**: Anzeigen aller Karten.
5. **Exit**: Zurück zum Hauptmenü.

### Hinzufügen einer neuen Karte

Um eine neue Karte hinzuzufügen, geben Sie folgende Informationen ein:

- **Card ID**: Eine eindeutige ID, die als Dateiname für das Bild der Karte dient (z. B. `9.png` für die ID `9`).
- **Card Name**: Der Name der Karte.
- **Eigenschaften**: Fünf Eigenschaften der Karte. Beachten Sie:
  - **Eigenschaft 1**: Die niedrigste Zahl gewinnt.
  - **Eigenschaften 2 bis 5**: Erlaubte Werte sind 1 bis 5; die höchste Zahl gewinnt.

### Aktualisieren einer vorhandenen Karte

Sie können den Namen und die Eigenschaften einer bestehenden Karte ändern. Die gleichen Regeln wie beim Hinzufügen einer neuen Karte gelten.

### Löschen einer vorhandenen Karte

Das Löschen einer Karte entfernt sie zusammen mit ihren zugehörigen Texten aus den `cardText.json` Dateien (sowohl in der deutschen als auch in der englischen Version).

### Anzeigen aller Karten

Zeigt eine Liste aller Karten an, einschließlich ihrer IDs und Namen.

## Verwaltung der globalen Eigenschaften

Im Menü **Manage Global Properties** können Sie die globalen Eigenschaften für `de` und `en` in den `cardText.json` Dateien aktualisieren. Verfügbare Aktionen:

1. **Update Global Properties (EN)**: Aktualisieren der globalen Eigenschaften in der englischen Version.
2. **Update Global Properties (DE)**: Aktualisieren der globalen Eigenschaften in der deutschen Version.
3. **Exit**: Zurück zum Hauptmenü.

### Aktualisieren der globalen Eigenschaften

Sie werden aufgefordert, neue Werte für die globalen Eigenschaften einzugeben. Wenn Sie ein Eingabefeld leer lassen, bleibt der aktuelle Wert bestehen.

## Erstellen einer Sicherungskopie

Erstellt eine Sicherungskopie der Dateien `cards.json`, `cardText.json` (für `de` und `en`). Die Backup-Dateien werden mit einem Zeitstempel im Dateinamen versehen.

## Bilder speichern

Die Bilder der Karten müssen im Ordner `public/assets/images/` abgelegt werden. Der Dateiname sollte mit der ID der Karte übereinstimmen und die Endung `.png` haben (z. B. `9.png` für die ID `9`). Die Bildgröße sollte 297x222 (4:3) betragen.

## Regeln für Eigenschaften

- **Eigenschaft 1**: Die niedrigste Zahl gewinnt.
- **Eigenschaften 2 bis 5**: Erlaubte Werte sind 1, 2, 3, 4 oder 5; die höchste Zahl gewinnt.