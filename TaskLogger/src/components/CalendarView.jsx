import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarView({ tasks, onToggleTask }) {
  // June 2026 application workspace baseline
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 28));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => setCurrentDate(new Date(2026, 5, 28));

  // Calendar alignment math
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Map Sunday (0) to index 6, and Monday-Saturday (1-6) to 0-5
  const startingOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];

  // 1. Fill preceding empty spaces of the first week row
  for (let i = 0; i < startingOffset; i++) {
    calendarCells.push({ dayNumber: "", isCurrentMonth: false });
  }

  // 2. Fill active days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push({ dayNumber: day, isCurrentMonth: true });
  }

  // 3. Always pad out the grid array to exactly 35 or 42 slots to keep standard row counts perfect
  const totalSlots = calendarCells.length > 35 ? 42 : 35;
  while (calendarCells.length < totalSlots) {
    calendarCells.push({ dayNumber: "", isCurrentMonth: false });
  }

  const getTasksForDay = (dayNum) => {
    if (!dayNum) return [];
    const formattedDay = String(dayNum).padStart(2, "0");
    const formattedMonth = String(month + 1).padStart(2, "0");
    const matchString = `${year}-${formattedMonth}-${formattedDay}`;
    return tasks.filter((task) => task.date === matchString);
  };

  const getCategoryTheme = (cat, completed) => {
    if (completed)
      return { bg: "#1f1f23", border: "1px solid #27272a", text: "#52525b" };
    const styles = {
      Engineering: {
        bg: "rgba(59, 130, 246, 0.15)",
        border: "1px solid #3b82f6",
        text: "#60a5fa",
      },
      Design: {
        bg: "rgba(244, 114, 182, 0.15)",
        border: "1px solid #f472b6",
        text: "#fbcfe8",
      },
      Research: {
        bg: "rgba(251, 191, 36, 0.15)",
        border: "1px solid #fbbf24",
        text: "#fde68a",
      },
      General: {
        bg: "rgba(161, 161, 170, 0.15)",
        border: "1px solid #71717a",
        text: "#e2e8f0",
      },
    };
    return styles[cat] || styles.General;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER CONTROLS BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          flexShrink: 0,
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
            {monthNames[month]} {year}
          </h1>
          <p
            style={{
              margin: "0.25rem 0 0 0",
              color: "#8a8a93",
              fontSize: "0.9rem",
            }}
          >
            Your scheduled tasks for the month of {monthNames[month]} {year}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#121214",
            border: "1px solid #1f1f23",
            borderRadius: "10px",
            padding: "0.25rem",
          }}
        >
          <button
            onClick={handlePrevMonth}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              padding: "0.5rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleToday}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: "600",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            TODAY
          </button>
          <button
            onClick={handleNextMonth}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              padding: "0.5rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* CORE INTEGRATED CALENDAR SHIELD SHEET */}
      <div
        style={{
          backgroundColor: "#121214",
          border: "1px solid #1f1f23",
          borderRadius: "14px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* DAYS OF THE WEEK LABEL TRACKS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            borderBottom: "1px solid #1f1f23",
            backgroundColor: "#161619",
            textAlign: "center",
            padding: "0.75rem 0",
          }}
        >
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
            <span
              key={day}
              style={{
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "#52525b",
                letterSpacing: "0.05em",
              }}
            >
              {day}
            </span>
          ))}
        </div>

        {/* 5 OR 6 ROW MESH GRID CELLS HOUSING FLOOR */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridAutoRows: "130px",
            backgroundColor: "#1f1f23",
            gap: "1px",
          }}
        >
          {calendarCells.map((cell, idx) => {
            const dayTasks = getTasksForDay(cell.dayNumber);
            const isToday =
              cell.dayNumber === 28 && month === 5 && year === 2026;

            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "#121214",
                  padding: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  position: "relative",
                  boxSizing: "border-box",
                  height: "130px",
                  borderTop: isToday ? "2px solid #3b82f6" : "none",
                }}
              >
                {/* Day Digit Indicator Label */}
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "700",
                    color: cell.isCurrentMonth
                      ? isToday
                        ? "#3b82f6"
                        : "#e2e8f0"
                      : "#27272a",
                  }}
                >
                  {cell.dayNumber}
                </span>

                {/* Task Capsules Render Track */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                    overflowY: "auto",
                    flex: 1,
                    paddingRight: "1px",
                  }}
                >
                  {dayTasks.map((task) => {
                    const theme = getCategoryTheme(
                      task.category,
                      task.completed,
                    );
                    // ⚡ FIXED: Create a robust fallback identifier string to catch MongoDB hash keys
                    const taskId = task._id || task.id;

                    return (
                      <div
                        key={taskId} // 👈 ⚡ FIXED: Tracking list mutations correctly via unique DB token
                        onClick={() => onToggleTask(taskId)} // 👈 ⚡ FIXED: Route the dynamic click ID over the network
                        style={{
                          backgroundColor: theme.bg,
                          border: theme.border,
                          color: theme.text,
                          padding: "0.25rem 0.5rem",
                          borderRadius: "6px",
                          fontSize: "0.72rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                        }}
                        title={task.text}
                      >
                        {task.text}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
