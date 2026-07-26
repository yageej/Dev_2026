import React from "react";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";

export default function TaskList({
  tasks,
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
          padding: "4rem",
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

  // ⚡ FIXED: Swapped out hardcoded string for automatic local clock matching (YYYY-MM-DD format)
  const todayStr = new Date().toLocaleDateString("sv-SE");

  // 1. OVERDUE: Filter items that remain uncompleted and have a deadline string smaller than today
  const overdue = tasks
    .filter((t) => !t.completed && t.date < todayStr)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // 2. DUE TODAY: Filter items matching today's dynamic system stamp
  const dueToday = tasks
    .filter((t) => t.date === todayStr)
    .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));

  // 3. UPCOMING: Filter tasks extending further out into the future
  const upcoming = tasks
    .filter((t) => t.date > todayStr)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // 🎨 Category Badge Style Mapper: Returns distinct color palettes for categories
  const getCategoryStyle = (category) => {
    switch (category) {
      case "Engineering":
        return { bg: "rgba(59, 130, 246, 0.15)", text: "#60a5fa" }; // Soft Blue
      case "Design":
        return { bg: "rgba(168, 85, 247, 0.15)", text: "#c084fc" }; // Vibrant Purple
      case "Research":
        return { bg: "rgba(16, 185, 129, 0.15)", text: "#34d399" }; // Emerald Green
      default:
        return { bg: "rgba(100, 116, 139, 0.15)", text: "#94a3b8" }; // Slate Gray
    }
  };

  // Label pill matching styles
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
    if (item.category === "Engineering") {
      return {
        bg: "rgba(129, 140, 248, 0.15)",
        text: "#818cf8",
        label: "In Progress",
      };
    }
    return {
      bg: "rgba(161, 161, 170, 0.15)",
      text: "#a1a1aa",
      label: item.priority || "Low Priority",
    };
  };

  // Sleek, full-width horizontal row element
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
          padding: "1rem 1.25rem",
          backgroundColor: "#121214",
          borderBottom: "1px solid #1f1f23",
          opacity: item.completed ? 0.5 : 1,
          gap: "1rem",
        }}
      >
        {/* Left Side: Checkbox & Text */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
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
              <CheckCircle2 size={20} fill="#14532d" />
            ) : (
              <Circle size={20} />
            )}
          </div>
          <span
            style={{
              fontSize: "0.95rem",
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

        {/* Right Side: Metadata labels and Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexShrink: 0,
          }}
        >
          {/* Dynamic Category Pill Badge */}
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              padding: "0.25rem 0.65rem",
              borderRadius: "4px",
              backgroundColor: categoryTag.bg,
              color: categoryTag.text,
              textAlign: "center",
            }}
          >
            {item.category || "General"}
          </span>

          {item.date && !item.completed && item.date >= todayStr && (
            <span
              style={{
                fontSize: "0.8rem",
                color: "#52525b",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              {item.date === todayStr ? "Today" : item.date.slice(5)}
            </span>
          )}

          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              padding: "0.25rem 0.65rem",
              borderRadius: "4px",
              backgroundColor: tag.bg,
              color: tag.text,
              minWidth: "75px",
              textAlign: "center",
            }}
          >
            {tag.label}
          </span>

          <Trash2
            size={16}
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
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <h3
            style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: labelColor,
              margin: 0,
              fontWeight: "700",
            }}
          >
            {title}
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#121214",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {capped.map((item) => renderLinearTaskRow(item))}
        </div>

        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            <button
              onClick={() => onSeeMore(title, subset)}
              style={{
                background: "none",
                border: "none",
                color: "#3b82f6",
                fontSize: "0.8rem",
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {renderLinearSection("Overdue", overdue, "#ef4444")}
      {renderLinearSection("Due Today", dueToday, "#3b82f6")}
      {renderLinearSection("Upcoming", upcoming, "#71717a")}
    </div>
  );
}
