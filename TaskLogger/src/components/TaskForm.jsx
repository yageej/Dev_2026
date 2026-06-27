import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function TaskForm({ onAddTask }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Defaults to today
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAddTask(task, category, date, priority);
    setTask("");
  };

  const inputStyle = {
    padding: "0.6rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db", // Slightly darker gray border for better definition
    backgroundColor: "#f9fafb",
    color: "#1f2937", // 👈 THIS FIXES THE INVISIBLE TEXT FOR EVERYTHING
    fontSize: "0.9rem",
    outline: "none",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "white",
        padding: "1.25rem",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      {/* Top Input Row */}
      <input
        type="text"
        placeholder="Add an objective..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{
          ...inputStyle,
          backgroundColor: "white",
          fontSize: "1rem",
          padding: "0.75rem",
        }}
      />

      {/* Bottom Dropdowns Row */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        >
          <option value="Engineering">🛠️ Engineering</option>
          <option value="Design">🎨 Design</option>
          <option value="Research">🔍 Research</option>
          <option value="General">💼 General</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        >
          <option value="Low">🟢 Low Priority</option>
          <option value="High">🔴 High Priority</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        />

        <button
          type="submit"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.75rem 1rem",
            backgroundColor: "#21a4e1",
            color: "#1f2937",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <PlusCircle size={18} />
        </button>
      </div>
    </form>
  );
}
