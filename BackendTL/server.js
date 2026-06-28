import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Allows our server to read JSON bodies sent by React

// Mock Database Storage Array (Temporary baseline for Module 1)
let tasksCollection = [
  {
    id: 1,
    text: "Review Q3 Design Specs",
    completed: false,
    category: "Design",
    date: "2026-06-28",
    priority: "High",
    description: "Deep dive into the upcoming Q3 interface updates.",
  },
  {
    id: 2,
    text: "Database Migration Script",
    completed: false,
    category: "Engineering",
    date: "2026-06-29",
    priority: "High",
    description: "Optimize schema indexes and clean out caches.",
  },
];

// 🟢 GET: Fetch all log entries
app.get("/api/tasks", (req, res) => {
  res.json(tasksCollection);
});

// 🔵 POST: Create a brand new operational task entry
app.post("/api/tasks", (req, res) => {
  const { text, category, date, priority, description } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Task text string is required." });
  }

  const newDbRecord = {
    id: Date.now(),
    text,
    completed: false,
    category: category || "General",
    date: date || new Date().toISOString().split("T")[0],
    priority: priority || "Low",
    description: description || "",
  };

  tasksCollection.push(newDbRecord);
  res.status(201).json(newDbRecord);
});

// 🟠 PUT: Toggle completion status
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasksCollection.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task record parameters not found." });
  }

  tasksCollection[taskIndex].completed = !tasksCollection[taskIndex].completed;
  res.json(tasksCollection[taskIndex]);
});

// 🔴 DELETE: Remove a configuration row entry
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasksCollection = tasksCollection.filter((t) => t.id !== parseInt(id));
  res.json({ message: "Task log erased successfully.", id: parseInt(id) });
});

app.listen(PORT, () => {
  console.log(`⚡ TaskLogger API Engine running securely on port ${PORT}`);
});
