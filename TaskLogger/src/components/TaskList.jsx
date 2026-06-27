import React from "react";
import { CheckCircle, Circle, Trash2, Calendar } from "lucide-react";

export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (!tasks || tasks.length === 0) {
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

  // 1. Get today's local date string formatted as YYYY-MM-DD
  const todayStr = new Date().toISOString().split("T")[0]; // "2026-06-27"

  // 2. Separate tasks into two distinct arrays based on the date comparison
  const dueTodayTasks = tasks.filter((task) => task.date === todayStr);
  const futureTasks = tasks
    .filter((task) => task.date !== todayStr)
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Keep future sorted chronologically

  // Helper badge design
  const getBadgeStyle = (cat) => {
    const colors = {
      Engineering: { bg: "#e0e7ff", text: "#4338ca" },
      Design: { bg: "#fce7f3", text: "#b7056d" },
      Research: { bg: "#fef3c7", text: "#b45309" },
      General: { bg: "#e2e8f0", text: "#475569" },
    };
    const current = colors[cat] || colors.General;
    return {
      padding: "0.2rem 0.5rem",
      borderRadius: "6px",
      fontSize: "0.7rem",
      fontWeight: "600",
      backgroundColor: current.bg,
      color: current.text,
    };
  };

  // Reusable card component for rendering individual row items
  const renderTaskCard = (item) => {
    const isHigh = item.priority === "High";
    return (
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
            : `4px solid ${isHigh ? "#ef4444" : "#10b981"}`,
          boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
          opacity: item.completed ? 0.6 : 1,
          borderTop: "1px solid #f3f4f6",
          borderRight: "1px solid #f3f4f6",
          borderBottom: "1px solid #f3f4f6",
          marginBottom: "0.75rem",
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
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            {item.completed ? (
              <CheckCircle color="#10b981" fill="#e6f4ea" size={22} />
            ) : (
              <Circle color="#d1d5db" size={22} />
            )}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}
          >
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                color: item.completed ? "#4b5563" : "#1f2937", // Enhanced contrast dark gray for complete
                fontWeight: "500",
                fontSize: "0.95rem",
              }}
            >
              {item.text}
            </span>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span style={getBadgeStyle(item.category)}>{item.category}</span>
              <span
                style={{
                  padding: "0.2rem 0.5rem",
                  borderRadius: "6px",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                  backgroundColor: isHigh ? "#fee2e2" : "#dcfce7",
                  color: isHigh ? "#ef4444" : "#15803d",
                }}
              >
                {item.priority || "Low"}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  fontSize: "0.75rem",
                  color: "#6b7280",
                }}
              >
                <Calendar size={12} /> {item.date || "No Date"}
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
          }}
        >
          <Trash2 color="#ef4444" size={18} />
        </button>
      </div>
    );
  };

  const headerStyle = {
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#6b7280",
    margin: "1.5rem 0 0.5rem 0",
    fontWeight: "700",
  };

  return (
    <div>
      {/* SECTION 1: DUE TODAY */}
      <h3 style={{ ...headerStyle, marginTop: 0 }}>⚠️ Due Today</h3>
      {dueTodayTasks.length === 0 ? (
        <div
          style={{
            fontSize: "0.85rem",
            color: "#9ca3af",
            italic: "true",
            padding: "0.5rem 0 1rem 0",
          }}
        >
          Clear schedule for today! ✨
        </div>
      ) : (
        dueTodayTasks.map((item) => renderTaskCard(item))
      )}

      {/* SECTION 2: LATER / SCHEDULED */}
      <h3 style={headerStyle}>📅 Upcoming Schedule</h3>
      {futureTasks.length === 0 ? (
        <div
          style={{
            fontSize: "0.85rem",
            color: "#9ca3af",
            padding: "0.5rem 0 1rem 0",
          }}
        >
          No future tasks scheduled.
        </div>
      ) : (
        futureTasks.map((item) => renderTaskCard(item))
      )}
    </div>
  );
}
