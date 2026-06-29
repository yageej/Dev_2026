import React from "react";
import { CheckCircle2, Circle, Trophy } from "lucide-react";

export default function Metrics({ tasks = [] }) {
  // Safety fallback: ensure tasks defaults to an empty array to avoid undefined errors
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // ⚡ FIXED: Overhauled card styles to blend perfectly with your sleek dark workspace theme
  const cardStyle = {
    flex: 1,
    backgroundColor: "#121214", // Matches sidebar and tasklist card colors
    border: "1px solid #1f1f23", // Distinct structural division borders
    padding: "1rem 1.25rem",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "1.5rem",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* COMPLETED CARD CONTAINER */}
      <div style={cardStyle}>
        <div
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            padding: "0.5rem",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CheckCircle2 color="#10b981" size={20} />
        </div>
        <div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#8a8a93",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            Completed
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#ffffff",
              marginTop: "0.15rem",
            }}
          >
            {completed}
          </div>
        </div>
      </div>

      {/* PENDING CARD CONTAINER */}
      <div style={cardStyle}>
        <div
          style={{
            backgroundColor: "rgba(138, 138, 147, 0.1)",
            padding: "0.5rem",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Circle color="#8a8a93" size={20} />
        </div>
        <div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#8a8a93",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            Pending
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#ffffff",
              marginTop: "0.15rem",
            }}
          >
            {pending}
          </div>
        </div>
      </div>

      {/* PROGRESS CARD CONTAINER */}
      <div style={cardStyle}>
        <div
          style={{
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            padding: "0.5rem",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Trophy color="#f59e0b" size={20} />
        </div>
        <div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#8a8a93",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            Progress
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#ffffff",
              marginTop: "0.15rem",
            }}
          >
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
}
