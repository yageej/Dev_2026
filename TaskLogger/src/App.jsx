import React, { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import TopNav from "./components/TopNav";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CalendarView from "./components/CalendarView";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Review Q3 Design Specs",
      completed: false,
      category: "Design",
      date: "2026-06-28",
      priority: "High",
      description:
        "Deep dive into the upcoming Q3 interface updates. Focus on accessibility standards and the new dark mode token system implementation.",
    },
    {
      id: 2,
      text: "Database Migration Script",
      completed: false,
      category: "Engineering",
      date: "2026-06-29",
      priority: "High",
      description:
        "Optimize schema indexes and clean out lingering table caches.",
    },
    {
      id: 3,
      text: "Weekly Sync Preparation",
      completed: false,
      category: "General",
      date: "2026-06-14",
      priority: "Low",
      description: "Draft slides for cross-functional alignment.",
    },
    {
      id: 4,
      text: "User Interview Synthesis",
      completed: true,
      category: "Research",
      date: "2026-06-28",
      priority: "Low",
      description: "Compile insights from user validation tests.",
    },
    {
      id: 5,
      text: "API Documentation Update",
      completed: false,
      category: "Engineering",
      date: "2026-06-20",
      priority: "High",
      description: "Document public endpoints for third-party integrations.",
    },
    {
      id: 6,
      text: "Component Library Audit",
      completed: false,
      category: "Design",
      date: "2026-06-18",
      priority: "Low",
      description: "Check component coverage against brand guidelines.",
    },
  ]);

  // View Navigation Filters & Modal Controls
  const [activeTab, setActiveTab] = useState("All Tasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
  const [seeMoreTitle, setSeeMoreTitle] = useState("");
  const [seeMoreTasks, setSeeMoreTasks] = useState([]);

  const addTask = (text, category, date, priority, description) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      category,
      date: date || new Date().toISOString().split("T")[0],
      priority,
      description: description || "No additional parameters provided.",
    };
    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
  };

  const toggleTask = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    setTasks(updated);
    if (isSeeMoreOpen) {
      setSeeMoreTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    if (isSeeMoreOpen) {
      setSeeMoreTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleSeeMore = (title, list) => {
    setSeeMoreTitle(title);
    setSeeMoreTasks(list);
    setIsSeeMoreOpen(true);
  };

  // Filter Pipeline based on left sidebar state & search queries
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === "High Priority") return task.priority === "High";
    if (activeTab === "In Progress") return !task.completed;
    if (activeTab === "Completed") return task.completed;
    return true; // "All Tasks"
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
      {/* Sidebar - Fixed Left Column */}
      <Sidebar
        tasks={tasks}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewTaskClick={() => setIsFormOpen(true)}
      />

      {/* Main Content Area Wrapper - ⚡ FIXED: Using full flex grow with layout boundary isolation */}
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

        {/* ⚡ FIXED: Added explicit width styles so grid layouts can expand symmetrically */}
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
          {/* DYNAMIC NAVIGATION SCREEN RENDERING CONTROLLER */}
          {activeTab === "Calendar" ? (
            <CalendarView tasks={tasks} onToggleTask={toggleTask} />
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "2rem",
                }}
              >
                <div>
                  <h1
                    style={{
                      fontSize: "2rem",
                      margin: 0,
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    {activeTab} ({filteredTasks.length})
                  </h1>
                  <p
                    style={{
                      margin: "0.25rem 0 0 0",
                      color: "#8a8a93",
                      fontSize: "0.9rem",
                    }}
                  >
                    You have{" "}
                    {
                      tasks.filter(
                        (t) => !t.completed && t.date === "2026-06-28",
                      ).length
                    }{" "}
                    tasks due today.
                  </p>
                </div>
              </div>

              <TaskList
                tasks={filteredTasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onSeeMore={handleSeeMore}
                onOpenForm={() => setIsFormOpen(true)}
              />
            </>
          )}
        </main>
      </div>

      {isFormOpen && (
        <TaskForm onAddTask={addTask} onClose={() => setIsFormOpen(false)} />
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
                  key={item.id}
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
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
