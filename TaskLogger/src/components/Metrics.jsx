import React from "react";
import { CheckCircle2, Circle, Trophy } from "lucide-react";

export default function Metrics({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const cardStyle = {
    flex: 1,
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  };

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
      <div style={cardStyle}>
        <Circle color="#6b7280" size={24} />
        <div>
          <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>Pending</div>
          <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            {pending}
          </div>
        </div>
      </div>
      <div style={cardStyle}>
        <CheckCircle2 color="#10b981" size={24} />
        <div>
          <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>Completed</div>
          <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            {completed}
          </div>
        </div>
      </div>
      <div style={cardStyle}>
        <Trophy color="#f59e0b" size={24} />
        <div>
          <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>Progress</div>
          <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
}
