# Card Battle Projekt Dokumentation

Dies ist die Dokumentation des `Card Battle` Projekts. Die Anwendung basiert auf React und Vite und verwendet TypeScript für die Typisierung. Das Projekt enthält verschiedene Komponenten, Hooks, Utility-Funktionen und SCSS-Stile, die die Funktionalität und das Aussehen der Anwendung definieren.

## Projektstruktur

### [`public/`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Flinux%2Fprojects%2FcardBattle%2Fpublic%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22d49668a6-0fa3-4cdb-8b36-bef115440a95%22%5D "/home/linux/projects/cardBattle/public/")

Dieser Ordner enthält alle statischen Assets, die direkt vom Server bereitgestellt werden und von der Anwendung referenziert werden können.

```bash
public
├── assets
│   ├── data
│   │   └── cards.json # JSON-Datei mit den Kartendaten für das Spiel.
│   ├── icon # Enthält Icons für die Anwendung.
│   └── images # Enthält alle Bilder für die Spielkarten.
│       ├── 1.png
│       ├── 2.png
│       ├── 3.png
│       ├── 4.png
│       ├── 5.png
│       ├── 6.png
│       ├── 7.png
│       ├── 8.png
│       └── backSite.png
├── audio # Enthält Audiodateien für die Anwendung.
│   └── WasIstGeldFuerDich.mp3
└── locales # Sprachdateien für die Anwendung.
    ├── de
    │   └── cardText.json # Deutsche Übersetzungen für Kartentexte.
    └── en
        └── cardText.json # Englische Übersetzungen für Kartentexte.
```

### [`src/`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Flinux%2Fprojects%2FcardBattle%2Fsrc%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22d49668a6-0fa3-4cdb-8b36-bef115440a95%22%5D "/home/linux/projects/cardBattle/src/")

Dieser Ordner enthält den gesamten Quellcode der Anwendung.

```bash
src
├── App.tsx # Hauptkomponente der Anwendung, die die Spiellogik und Darstellung verwaltet.
├── components # UI-Komponenten der Anwendung.
│   ├── BackgroundMusic.tsx # Komponente zur Steuerung der Hintergrundmusik.
│   ├── CardComponent.tsx # Stellt eine einzelne Karte im Spiel dar.
│   ├── ComputerArea.tsx # Verwaltet und zeigt den Spielbereich des Computers an.
│   ├── EndAnimation.tsx # Zeigt die Endanimation des Spiels an.
│   ├── InfoPopup.tsx # Zeigt ein Popup mit Informationen über den Entwickler an.
│   ├── LanguageSwitcher.tsx # Ermöglicht dem Benutzer, die Sprache der Anwendung zu wechseln.
│   ├── MusicButton.tsx # Button zum Ein- und Ausschalten der Musik.
│   ├── PlayerArea.tsx # Verwaltet und zeigt den Spielbereich des Spielers an.
│   ├── StartAnimation.tsx # Zeigt die Startanimation des Spiels an.
│   └── WinnerMessage.tsx # Zeigt eine Nachricht an, wenn ein Gewinner feststeht.
├── custom.d.ts # Typdeklarationen für benutzerdefinierte Elemente.
├── hooks # Benutzerdefinierte Hooks für die Zustandsverwaltung und andere Funktionen.
│   ├── useGameInitialization.ts # Initialisiert das Spiel, mischt die Karten und verteilt sie.
│   ├── useGameState.ts # Verwaltet den Zustand des Spiels, einschließlich aktueller Karten und Spielstände.
│   └── useOrientation.ts # Hook zur Erkennung der Geräteausrichtung (Portrait oder Landscape).
├── i18n.ts # Konfigurationsdatei für die Internationalisierung (i18n), unterstützt mehrere Sprachen.
├── main.tsx # Einstiegspunkt der Anwendung, der die React-App rendert.
├── styles # Enthält alle SCSS-Dateien, modularisiert für eine bessere Wartung.
│   ├── _global.scss # Globale Stile, die für die gesamte Anwendung gelten.
│   ├── _variables.scss # SCSS-Variablen für Farben, Abstände usw.
│   ├── components
│   │   ├── _animations.scss # Enthält Animationen und Keyframes für die Anwendung.
│   │   ├── _button.scss # Stile für alle Buttons in der Anwendung.
│   │   ├── _card.scss # Stile für die Kartenanzeige und -animationen.
│   │   ├── _endAnimation.scss # Stile für die Endanimation.
│   │   ├── _infoPopup.scss # Stile für das Info-Popup.
│   │   ├── _navbar.scss # Stile für die Navigationsleiste.
│   │   └── _winner-message.scss # Stile für die Gewinner-Nachricht.
│   └── main.scss # Haupt-SCSS-Datei, die alle anderen SCSS-Dateien importiert und kompiliert.
├── types # Enthält TypeScript-Typdefinitionen für das Projekt.
│   └── Card.ts # Typdefinitionen für die Kartenobjekte im Spiel.
├── utils # Hilfsfunktionen und Utilities, die in der gesamten Anwendung verwendet werden.
│   ├── animations.ts # Funktionen für die Verwaltung und Anwendung von Animationen.
│   ├── cardComparison.ts # Enthält die Logik zum Vergleichen von Kartenwerten.
│   ├── compareCards.ts # Logik zum Vergleichen der Karten von Spieler und Computer.
│   ├── initializeCards.ts # Funktion zum Initialisieren und Mischen der Karten.
│   ├── selectHighestPropertyForComputer.ts # Algorithmus zur Auswahl der besten Eigenschaft für den Computer.
│   └── shuffleArray.ts # Hilfsfunktion zum Mischen von Arrays.
└── vite-env.d.ts # TypeScript-Deklarationsdatei für Vite-spezifische Umgebungsvariablen.
```