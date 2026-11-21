
import { useState } from "react";
import "./EvidenceGame.css";
import { EvidenceCard } from "./components/EvidenceCard";

import {
  DragDropProvider,
  useDraggable,
  useDroppable,
} from "@dnd-kit/react";
import type { DragEndEvent } from "@dnd-kit/dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  CheckCircle,
  ChevronLeft,
  Lightbulb,
  BookOpen,
  RotateCcw,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

interface EvidenceGameProps {
  onBack?: () => void;
}

interface Clue {
  id: string;
  title: string;
  description: string;
  correctZone: "relevant" | "other";
  explanation: string;
}

type Zone = "relevant" | "other";
type GamePhase = "investigation" | "reveal" | "transfer" | "complete";

const clues: Clue[] = [
  {
    id: "students",
    title: "Schülerstruktur",
    description: "Unterschiedliche Ausgangsbedingungen",
    correctZone: "relevant",
    explanation:
      "Die Zusammensetzung der Schülerschaft kann einen erheblichen Einfluss auf die Abbruchquote haben. Schulen mit unterschiedlichen Ausgangsbedingungen lassen sich nicht ohne Weiteres miteinander vergleichen.",
  },
  {
    id: "period",
    title: "Erhebungszeitraum",
    description: "Unterschiedliche Zeiträume",
    correctZone: "relevant",
    explanation:
      "Ein Vergleich ist nur sinnvoll, wenn die Daten für vergleichbare Zeiträume erhoben wurden. Unterschiedliche Zeiträume können saisonale oder strukturelle Veränderungen enthalten.",
  },
  {
    id: "definition",
    title: "Definition",
    description: "Unterschiedliche Definitionen von Abbruch",
    correctZone: "relevant",
    explanation:
      "Besonders wichtig: Was bedeutet überhaupt Schulabbruch? Wenn Schulen unterschiedliche Definitionen verwenden, vergleichen wir möglicherweise unterschiedliche Sachverhalte.",
  },
  {
    id: "building",
    title: "Gebäudealter",
    description: "Alter des Schulgebäudes",
    correctZone: "other",
    explanation:
      "Das Gebäudealter ist für die unmittelbare Vergleichbarkeit der Abbruchquoten nicht relevant. Es könnte für andere Fragestellungen interessant sein, erklärt aber nicht automatisch Unterschiede in den Abbruchquoten.",
  },
];

const transferOptions = [
  {
    id: "school-b",
    label: "Schule B ist eindeutig erfolgreicher.",
    correct: false,
    feedback:
      "Die niedrigere Quote allein reicht nicht aus. Die Vergleichbarkeit der zugrunde liegenden Daten ist nicht sichergestellt.",
  },
  {
    id: "school-a",
    label: "Schule A ist eindeutig erfolgreicher.",
    correct: false,
    feedback:
      "Auch diese Schlussfolgerung lässt sich aus den vorhandenen Informationen nicht ableiten.",
  },
  {
    id: "unknown",
    label: "Ein belastbarer Vergleich ist derzeit nicht möglich.",
    correct: true,
    feedback:
      "Richtig! Die unterschiedlichen Ausgangsbedingungen, Erhebungszeiträume und Definitionen verhindern einen fairen Vergleich.",
  },
];

interface ClueCardProps {
  clue: Clue;
  disabled?: boolean;
}

function ClueCard({ clue, disabled = false }: ClueCardProps) {
  const { ref, isDragging } = useDraggable({
    id: clue.id,
    disabled,
  });

  return (
    <motion.div
      ref={ref}
      layout
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      className="clue-card"
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: disabled ? "default" : "grab",
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 12,
        background: "white",
        marginBottom: 10,
        touchAction: "none",
      }}
    >
      <strong>{clue.title}</strong>
      <p>{clue.description}</p>
      {!disabled && <small>↕ Ziehen zum Sortieren</small>}
    </motion.div>
  );
}

interface DropZoneProps {
  id: Zone;
  title: string;
  icon: string;
  items: Clue[];
}

function DropZone({ id, title, icon, items }: DropZoneProps) {
  const { ref, isDropTarget } = useDroppable({ id });

  return (
    <div
      ref={ref}
      style={{
        minHeight: 180,
        padding: 16,
        border: isDropTarget
          ? "2px solid #16a34a"
          : "2px dashed #bbb",
        borderRadius: 14,
        background: isDropTarget ? "#ecfdf5" : "#f8fafc",
      }}
    >
      <h3>{icon} {title}</h3>

      {items.map((clue) => (
        <ClueCard key={clue.id} clue={clue} />
      ))}

      {items.length === 0 && <p>Hinweise hier ablegen ...</p>}
    </div>
  );
}

export default function EvidenceGame({ onBack }: EvidenceGameProps) {
  const [assignments, setAssignments] = useState<
    Record<string, Zone>
  >({});
  const [phase, setPhase] = useState<GamePhase>("investigation");
  const [transferAnswer, setTransferAnswer] = useState<string | null>(
    null
  );

  const remaining = clues.filter(
    (clue) => !assignments[clue.id]
  );

  const getItems = (zone: Zone) =>
    clues.filter((clue) => assignments[clue.id] === zone);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled || phase !== "investigation") return;

    const sourceId = event.operation.source?.id;
    const targetId = event.operation.target?.id;

    if (
      !sourceId ||
      !clues.some((clue) => clue.id === sourceId) ||
      !["relevant", "other"].includes(targetId as string)
    ) return;

    setAssignments((previous) => ({
      ...previous,
      [sourceId]: targetId as Zone,
    }));
  };

  const allPlaced = remaining.length === 0;

  const score = clues.filter(
    (clue) => assignments[clue.id] === clue.correctZone
  ).length;

  const selectedTransfer = transferOptions.find(
    (option) => option.id === transferAnswer
  );

  const resetGame = () => {
    setAssignments({});
    setPhase("investigation");
    setTransferAnswer(null);
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <main className="evidence-game">

        {/* HEADER */}

        <header>
          {onBack && (
            <button onClick={onBack} className="back-button">
              <ChevronLeft size={20} />
              Back
            </button>
          )}

          <Search />
          <h1>The Missing Context</h1>
          <p>
            Welche Informationen sind für einen fairen
            Schulvergleich relevant?
          </p>
        </header>

        {/* GAME PROGRESS */}

        <nav className="game-progress">
          {[
            { id: "investigation", label: "Investigation" },
            { id: "reveal", label: "Auflösung" },
            { id: "transfer", label: "Transfer" },
          ].map((step, index) => {
            const active =
              phase === step.id ||
              (phase === "complete" && step.id === "transfer");

            return (
              <div
                key={step.id}
                className={active ? "progress-active" : "progress-step"}
              >
                <span>{index + 1}</span>
                {step.label}
              </div>
            );
          })}
        </nav>

        {/* PHASE 1: INVESTIGATION */}

        {phase === "investigation" && (
          <motion.section
            key="investigation"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>Deine Hinweise</h2>
            <p>
              Welche Informationen sind für einen fairen
              Vergleich der beiden Schulen wichtig?
              Ziehe die Karten in die passenden Bereiche.
            </p>

            <div>
              {remaining.map((clue) => (
                <ClueCard key={clue.id} clue={clue} />
              ))}
            </div>

            <section className="drop-zones">
              <DropZone
                id="relevant"
                title="Relevant für den Vergleich"
                icon="✓"
                items={getItems("relevant")}
              />

              <DropZone
                id="other"
                title="Nicht unmittelbar relevant"
                icon="?"
                items={getItems("other")}
              />
            </section>

            {allPlaced && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setPhase("reveal")}
              >
                Ergebnis überprüfen
                <ArrowRight size={18} />
              </motion.button>
            )}
          </motion.section>
        )}

        {/* PHASE 2: REVEAL / EXPLANATION */}

        {phase === "reveal" && (
          <motion.section
            key="reveal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="feedback">
              <CheckCircle size={36} />
              <h2>Investigation abgeschlossen!</h2>
              <p>
                Du hast {score} von {clues.length}
                Hinweisen richtig zugeordnet.
              </p>
            </div>

            <h2>Die Auflösung</h2>

            <p>
              Nicht jede Information ist für einen fairen
              Vergleich gleichermaßen relevant. Schauen wir
              uns die einzelnen Hinweise an.
            </p>

            <div className="evidence-collection">
              {clues.map((clue, index) => (
                <EvidenceCard
                  key={clue.id}
                  number={index + 1}
                  title={clue.title}
                  description={clue.description}
                  explanation={clue.explanation}
                />
              ))}
            </div>

            <div className="learning-summary">
              <Lightbulb size={24} />
              <div>
                <h3>Das solltest du mitnehmen</h3>
                <p>
                  Bevor wir Daten miteinander vergleichen,
                  müssen wir prüfen, ob sie unter vergleichbaren
                  Bedingungen erhoben wurden und dieselben
                  Sachverhalte beschreiben.
                </p>
              </div>
            </div>

            <button onClick={() => setPhase("transfer")}>
              Zur Transfer-Challenge
              <ArrowRight size={18} />
            </button>
          </motion.section>
        )}

        {/* PHASE 3: TRANSFER */}

        {phase === "transfer" && (
          <motion.section
            key="transfer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BookOpen size={32} />

            <h2>Was bedeutet das für die Praxis?</h2>

            <p>
              Die Bildungsadministration möchte wissen,
              welche der beiden Schulen erfolgreicher ist.
            </p>

            <h3>Welche Aussage ist auf Basis der Informationen
              tatsächlich gerechtfertigt?</h3>

            <div className="transfer-options">
              {transferOptions.map((option) => (
                <button
                  key={option.id}
                  disabled={!!transferAnswer}
                  onClick={() => setTransferAnswer(option.id)}
                  className={
                    transferAnswer === option.id
                      ? "transfer-selected"
                      : "transfer-option"
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {selectedTransfer && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="transfer-feedback"
                >
                  {selectedTransfer.correct ? (
                    <CheckCircle color="green" size={28} />
                  ) : (
                    <AlertCircle color="#d97706" size={28} />
                  )}

                  <h3>
                    {selectedTransfer.correct
                      ? "Sehr gut!"
                      : "Noch einmal nachdenken"}
                  </h3>

                  <p>{selectedTransfer.feedback}</p>

                  {!selectedTransfer.correct && (
                    <button onClick={() => setTransferAnswer(null)}>
                      Antwort erneut versuchen
                    </button>
                  )}

                  {selectedTransfer.correct && (
                    <button onClick={() => setPhase("complete")}>
                      Challenge abschließen
                      <ArrowRight size={18} />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {/* PHASE 4: COMPLETION */}

        {phase === "complete" && (
          <motion.section
            key="complete"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="completion-screen"
          >
            <CheckCircle size={56} color="green" />

            <h2>Mission completed!</h2>

            <p>
              Du hast gelernt, warum Daten ohne Kontext
              zu falschen Schlussfolgerungen führen können.
            </p>

            <div className="final-stats">
              <strong>
                {score} / {clues.length}
              </strong>
              <span>Richtig zugeordnete Hinweise</span>
            </div>

            <div className="learning-summary">
              <Lightbulb size={24} />
              <p>
                Data Literacy bedeutet nicht nur, Zahlen lesen
                zu können. Es bedeutet auch, ihre Aussagekraft,
                Grenzen und ihren Kontext zu verstehen.
              </p>
            </div>

            <button onClick={resetGame}>
              <RotateCcw size={18} />
              Noch einmal spielen
            </button>
          </motion.section>
        )}

      </main>
    </DragDropProvider>
  );
}
