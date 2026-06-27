import React from "react";
import { Search, Bell, Settings } from "lucide-react";
// 1. Keeping your correct double-step back up path
import gojoImage from "../../imgs/gojo.jpg";

export default function TopNav({ searchQuery, setSearchQuery }) {
  return (
    <header
      style={{
        height: "64px",
        borderBottom: "1px solid #1f1f23",
        backgroundColor: "#121214",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span
          style={{ fontSize: "1.1rem", fontWeight: "700", color: "#ffffff" }}
        >
          TaskLogger
        </span>

        <div style={{ position: "relative", width: "320px" }}>
          <Search
            size={16}
            color="#4b5563"
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#18181b",
              color: "#ffffff",
              border: "1px solid #27272a",
              borderRadius: "8px",
              padding: "0.45rem 1rem 0.45rem 2.25rem",
              fontSize: "0.85rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
          color: "#8a8a93",
        }}
      >
        <Bell size={18} style={{ cursor: "pointer" }} />
        <Settings size={18} style={{ cursor: "pointer" }} />

        {/* Avatar Container Wrapper */}
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            backgroundColor: "#27272a",
            border: "1px solid #3f3f46",
            overflow: "hidden",
          }}
        >
          {/* 2. Using gojoImage to perfectly match your import on Line 3 */}
          <img
            src={gojoImage}
            alt="Gojo Satoru"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </header>
  );
}
