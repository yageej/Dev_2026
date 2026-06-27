import React from "react";
import { ClipboardList } from "lucide-react";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1rem 2rem",
        backgroundColor: "#21a4e1",
        color: "white",
        borderRadius: "8px",
        marginBottom: "1.5rem",
      }}
    >
      <ClipboardList size={28} />
      <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
        Log your task
      </h1>
    </header>
  );
}
