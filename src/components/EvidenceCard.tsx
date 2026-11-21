
import { useState } from "react";
import { motion } from "motion/react";
import { Lightbulb, Search } from "lucide-react";

interface EvidenceCardProps {
  title: string;
  description: string;
  explanation: string;
  number: number;
}

export function EvidenceCard({
  title,
  description,
  explanation,
  number,
}: EvidenceCardProps) {

  const [revealed, setRevealed] = useState(false);

  return (
    <div
      style={{
        perspective: 1000,
        width: "100%",
        maxWidth: 360,
      }}
    >
      <motion.div
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "relative",
          width: "100%",
          minHeight: 280,
          transformStyle: "preserve-3d",
        }}
      >

        {/* FRONT */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: 24,
            borderRadius: 16,
            background: "linear-gradient(135deg, #f8f9fd 0%, #f5f6fb 100%)",
            border: "1px solid #e8ebf5",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.05)",
          }}
        >
          <small style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600 }}>EVIDENCE #{number}</small>

          <h3 style={{ margin: "10px 0 8px", fontSize: "1rem", fontWeight: 600, color: "#1e293b" }}>{title}</h3>

          <p style={{ margin: "0 0 16px", fontSize: "0.9rem", lineHeight: 1.5, color: "#64748b" }}>{description}</p>

          <button
            onClick={() => setRevealed(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 10,
              background: "#6366f1",
              color: "white",
              border: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <Search size={16} />
            Untersuchen
          </button>
        </div>

        {/* BACK */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: 24,
            borderRadius: 16,
            background: "linear-gradient(135deg, #f0fdf4 0%, #f1fdf5 100%)",
            border: "1px solid #dcfce7",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Lightbulb size={20} style={{ color: "#84cc16" }} />
            <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "#1e293b" }}>Was bedeutet das?</h3>
          </div>

          <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6, color: "#475569" }}>{explanation}</p>

          <button
            onClick={() => setRevealed(false)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              background: "transparent",
              color: "#16a34a",
              border: "1px solid #bbf7d0",
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
              marginTop: "auto",
            }}
          >
            Zurück
          </button>

        </div>
      </motion.div>
    </div>
  );
}
