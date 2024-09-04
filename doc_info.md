# Card Battle Projekt Dokumentation

Dies ist die Dokumentation des `Card Battle` Projekts. Die Anwendung basiert auf React und Vite und verwendet TypeScript für die Typisierung. Das Projekt enthält verschiedene Komponenten, Hooks, Utility-Funktionen und SCSS-Stile, die die Funktionalität und das Aussehen der Anwendung definieren.

## Projektstruktur

### `public/`

Dieser Ordner enthält alle statischen Assets, die direkt vom Server bereitgestellt werden und von der Anwendung referenziert werden können.

```bash
public
├── assets
│   ├── data
│   │   └── cards.json # JSON-Datei mit den Kartendaten für das Spiel.
│   └── images # Enthält alle Bilder für die Spielkarten.
│       ├── 1.png
│       ├── 2.png
│       ├── ... (weitere Kartenbilder)
│       └── backSite.png
└── locales # Sprachdateien für die Anwendung.
    ├── de
    │   └── cardText.json # Deutsche Übersetzungen für Kartentexte.
    └── en
        └── cardText.json # Englische Übersetzungen für Kartentexte.


src
├── App.tsx # Hauptkomponente der Anwendung, die die Spiellogik und Darstellung verwaltet.
├── components # UI-Komponenten der Anwendung.
│   ├── CardComponent.tsx # Stellt eine einzelne Karte im Spiel dar.
│   ├── ComputerArea.tsx # Verwaltet und zeigt den Spielbereich des Computers an.
│   ├── LanguageSwitcher.tsx # Ermöglicht dem Benutzer, die Sprache der Anwendung zu wechseln.
│   ├── PlayerArea.tsx # Verwaltet und zeigt den Spielbereich des Spielers an.
│   └── WinnerMessage.tsx # Zeigt eine Nachricht an, wenn ein Gewinner feststeht.
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
