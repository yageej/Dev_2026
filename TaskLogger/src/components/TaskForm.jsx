import React, { useState } from "react";

export default function TaskForm({ onAddTask, onClose }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [priority, setPriority] = useState("Low");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    // ⚡ FIXED: Bundle everything into one object matching your MongoDB schema properties!
    onAddTask({
      text: task, // 👈 Maps your 'task' state text string onto the backend schema 'text' property!
      category,
      date,
      priority,
      description,
    });
  };

  const fieldStyle = {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #27272a",
    backgroundColor: "#18181b",
    color: "#ffffff",
    fontSize: "0.9rem",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    marginTop: "0.35rem",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#121214",
          border: "1px solid #1f1f23",
          padding: "2rem",
          borderRadius: "14px",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "1.25rem",
              color: "#ffffff",
              fontWeight: "700",
            }}
          >
            Log Task 🚀
          </h2>
          <p
            style={{
              margin: "0.25rem 0 0 0",
              fontSize: "0.8rem",
              color: "#71717a",
            }}
          >
            Create your task
          </p>
        </div>

        <div>
          <label
            style={{ fontSize: "0.8rem", color: "#a1a1aa", fontWeight: "500" }}
          >
            Objective Title
          </label>
          <input
            type="text"
            placeholder="e.g., Review UI specs..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={fieldStyle}
            required
          />
        </div>

        <div>
          <label
            style={{ fontSize: "0.8rem", color: "#a1a1aa", fontWeight: "500" }}
          >
            Detailed Scope / Description
          </label>
          <textarea
            rows="3"
            placeholder="Provide depth on dependencies or scopes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...fieldStyle, fontFamily: "inherit", resize: "none" }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <label
              style={{
                fontSize: "0.8rem",
                color: "#a1a1aa",
                fontWeight: "500",
              }}
            >
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={fieldStyle}
            >
              <option value="Engineering">🛠️ Engineering</option>
              <option value="Design">🎨 Design</option>
              <option value="Research">🔍 Research</option>
              <option value="General">💼 General</option>
            </select>
          </div>

          <div>
            <label
              style={{
                fontSize: "0.8rem",
                color: "#a1a1aa",
                fontWeight: "500",
              }}
            >
              Priority Tier
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={fieldStyle}
            >
              <option value="Low">🟢 Low Priority</option>
              <option value="High">🔴 High Priority</option>
            </select>
          </div>
        </div>

        <div>
          <label
            style={{ fontSize: "0.8rem", color: "#a1a1aa", fontWeight: "500" }}
          >
            Deadline Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={fieldStyle}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem",
            marginTop: "0.5rem",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: "transparent",
              color: "#a1a1aa",
              border: "1px solid #27272a",
              padding: "0.6rem 1.25rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.85rem",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              padding: "0.6rem 1.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.85rem",
            }}
          >
            Log Record
          </button>
        </div>
      </form>
    </div>
  );
}
