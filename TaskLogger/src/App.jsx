import React, { useState, useEffect } from "react";
import axios from "axios"; // 👈 Import Axios for network requests
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import TaskList from "./components/TaskList";
import CalendarView from "./components/CalendarView";
import TaskForm from "./components/TaskForm";
import Metrics from "./components/Metrics";
import TaskEditModal from "./components/TaskEditModal";

// Define our secure backend route locator endpoint base string URL
const API_BASE_URL = "http://localhost:5001/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("All Tasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
  const [seeMoreTasks, setSeeMoreTasks] = useState([]);
  const [seeMoreTitle, setSeeMoreTitle] = useState("");
  const liveTodayStr = new Date().toISOString().split("T")[0];
  const [editingTask, setEditingTask] = useState(null);

  // ⏱️ NEW: Time Consumed Completion Modal States
  const [completingTask, setCompletingTask] = useState(null);
  const [timeConsumedInput, setTimeConsumedInput] = useState("");

  // 📁 1. FETCH ALL TASKS FROM THE DATABASE ON COMPONENT MOUNT
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks from MongoDB engine:", error);
    }
  };

  // 🔵 2. CREATE A TASK RECORD INSIDE MONGODB
  const addTask = async (taskData) => {
    try {
      const response = await axios.post(API_BASE_URL, taskData);
      setTasks((prev) => [...prev, response.data]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving task record:", error);
    }
  };

  // 🟠 3. TOGGLE TASK COMPLETION VALUE & INTERCEPT FOR TIME LOGGING
  const toggleTask = async (id, overrideTime = null) => {
    const targetTask = tasks.find((t) => (t._id || t.id) === id);
    if (!targetTask) return;

    // ⚡ If task is currently uncompleted and no time has been provided yet, trigger the modal!
    if (!targetTask.completed && overrideTime === null) {
      setCompletingTask(targetTask);
      setTimeConsumedInput("");
      return;
    }

    try {
      // Pass timeConsumed in payload when marking complete
      const payload = targetTask.completed
        ? {}
        : { timeConsumed: overrideTime || timeConsumedInput || "N/A" };

      const response = await axios.put(`${API_BASE_URL}/${id}`, payload);
      setTasks((prev) =>
        prev.map((task) =>
          (task._id || task.id) === id ? response.data : task,
        ),
      );

      // Close time completion modal if open
      setCompletingTask(null);
      setTimeConsumedInput("");
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // 🔴 4. DELETE A TASK RECORD FROM THE DISK DATABASE
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTasks((prev) => prev.filter((task) => (task._id || task.id) !== id));
    } catch (error) {
      console.error("Error purging task entry record mapping indexes:", error);
    }
  };

  const updateTask = async (id, updatedFields) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedFields);
      setTasks((prev) =>
        prev.map((task) =>
          (task._id || task.id) === id ? response.data : task,
        ),
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task fields:", error);
    }
  };
  const handleSeeMore = (title, items) => {
    setSeeMoreTitle(title);
    setSeeMoreTasks(items);
    setIsSeeMoreOpen(true);
  };

  // ⚡ UPDATED: Filter computation layer handles live text search (title & description) and category/priority tab filters
  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (task.text && task.text.toLowerCase().includes(query)) ||
      (task.description && task.description.toLowerCase().includes(query));

    // Convert status and tab assignments matching structural UI tracks
    if (!matchesSearch) return false;
    if (activeTab === "All Tasks") return true;
    if (activeTab === "High Priority") return task.priority === "High";
    if (activeTab === "In Progress") return !task.completed;
    if (activeTab === "Completed") return task.completed;

    // Support category-specific filters (Engineering, Design, Research, General)
    if (["Engineering", "Design", "Research", "General"].includes(activeTab)) {
      return task.category === activeTab;
    }

    return true;
  });

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#0b0b0c",
        minHeight: "100vh",
        width: "100vw",
        color: "#e2e8f0",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflow: "hidden",
      }}
    >
      <Sidebar
        tasks={tasks}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewTaskClick={() => setIsFormOpen(true)}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100vh",
        }}
      >
        <TopNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main
          style={{
            flex: 1,
            padding: "2.5rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {activeTab === "Calendar" ? (
            <CalendarView tasks={tasks} onToggleTask={toggleTask} />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr", // 👈 Equal 50/50 split balance
                gap: "2.5rem",
                alignItems: "start",
                width: "100%",
                maxWidth: "1400px", // Prevents ridiculous stretching on ultrawide monitors
              }}
            >
              {/* LEFT COLUMN: OVERVIEW CARDS */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.2rem",
                    margin: 0,
                    color: "#ffffff",
                    fontWeight: "700",
                    textAlign: "left",
                  }}
                >
                  Overview
                </h2>
                <Metrics tasks={tasks} />
              </div>

              {/* RIGHT COLUMN: MAIN TASK LIST */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "1.2rem",
                      margin: 0,
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    {activeTab} ({filteredTasks.length})
                  </h1>
                </div>

                <TaskList
                  tasks={filteredTasks}
                  activeTab={activeTab}
                  onToggleTask={toggleTask}
                  onDeleteTask={deleteTask}
                  onEditTask={(task) => setEditingTask(task)}
                  onSeeMore={handleSeeMore}
                  onOpenForm={() => setIsFormOpen(true)}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {isFormOpen && (
        <TaskForm onAddTask={addTask} onClose={() => setIsFormOpen(false)} />
      )}
      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onSave={updateTask}
          onClose={() => setEditingTask(null)}
        />
      )}
      {/* ⏱️ TIME CONSUMED PROMPT MODAL WITH CONSTRAINED NUMERIC PICKERS */}
      {completingTask && (
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
              maxWidth: "420px",
              borderRadius: "14px",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#ffffff" }}>
                Complete Task
              </h3>
              <p
                style={{
                  margin: "0.35rem 0 0 0",
                  color: "#8a8a93",
                  fontSize: "0.85rem",
                }}
              >
                Select time spent to finish:{" "}
                <strong style={{ color: "#3b82f6" }}>
                  {completingTask.text}
                </strong>
              </p>
            </div>

            {/* Structured Duration Inputs: Hours & Minutes */}
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
                  HOURS
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  placeholder="0"
                  value={timeConsumedInput.split(":")[0] || ""}
                  onChange={(e) => {
                    const hrs = e.target.value;
                    const mins = timeConsumedInput.split(":")[1] || "0";
                    setTimeConsumedInput(`${hrs}:${mins}`);
                  }}
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
                  MINUTES
                </label>

                <input
                  type="number"
                  min="0"
                  max="59"
                  step="5"
                  placeholder="0"
                  value={timeConsumedInput.split(":")[1] || ""}
                  onChange={(e) => {
                    const hrs = timeConsumedInput.split(":")[0] || "0";
                    const mins = e.target.value;
                    setTimeConsumedInput(`${hrs}:${mins}`);
                  }}
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
            </div>

            {/* Quick-Preset Shortcut Chips */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {["0:15", "0:30", "1:00", "2:00"].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTimeConsumedInput(preset)}
                  style={{
                    flex: 1,
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    color: "#a1a1aa",
                    padding: "0.35rem",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {preset.startsWith("0:")
                    ? `${preset.split(":")[1]}m`
                    : `${preset.split(":")[0]}h`}
                </button>
              ))}
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
                onClick={() => setCompletingTask(null)}
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
                onClick={() => {
                  const [h, m] = timeConsumedInput.split(":");
                  const hours = parseInt(h || 0, 10);
                  const mins = parseInt(m || 0, 10);

                  // Format string nicely for display (e.g., "1h 30m" or "45m")
                  let formatted = "";
                  if (hours > 0) formatted += `${hours}h `;
                  if (mins > 0 || hours === 0) formatted += `${mins}m`;

                  toggleTask(
                    completingTask._id || completingTask.id,
                    formatted.trim(),
                  );
                }}
                style={{
                  backgroundColor: "#22c55e",
                  color: "#000000",
                  border: "none",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: "700",
                }}
              >
                Confirm Completion
              </button>
            </div>
          </div>
        </div>
      )}
      {isSeeMoreOpen && (
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
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#121214",
              border: "1px solid #222226",
              width: "90%",
              maxWidth: "550px",
              borderRadius: "14px",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
                borderBottom: "1px solid #222226",
                paddingBottom: "0.75rem",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#ffffff" }}>
                {seeMoreTitle}
              </h3>
              <button
                onClick={() => setIsSeeMoreOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#8a8a93",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
              {seeMoreTasks.map((item) => (
                <div
                  key={item._id || item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem",
                    backgroundColor: "#18181b",
                    borderRadius: "8px",
                    marginBottom: "0.5rem",
                    border: "1px solid #222226",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: item.completed ? "#52525b" : "#e2e8f0",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={() => setIsSeeMoreOpen(false)}
                style={{
                  backgroundColor: "#222226",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Dead code blocks from original structure preserved
