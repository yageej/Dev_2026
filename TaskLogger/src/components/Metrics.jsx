import React from "react";
import { AlertCircle, Clock, CheckCircle2, Calendar } from "lucide-react";

export default function Metrics({ tasks }) {
  const todayStr = new Date().toLocaleDateString("sv-SE");

  const overdueCount = tasks.filter(
    (t) => !t.completed && t.date < todayStr,
  ).length;
  const dueTodayCount = tasks.filter(
    (t) => !t.completed && t.date === todayStr,
  ).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const calculateTotalHours = () => {
    let totalMinutes = 0;
    tasks.forEach((t) => {
      if (t.completed && t.timeConsumed) {
        const hMatch = t.timeConsumed.match(/(\d+)h/);
        const mMatch = t.timeConsumed.match(/(\d+)m/);
        if (hMatch) totalMinutes += parseInt(hMatch[1], 10) * 60;
        if (mMatch) totalMinutes += parseInt(mMatch[1], 10);
      }
    });

    const hours = (totalMinutes / 60).toFixed(1);
    return `${hours} hrs`;
  };

  const cards = [
    {
      title: "Overdue",
      value: overdueCount,
      color: "#ef4444",
      bg: "rgba(239, 68, 68, 0.12)",
      border: "rgba(239, 68, 68, 0.25)",
      icon: <AlertCircle size={22} color="#ef4444" />,
    },
    {
      title: "Due Today",
      value: dueTodayCount,
      color: "#3b82f6",
      bg: "rgba(59, 130, 246, 0.12)",
      border: "rgba(59, 130, 246, 0.25)",
      icon: <Calendar size={22} color="#3b82f6" />,
    },
    {
      title: "Completed",
      value: completedCount,
      color: "#22c55e",
      bg: "rgba(34, 197, 94, 0.12)",
      border: "rgba(34, 197, 94, 0.25)",
      icon: <CheckCircle2 size={22} color="#22c55e" />,
    },
    {
      title: "Logged Time",
      value: calculateTotalHours(),
      color: "#a855f7",
      bg: "rgba(168, 85, 247, 0.12)",
      border: "rgba(168, 85, 247, 0.25)",
      icon: <Clock size={22} color="#a855f7" />,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1.25rem",
        width: "100%",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#121214",
            border: `1px solid ${card.border}`,
            borderRadius: "14px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "1rem",
            minHeight: "110px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: "700",
                color: "#8a8a93",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {card.title}
            </span>
            <div
              style={{
                padding: "0.45rem",
                borderRadius: "8px",
                backgroundColor: card.bg,
                display: "flex",
              }}
            >
              {card.icon}
            </div>
          </div>
          <span
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#ffffff",
              lineHeight: "1",
            }}
          >
            {card.value}
          </span>
        </div>
      ))}
    </div>
  );
}
