
# 🎮 Data Literacy Game Design Lab

Ein experimentelles React-Projekt zur Entwicklung spielerischer
Data-Literacy-Lernangebote für den Bildungsbereich.

## 1. Vision

Wir entwickeln interaktive Lern-Challenges für:

- Lehrkräfte
- Pädagogisches Personal
- Schulleitungen
- Bildungsadministration

Ziel ist es, Data Literacy spielerisch zu vermitteln.

Die Lernenden sollen lernen:

- Daten und Diagramme richtig zu interpretieren
- Muster und Zusammenhänge zu erkennen
- Datenbasierte Aussagen kritisch zu hinterfragen
- Korrelation und Kausalität zu unterscheiden
- Fehlende Informationen und Kontext zu erkennen
- Fundierte Schlussfolgerungen aus Daten abzuleiten

**Wichtig:** Die Lernenden sollen keine eigenen Datenauswertungen
durchführen. Im Mittelpunkt stehen Interpretation, Bewertung,
kritisches Denken und Urteilsfähigkeit.

## 2. Projektziel

Wir wollen herausfinden, wie sich klassische Lernaufgaben durch
Game-Design-Mechaniken in interessante Lernerlebnisse verwandeln lassen.

Der Fokus liegt zunächst NICHT auf klassischen Gamification-Elementen wie:

- XP
- Badges
- Leaderboards
- Levels
- Streaks

Stattdessen experimentieren wir mit echten Spielmechaniken:

- Drag & Drop
- Progressive Disclosure
- Evidence Collection
- Discovery Learning
- Branching Scenarios
- Decision & Consequence
- Role Playing
- Interactive Storytelling
- Feedback Loops

Wir lernen Game Design durch die Entwicklung kleiner,
funktionierender React-Prototypen.

## 3. Technologischer Stack

### Core

| Package | Verwendung |
|---|---|
| React | UI und Komponenten |
| TypeScript | Typisierung |
| Vite | Development und Build |
| Zustand | Spielzustände verwalten |

### Interactions & Game Design

| Package | Verwendung |
|---|---|
| @dnd-kit/react | Drag & Drop |
| motion | Animationen und Übergänge |
| lucide-react | Icons |
| XState (optional) | Komplexe Spielabläufe |

### Visualisierung

| Package | Verwendung |
|---|---|
| Recharts | Diagramme |
| Nivo | Erweiterte Datenvisualisierungen |
| React Flow | Visuelle Zusammenhänge und Workflows |

### Development

| Package | Verwendung |
|---|---|
| Zod | Validierung von Challenge-Daten |
| Vitest | Unit Tests |
| Playwright | End-to-End-Tests |

## 4. Roadmap – Game Design Experiments

Wir entwickeln die Spielmechaniken schrittweise.

### Phase 1 – Drag & Drop / Evidence Collection

**Challenge: The Missing Context**

Lernziel:
Verstehen, warum Daten ohne Kontext nicht sinnvoll
verglichen oder interpretiert werden können.

Szenario:

Zwei Schulen weisen unterschiedliche Abbruchquoten auf.
Der Lernende muss herausfinden, welche zusätzlichen Informationen
für einen fairen Vergleich relevant sind.

Spielmechanik:

- Informationskarten entdecken
- Karten per Drag & Drop verschieben
- Hinweise kategorisieren
- Ergebnisse überprüfen
- Direktes Feedback erhalten

Technologie:

- React
- @dnd-kit/react
- Motion

Lernziele für die Entwicklung:

- Drag & Drop verstehen
- Sortierbare Karten implementieren
- Mehrere Drop-Zonen erstellen
- Visuelles Feedback gestalten
- Interaktionen mit React State verwalten

**Ergebnis:** Eine funktionierende Evidence-Collection-Challenge.

---

### Phase 2 – Progressive Disclosure

**Challenge: The Hidden Evidence**

Lernziel:
Die Bedeutung zusätzlicher Informationen für die Interpretation
von Bildungsdaten verstehen.

Spielmechanik:

- Informationen schrittweise freischalten
- Hinweise aufdecken
- Erste Einschätzungen treffen
- Neue Informationen erhalten
- Ursprüngliche Einschätzungen überprüfen

Technologie:

- React
- Motion
- Zustand

Lernziele für die Entwicklung:

- Informationen schrittweise anzeigen
- Animationen einsetzen
- Spielzustände verwalten
- Feedback-Loops gestalten
- Neugier und Exploration fördern

**Ergebnis:** Eine interaktive Investigation-Challenge.

---

### Phase 3 – Branching Scenarios

**Challenge: The Wrong Decision**

Lernziel:
Erkennen, welche Schlussfolgerungen aus Bildungsdaten
zulässig sind.

Szenario:

Eine Bildungsadministration muss entscheiden, welche Schule
als Best-Practice-Beispiel ausgezeichnet werden soll.

Die Entscheidung basiert zunächst auf unvollständigen Informationen.

Spielmechanik:

- Entscheidungen treffen
- Unterschiedliche Szenariopfade erleben
- Konsequenzen entdecken
- Neue Informationen erhalten
- Entscheidungen gegebenenfalls revidieren

Technologie:

- React
- Zustand
- XState (optional)
- Motion

Lernziele für die Entwicklung:

- Verzweigte Spielabläufe entwickeln
- Zustandsmaschinen verstehen
- Entscheidungen und Konsequenzen modellieren
- Unterschiedliche Endzustände darstellen

**Ergebnis:** Eine interaktive Entscheidungssimulation.

---

### Phase 4 – Role Playing

**Challenge: Different Perspectives**

Lernziel:
Verstehen, dass Daten abhängig von der jeweiligen Rolle
und Fragestellung unterschiedlich interpretiert werden können.

Szenario:

Die gleichen Bildungsdaten werden aus unterschiedlichen
Perspektiven betrachtet:

- Lehrkraft
- Schulleitung
- Bildungsadministration

Spielmechanik:

- Rollen auswählen
- Unterschiedliche Aufgaben erhalten
- Unterschiedliche Perspektiven einnehmen
- Entscheidungen begründen

Technologie:

- React
- Zustand
- Motion

**Ergebnis:** Eine rollenbasierte Data-Literacy-Challenge.

---

### Phase 5 – Interactive Investigation Game

**Challenge: The Missing Context – Full Experience**

Wir kombinieren die bisher entwickelten Mechaniken.

Spielablauf:

1. Einführung in ein Bildungsszenario
2. Erste Einschätzung treffen
3. Hinweise entdecken
4. Informationen sammeln
5. Hinweise kategorisieren
6. Neue Informationen freischalten
7. Entscheidung treffen
8. Konsequenzen erleben
9. Fachliches Feedback erhalten

Eingesetzte Mechaniken:

- Evidence Collection
- Drag & Drop
- Progressive Disclosure
- Decision & Consequence
- Branching Scenarios
- Narrative Learning

**Ergebnis:** Ein vollständiges, spielbares Data-Literacy-Erlebnis.

## 5. Weitere Challenge-Ideen

Nach den ersten Experimenten können weitere Szenarien
entwickelt werden.

| Challenge | Lernziel | Spielmechanik |
|---|---|---|
| Chart Detective | Diagramme interpretieren | Visual Discovery |
| Fact or Fiction | Aussagen überprüfen | Classification |
| Spot the Bias | Verzerrungen erkennen | Spot the Difference |
| Correlation or Causation | Zusammenhänge bewerten | Investigation |
| The Misleading Chart | Irreführende Visualisierungen erkennen | Error Detection |
| Data Decision | Schlussfolgerungen ziehen | Decision Simulation |
| Education Escape Room | Mehrere Kompetenzen kombinieren | Puzzle / Storytelling |

## 6. Projektstruktur (Vorschlag)

```text
data-literacy-game-lab/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── GameLayout/
│   │   ├── EvidenceCard/
│   │   ├── DropZone/
│   │   ├── FeedbackPanel/
│   │   └── ProgressIndicator/
│   │
│   ├── challenges/
│   │   ├── missing-context/
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   ├── logic/
│   │   │   └── MissingContextGame.tsx
│   │   │
│   │   ├── hidden-evidence/
│   │   ├── wrong-decision/
│   │   └── different-perspectives/
│   │
│   ├── hooks/
│   │
│   ├── stores/
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
└── README.md
```

## 7. Designprinzipien

Bei der Entwicklung gelten folgende Grundsätze:

### Learning First

Jede Spielmechanik muss einen konkreten Lernzweck erfüllen.

### Interaction over Decoration

Interaktionen sollen das Lernen unterstützen und nicht nur
visuell interessant sein.

### Immediate Feedback

Lernende sollen verstehen, warum eine Entscheidung richtig
oder falsch beziehungsweise nicht ausreichend begründet ist.

### Safe Exploration

Fehler sind Teil des Lernprozesses. Lernende sollen experimentieren
und ihre Einschätzungen revidieren können.

### Professional Context

Szenarien orientieren sich an realistischen Situationen aus
Schulen, Bildungsorganisationen und Bildungsadministration.

### Accessibility

- Tastaturbedienbarkeit
- Mobile Nutzung
- Ausreichende Kontraste
- Verständliche Sprache
- Drag & Drop immer mit einer alternativen Bedienmöglichkeit

## 8. Definition of Done

Eine Challenge gilt als fertig, wenn:

- [ ] Das fachliche Lernziel klar definiert ist.
- [ ] Das Szenario einen realistischen Bildungskontext hat.
- [ ] Mindestens eine aktive Spielmechanik implementiert ist.
- [ ] Die Interaktionen zuverlässig funktionieren.
- [ ] Feedback und Erklärungen integriert sind.
- [ ] Ein vollständiger Spielablauf möglich ist.
- [ ] Die Challenge auf mobilen Geräten funktioniert.
- [ ] Die Interaktionen barrierearm bedienbar sind.
- [ ] Der fachliche Lerneffekt nachvollziehbar ist.

## 9. Erfolgskriterien des Projekts

Wir wollen nach Abschluss der Experimente beantworten können:

1. Welche Game-Design-Mechaniken eignen sich besonders
   für Data-Literacy-Lernangebote?
2. Welche Interaktionen erzeugen echtes Engagement?
3. Welche Mechaniken unterstützen das Verständnis komplexer
   Datenkonzepte?
4. Wie lassen sich mehrere Mechaniken kombinieren?
5. Welche Komponenten können später wiederverwendet werden?

## 10. First Steps

- [ ] React-Projekt mit Vite und TypeScript aufsetzen.
- [ ] Motion und dnd-kit installieren.
- [ ] Game Layout erstellen.
- [ ] Evidence Cards entwickeln.
- [ ] Mehrere Drop-Zonen implementieren.
- [ ] Feedback-Mechanismus integrieren.
- [ ] The Missing Context spielbar machen.
- [ ] Progressive Disclosure ergänzen.
- [ ] Branching Scenarios entwickeln.
- [ ] Die unterschiedlichen Spielerlebnisse vergleichen.

---

**Leitgedanke:**

We don't just teach people how to read data.

We create experiences that help them discover,
question and understand data.
