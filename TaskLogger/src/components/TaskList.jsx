import React from "react";
import { CheckCircle, Circle, Trash2, Calendar } from "lucide-react";

export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "#9ca3af",
          padding: "3rem",
          backgroundColor: "white",
          borderRadius: "12px",
          border: "2px dashed #e5e7eb",
        }}
      >
        No tasks log records found. Enjoy the open canvas! ☕
      </div>
    );
  }

  // Auto-sort tasks by date value chronologically
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const getBadgeStyle = (cat) => {
    const colors = {
      Engineering: { bg: "#e0e7ff", text: "#4338ca" },
      Design: { bg: "#fce7f3", text: "#b7056d" },
      Research: { bg: "#fef3c7", text: "#b45309" },
      General: { bg: "#e2e8f0", text: "#475569" },
    };
    return {
      padding: "0.2rem 0.5rem",
      borderRadius: "6px",
      fontSize: "0.7rem",
      fontWeight: "600",
      backgroundColor: (colors[cat] || colors.General).bg,
      color: (colors[cat] || colors.General).text,
    };
  };

  // Helper styling for High vs Low priority tags
  const getPriorityStyle = (prio) => {
    return prio === "High"
      ? { bg: "#fee2e2", text: "#ef4444" }
      : { bg: "#dcfce7", text: "#15803d" };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {sortedTasks.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "12px",
            borderLeft: item.completed
              ? "4px solid #d1d5db"
              : `4px solid ${item.priority === "High" ? "#ef4444" : "#10b981"}`,
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
            opacity: item.completed ? 0.6 : 1,
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flex: 1,
            }}
          >
            <div
              onClick={() => onToggleTask(item.id)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {item.completed ? (
                <CheckCircle color="#10b981" fill="#e6f4ea" size={22} />
              ) : (
                <Circle color="#d1d5db" size={22} />
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                  color: item.completed ? "#9ca3af" : "#1f2937",
                  fontWeight: "500",
                }}
              >
                {item.text}
              </span>

              {/* Metadata Badges Row */}
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <span style={getBadgeStyle(item.category)}>
                  {item.category}
                </span>
                <span
                  style={{
                    ...getBadgeStyle(),
                    backgroundColor: getPriorityStyle(item.priority).bg,
                    color: getPriorityStyle(item.priority).text,
                  }}
                >
                  {item.priority}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginLeft: "0.25rem",
                  }}
                >
                  <Calendar size={12} /> {item.date}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onDeleteTask(item.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "6px",
            }}
          >
            <Trash2 color="#ef4444" size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
