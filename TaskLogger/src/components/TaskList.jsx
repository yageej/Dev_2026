import React from "react";
import { CheckCircle2, Circle, Trash2, Clock } from "lucide-react";

export default function TaskList({
  tasks,
  activeTab,
  onToggleTask,
  onDeleteTask,
  onSeeMore,
  onOpenForm,
}) {
  if (tasks.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
          backgroundColor: "#121214",
          borderRadius: "14px",
          border: "1px dashed #27272a",
        }}
      >
        <p style={{ color: "#a1a1aa", margin: "0 0 1rem 0" }}>
          No matching log configurations found.
        </p>
        <button
          onClick={onOpenForm}
          style={{
            backgroundColor: "#27272a",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Create Task
        </button>
      </div>
    );
  }

  const todayStr = new Date().toLocaleDateString("sv-SE");

  // Filter groups
  const overdue = tasks.filter((t) => !t.completed && t.date < todayStr);
  const dueToday = tasks.filter((t) => !t.completed && t.date === todayStr);
  const upcoming = tasks.filter((t) => !t.completed && t.date > todayStr);
  const completedTasks = tasks.filter((t) => t.completed);

  const getCategoryStyle = (category) => {
    switch (category) {
      case "Engineering":
        return { bg: "rgba(59, 130, 246, 0.15)", text: "#60a5fa" };
      case "Design":
        return { bg: "rgba(168, 85, 247, 0.15)", text: "#c084fc" };
      case "Research":
        return { bg: "rgba(16, 185, 129, 0.15)", text: "#34d399" };
      default:
        return { bg: "rgba(100, 116, 139, 0.15)", text: "#94a3b8" };
    }
  };

  const getTagStyle = (item) => {
    if (item.completed) {
      return {
        bg: "rgba(34, 197, 94, 0.1)",
        text: "#22c55e",
        label: "Completed",
      };
    }
    if (item.date < todayStr) {
      return {
        bg: "rgba(239, 68, 68, 0.15)",
        text: "#ef4444",
        label: "Overdue",
      };
    }
    if (item.priority === "High") {
      return {
        bg: "rgba(239, 68, 68, 0.15)",
        text: "#ef4444",
        label: "High Priority",
      };
    }
    return {
      bg: "rgba(161, 161, 170, 0.15)",
      text: "#a1a1aa",
      label: item.priority || "Low Priority",
    };
  };

  const renderLinearTaskRow = (item) => {
    const tag = getTagStyle(item);
    const categoryTag = getCategoryStyle(item.category);
    const taskId = item._id || item.id;

    return (
      <div
        key={taskId}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.85rem 1.1rem",
          backgroundColor: "#121214",
          borderBottom: "1px solid #1f1f23",
          opacity: item.completed ? 0.65 : 1,
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            onClick={() => onToggleTask(taskId)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: item.completed ? "#22c55e" : "#52525b",
            }}
          >
            {item.completed ? (
              <CheckCircle2 size={18} fill="#14532d" />
            ) : (
              <Circle size={18} />
            )}
          </div>
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: "500",
              color: item.completed ? "#71717a" : "#ffffff",
              textDecoration: item.completed ? "line-through" : "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.text}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            flexShrink: 0,
          }}
        >
          {item.completed && item.timeConsumed && (
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: "600",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                backgroundColor: "rgba(34, 197, 94, 0.15)",
                color: "#4ade80",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <Clock size={11} />
              {item.timeConsumed}
            </span>
          )}

          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: "600",
              padding: "0.2rem 0.5rem",
              borderRadius: "4px",
              backgroundColor: categoryTag.bg,
              color: categoryTag.text,
            }}
          >
            {item.category || "General"}
          </span>

          {item.date && !item.completed && (
            <span style={{ fontSize: "0.78rem", color: "#52525b" }}>
              {item.date === todayStr ? "Today" : item.date.slice(5)}
            </span>
          )}

          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: "600",
              padding: "0.2rem 0.5rem",
              borderRadius: "4px",
              backgroundColor: tag.bg,
              color: tag.text,
              minWidth: "65px",
              textAlign: "center",
            }}
          >
            {tag.label}
          </span>

          <Trash2
            size={15}
            color="#ef4444"
            style={{ cursor: "pointer", opacity: 0.6 }}
            onClick={() => onDeleteTask(taskId)}
          />
        </div>
      </div>
    );
  };

  const renderLinearSection = (title, subset, labelColor) => {
    if (subset.length === 0) return null;
    const capped = subset.slice(0, 5);
    const hasMore = subset.length > 5;

    return (
      <div style={{ marginBottom: "1.5rem" }}>
        <h3
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: labelColor,
            margin: "0 0 0.5rem 0",
            fontWeight: "700",
          }}
        >
          {title} ({subset.length})
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#121214",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #1f1f23",
          }}
        >
          {capped.map((item) => renderLinearTaskRow(item))}
        </div>

        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "0.4rem" }}>
            <button
              onClick={() => onSeeMore(title, subset)}
              style={{
                background: "none",
                border: "none",
                color: "#3b82f6",
                fontSize: "0.75rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              See More Tasks...
            </button>
          </div>
        )}
      </div>
    );
  };

  // If user clicked "Completed" in sidebar, show ONLY completed list
  if (activeTab === "Completed") {
    return (
      <div>
        {renderLinearSection("Completed Tasks", completedTasks, "#22c55e")}
      </div>
    );
  }

  // Standard Active Views (All Tasks, Priority, Categories, etc.)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {renderLinearSection("Overdue", overdue, "#ef4444")}
      {renderLinearSection("Due Today", dueToday, "#3b82f6")}
      {renderLinearSection("Upcoming", upcoming, "#71717a")}
    </div>
  );
}
