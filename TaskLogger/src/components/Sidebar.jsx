import React from "react";
import {
  List,
  AlertCircle,
  Clock,
  CheckCircle2,
  Archive,
  HelpCircle,
} from "lucide-react";

export default function Sidebar({
  tasks,
  activeTab,
  setActiveTab,
  onNewTaskClick,
}) {
  const links = [
    { name: "All Tasks", icon: <List size={18} /> },
    { name: "High Priority", icon: <AlertCircle size={18} /> },
    { name: "In Progress", icon: <Clock size={18} /> },
    { name: "Completed", icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "#121214",
        borderRight: "1px solid #1f1f23",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem 1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          paddingLeft: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            backgroundColor: "#3b82f6",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircle2 size={14} color="white" />
        </div>
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          Workspace Dev
        </span>
      </div>

      <button
        onClick={onNewTaskClick}
        style={{
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "10px",
          padding: "0.85rem",
          fontWeight: "600",
          fontSize: "0.9rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "2.25rem",
        }}
      >
        <span>+</span> New Task
      </button>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
          flex: 1,
        }}
      >
        {links.map((link) => {
          const isActive = activeTab === link.name;
          return (
            <button
              key={link.name}
              onClick={() => setActiveTab(link.name)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                width: "100%",
                padding: "0.75rem 0.85rem",
                border: "none",
                borderRadius: "8px",
                backgroundColor: isActive ? "#1f1f23" : "transparent",
                color: isActive ? "#ffffff" : "#8a8a93",
                fontSize: "0.9rem",
                fontWeight: isActive ? "600" : "500",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {link.icon}
              {link.name}
            </button>
          );
        })}
      </nav>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
          borderTop: "1px solid #1f1f23",
          paddingTop: "1rem",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            width: "100%",
            padding: "0.65rem 0.85rem",
            border: "none",
            background: "none",
            color: "#8a8a93",
            fontSize: "0.85rem",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <Archive size={16} /> Archives
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            width: "100%",
            padding: "0.65rem 0.85rem",
            border: "none",
            background: "none",
            color: "#8a8a93",
            fontSize: "0.85rem",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <HelpCircle size={16} /> Help
        </button>
      </div>
    </aside>
  );
}
