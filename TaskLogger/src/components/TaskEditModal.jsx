import React, { useState } from "react";
import { X } from "lucide-react";

export default function TaskEditModal({ task, onSave, onClose }) {
  const [text, setText] = useState(task.text || "");
  const [description, setDescription] = useState(task.description || "");
  const [category, setCategory] = useState(task.category || "General");
  const [priority, setPriority] = useState(task.priority || "Low");
  const [date, setDate] = useState(
    task.date || new Date().toISOString().split("T")[0],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSave(task._id || task.id, {
      text,
      description,
      category,
      priority,
      date,
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1100,
      }}
    >
      <div
        style={{
          backgroundColor: "#121214",
          border: "1px solid #222226",
          width: "90%",
          maxWidth: "480px",
          borderRadius: "14px",
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#ffffff" }}>
            Edit Task
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#8a8a93",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Task Title Input */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}
          >
            <label
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#a1a1aa",
              }}
            >
              TASK TITLE
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              style={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                padding: "0.65rem 0.85rem",
                color: "#ffffff",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </div>

          {/* Task Description */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}
          >
            <label
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#a1a1aa",
              }}
            >
              DESCRIPTION
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                padding: "0.65rem 0.85rem",
                color: "#ffffff",
                fontSize: "0.9rem",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          {/* Category & Priority Row */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#a1a1aa",
                }}
              >
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  padding: "0.65rem 0.85rem",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              >
                <option value="General">General</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Research">Research</option>
              </select>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#a1a1aa",
                }}
              >
                PRIORITY
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  padding: "0.65rem 0.85rem",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              >
                <option value="Low">Low</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Target Date */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}
          >
            <label
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#a1a1aa",
              }}
            >
              DUE DATE
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                padding: "0.65rem 0.85rem",
                color: "#ffffff",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
              marginTop: "0.75rem",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: "#18181b",
                color: "#a1a1aa",
                border: "1px solid #27272a",
                padding: "0.6rem 1.1rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: "600",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                border: "none",
                padding: "0.6rem 1.25rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: "700",
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
