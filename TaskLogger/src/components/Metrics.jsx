import React, { useState } from "react";
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  Calendar,
  Target,
  Flame,
} from "lucide-react";

export default function Metrics({ tasks }) {
  // State for daily task completion target (defaults to 5)
  const [dailyGoal, setDailyGoal] = useState(5);

  // Get today's local date baseline string (YYYY-MM-DD format)
  const todayStr = new Date().toLocaleDateString("sv-SE");

  // Counts for top cards
  const overdueCount = tasks.filter(
    (t) => !t.completed && t.date < todayStr,
  ).length;
  const dueTodayCount = tasks.filter(
    (t) => !t.completed && t.date === todayStr,
  ).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  // ⚡ TIMEZONE-PROOF TODAY COMPLETION HELPER
  const isCompletedToday = (task) => {
    if (!task.completed) return false;

    // Case A: Check task's scheduled date
    if (task.date === todayStr) return true;

    // Case B: Convert MongoDB updatedAt UTC timestamp into local YYYY-MM-DD date string
    if (task.updatedAt) {
      const updatedLocalDate = new Date(task.updatedAt).toLocaleDateString(
        "sv-SE",
      );
      if (updatedLocalDate === todayStr) return true;
    }

    // Case C: Fallback check for task's createdAt timestamp
    if (task.createdAt) {
      const createdLocalDate = new Date(task.createdAt).toLocaleDateString(
        "sv-SE",
      );
      if (createdLocalDate === todayStr) return true;
    }

    return false;
  };

  // Count all tasks completed today
  const completedTodayCount = tasks.filter(isCompletedToday).length;

  // Calculate percentage toward daily goal (capped at 100%)
  const goalPercentage = Math.min(
    Math.round((completedTodayCount / dailyGoal) * 100),
    100,
  );

  // 🎨 Category color mappings
  const categoryColors = {
    Engineering: "#3b82f6", // Blue
    Design: "#c084fc", // Purple
    Research: "#34d399", // Green
    General: "#94a3b8", // Slate
  };

  // ⏱️ Parse timeConsumed string into total minutes
  const parseMinutes = (timeStr) => {
    if (!timeStr) return 0;
    let mins = 0;
    const hMatch = timeStr.match(/(\d+)h/);
    const mMatch = timeStr.match(/(\d+)m/);
    if (hMatch) mins += parseInt(hMatch[1], 10) * 60;
    if (mMatch) mins += parseInt(mMatch[1], 10);
    return mins;
  };

  // Calculate breakdown per category
  const categoryBreakdown = {
    Engineering: 0,
    Design: 0,
    Research: 0,
    General: 0,
  };
  let grandTotalMinutes = 0;

  tasks.forEach((t) => {
    if (t.completed && t.timeConsumed) {
      const minutes = parseMinutes(t.timeConsumed);
      const cat = categoryColors[t.category] ? t.category : "General";
      categoryBreakdown[cat] += minutes;
      grandTotalMinutes += minutes;
    }
  });

  const totalHoursFormatted = (grandTotalMinutes / 60).toFixed(1) + " hrs";

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
      value: totalHoursFormatted,
      color: "#a855f7",
      bg: "rgba(168, 85, 247, 0.12)",
      border: "rgba(168, 85, 247, 0.25)",
      icon: <Clock size={22} color="#a855f7" />,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        width: "100%",
      }}
    >
      {/* 2x2 HERO METRICS GRID */}
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
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "0.85rem",
              minHeight: "100px",
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
                  fontSize: "0.75rem",
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
                  padding: "0.4rem",
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
                fontSize: "1.8rem",
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

      {/* 🎯 DAILY PRODUCTIVITY TARGET WIDGET */}
      <div
        style={{
          backgroundColor: "#121214",
          border: "1px solid #1f1f23",
          borderRadius: "14px",
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Target size={18} color="#22c55e" />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "#8a8a93",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Daily Focus Target
            </span>
          </div>

          {/* Target Goal Selector Pills */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            {[3, 5, 8].map((goalOption) => (
              <button
                key={goalOption}
                onClick={() => setDailyGoal(goalOption)}
                style={{
                  backgroundColor:
                    dailyGoal === goalOption ? "#22c55e" : "#1f1f23",
                  color: dailyGoal === goalOption ? "#000000" : "#a1a1aa",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.15rem 0.45rem",
                  fontSize: "0.68rem",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                {goalOption}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Display */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span
            style={{ fontSize: "1.3rem", fontWeight: "700", color: "#ffffff" }}
          >
            {completedTodayCount}{" "}
            <span
              style={{
                fontSize: "0.85rem",
                color: "#71717a",
                fontWeight: "500",
              }}
            >
              / {dailyGoal} completed today
            </span>
          </span>
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: "700",
              color: goalPercentage >= 100 ? "#22c55e" : "#3b82f6",
            }}
          >
            {goalPercentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            height: "8px",
            width: "100%",
            backgroundColor: "#1f1f23",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${goalPercentage}%`,
              backgroundColor: goalPercentage >= 100 ? "#22c55e" : "#3b82f6",
              height: "100%",
              borderRadius: "999px",
              transition: "width 0.4s ease",
            }}
          />
        </div>

        {/* Status Hint */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.72rem",
            color: "#71717a",
          }}
        >
          <Flame
            size={14}
            color={goalPercentage >= 100 ? "#22c55e" : "#f59e0b"}
          />
          <span>
            {goalPercentage >= 100
              ? "Awesome! You've reached your daily target."
              : `${dailyGoal - completedTodayCount} more task${
                  dailyGoal - completedTodayCount === 1 ? "" : "s"
                } to hit today's goal.`}
          </span>
        </div>
      </div>

      {/* 📊 CATEGORY TIME DISTRIBUTION BAR */}
      <div
        style={{
          backgroundColor: "#121214",
          border: "1px solid #1f1f23",
          borderRadius: "14px",
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
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
              fontSize: "0.75rem",
              fontWeight: "700",
              color: "#8a8a93",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Time Distribution
          </span>
          <span
            style={{ fontSize: "0.75rem", color: "#52525b", fontWeight: "600" }}
          >
            {grandTotalMinutes > 0
              ? `${(grandTotalMinutes / 60).toFixed(1)} hrs total`
              : "No logged time"}
          </span>
        </div>

        {/* Multi-Segment Horizontal Progress Bar */}
        <div
          style={{
            display: "flex",
            height: "10px",
            width: "100%",
            backgroundColor: "#1f1f23",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          {grandTotalMinutes > 0 ? (
            Object.keys(categoryBreakdown).map((cat) => {
              const mins = categoryBreakdown[cat];
              if (mins === 0) return null;
              const percentage = (mins / grandTotalMinutes) * 100;

              return (
                <div
                  key={cat}
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: categoryColors[cat],
                    height: "100%",
                    transition: "width 0.3s ease",
                  }}
                  title={`${cat}: ${(mins / 60).toFixed(1)} hrs (${Math.round(percentage)}%)`}
                />
              );
            })
          ) : (
            <div
              style={{
                width: "100%",
                backgroundColor: "#27272a",
                height: "100%",
              }}
            />
          )}
        </div>

        {/* Legend List */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.75rem",
            marginTop: "0.25rem",
          }}
        >
          {Object.keys(categoryBreakdown).map((cat) => {
            const mins = categoryBreakdown[cat];
            const percentage =
              grandTotalMinutes > 0
                ? Math.round((mins / grandTotalMinutes) * 100)
                : 0;
            const hours = (mins / 60).toFixed(1);

            return (
              <div
                key={cat}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: categoryColors[cat],
                    display: "inline-block",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#e2e8f0",
                      fontWeight: "600",
                    }}
                  >
                    {cat}
                  </span>
                  <span style={{ fontSize: "0.68rem", color: "#71717a" }}>
                    {percentage}% ({hours}h)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
