// ==========================================
// 1. IMPORTING CORE APPLICATION DEPENDENCIES
// ==========================================
// 'express' is our core web server frame. It handles catching web requests from browsers.
import express from "express";
// 'cors' stands for Cross-Origin Resource Sharing. It's a security guard that permits
// our React front-end (running on port 5173) to securely talk to this API server (running on port 5001).
import cors from "cors";
// 'dotenv' safely reads configuration key-value variables hidden inside an isolated '.env' text file.
import dotenv from "dotenv";
// 'mongoose' acts as the code translator bridge between our Node.js server scripts and our MongoDB database files.
import mongoose from "mongoose";

// Initialize the dotenv package so it processes environment strings early on system boot.
dotenv.config();

// Create an instance of our server worker machine using Express.
const app = express();
// Declare our network gateway location. It defaults to 5001 if not explicitly overridden by system profiles.
const PORT = process.env.PORT || 5001;

// ==========================================
// 2. CONFIGURING EXPRESS INTERCEPTOR MIDDLEWARES
// ==========================================
// Tell our server machine to activate the CORS security filter rule.
app.use(cors());
// Crucial: Tell Express to look for JSON text data strings inside incoming request message body shells,
// and automatically convert them into clear, traversable JavaScript objects for our route logic blocks.
app.use(express.json());

// ==========================================
// 3. SECURING NATIVE MONGODB PIPELINE CONNECTIONS
// ==========================================
// We direct mongoose to point to our local Mac Homebrew loopback network node address (127.0.0.1).
// The standard database entrance port is 27017, and '/tasklogger' creates a custom isolated storage box name.
mongoose
  .connect("mongodb://127.0.0.1:27017/tasklogger")
  .then(() =>
    console.log("📁 MongoDB connected successfully to your Mac system!"),
  )
  .catch((err) =>
    console.error("❌ Database connection error layout mismatch:", err),
  );

// ==========================================
// 4. CONFIGURING DATA SCHEMA IDENTIFICATION Blueprints
// ==========================================
// A Schema is a legal structural blueprint sheet. MongoDB databases are flexible, but we want to force
// absolute structural safety constraints so text characters never accidentally collide or corrupt.
const taskSchema = new mongoose.Schema(
  {
    // The task's display name text. It must be a plain text string and cannot be blank or missing.
    text: { type: String, required: true },
    // Tracks if the task row is checked off. If not specified during creation, it defaults to uncompleted.
    completed: { type: Boolean, default: false },
    // Capsule display category filter tag context strings.
    category: { type: String, default: "General" },
    // Format standard track indicator string (e.g., "2026-06-28").
    date: { type: String, required: true },
    // Priority index ranking indicators for layout groupings ("High", "Low").
    priority: { type: String, default: "Low" },
    // Additional details. If left blank, it drops an empty text container down safely.
    description: { type: String, default: "" },
    // ⚡ NEW: Stores duration tracking data (e.g., "1.5 hrs", "45 mins") logged upon task completion!
    timeConsumed: { type: String, default: "" },
  },
  {
    // Instructs MongoDB to automatically append custom 'createdAt' and 'updatedAt' date parameters
    // to records so we always know exactly when configuration changes occurred!
    timestamps: true,
  },
);

// Compile our blueprint rules down into an operational Model worker object called 'Task'.
// We will interact with this 'Task' constructor model directly to read and write database sectors.
const Task = mongoose.model("Task", taskSchema);

// ==========================================
// 5. REST API ROUTING NETWORK SERVICE GATEWAYS
// ==========================================

// ------------------------------------------
// 🟢 ROUTE 1: FETCH ALL LOG ENTRIES (GET)
// ------------------------------------------
// When React fires an HTTP 'GET' call to http://localhost:5001/api/tasks, this logic block executes.
app.get("/api/tasks", async (req, res) => {
  try {
    // Look inside our MongoDB disk tables and pull out every single matching file doc item record.
    // Leaving an empty object '{}' inside .find() tells it to return everything without filtering.
    const tasks = await Task.find({});
    // Send the array of task objects back across the wire network as a clean JSON text array structure.
    res.json(tasks);
  } catch (error) {
    // If a drive chip reads faultily or database links drop out, return a 500 Server Error status flag.
    res
      .status(500)
      .json({ error: "Failed to fetch data tracks from hardware sectors." });
  }
});

// ------------------------------------------
// 🔵 ROUTE 2: CREATE A BRAND NEW LOG ENTRY (POST)
// ------------------------------------------
// Triggered when clicking 'Save/Add Task' inside our dashboard view form fields.
app.post("/api/tasks", async (req, res) => {
  try {
    // Deconstruct individual variable strings sent inside the incoming network body cargo array.
    const { text, category, date, priority, description } = req.body;

    // Safety check: Validation gate logic. Reject early if title names are empty strings.
    if (!text) {
      return res.status(400).json({
        error: "Task text string is required to build a baseline doc.",
      });
    }

    // Instanciate a new, fresh Document instance from our model blueprint layout definitions.
    const newTaskDoc = new Task({
      text,
      category: category || "General",
      // If no target date map was picked, automatically fallback to today's date tracking stamp string.
      date: date || new Date().toISOString().split("T")[0],
      priority: priority || "Low",
      description: description || "",
      timeConsumed: "",
    });

    // Commit the newly stamped object to your Mac's physical hard disk files.
    // MongoDB automatically appends a completely unique ID hash code under a new field named '_id'.
    const savedRecord = await newTaskDoc.save();

    // Return a 201 Created HTTP status token together with the shiny new database entry log!
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({
      error: "Failed to persist new database document configuration records.",
    });
  }
});

// ------------------------------------------
// 🟠 ROUTE 3: TOGGLE COMPLETION BOOLEAN VALUE & LOG TIME (PUT)
// ------------------------------------------
// Target strings parameter references get extracted via URL param trackers (e.g., /api/tasks/64b1f28c...)
app.put("/api/tasks/:id", async (req, res) => {
  try {
    // Grab the exact unique ID variable parameter passed at the end of the HTTP address row line.
    const { id } = req.params;
    // Extract potential time tracking payload sent from frontend modal
    const { timeConsumed } = req.body;

    // Find the record matching that precise ID inside our MongoDB collection directory.
    const currentTask = await Task.findById(id);

    // If no document exists matching that ID key identifier path string, reject request.
    if (!currentTask) {
      return res.status(404).json({
        error:
          "Target task record parameters not found inside directory catalogs.",
      });
    }

    // Flip the target boolean status flag value to its polar opposite switch toggle assignment.
    currentTask.completed = !currentTask.completed;

    // ⚡ UPDATED: If task is being completed, store the timeConsumed string payload
    if (currentTask.completed && timeConsumed) {
      currentTask.timeConsumed = timeConsumed;
    } else if (!currentTask.completed) {
      // Optional: Reset time consumed if uncompleted
      currentTask.timeConsumed = "";
    }

    // Re-save the modified file block back to your Mac drive partitions.
    const updatedRecord = await currentTask.save();

    // Send the fresh updated item doc structural status array tracking states back up to React.
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({
      error:
        "Failed to modify target database document metadata fields tracking states.",
    });
  }
});

// ------------------------------------------
// 🔴 ROUTE 4: ERASE A RECORD TRACK COMPLETELY (DELETE)
// ------------------------------------------
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Target the file directly and delete it immediately from storage records in one quick command pass.
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ error: "Record index missing from catalog mapping rows." });
    }

    // Return confirmation status parameters so the React frontend knows it can safely drop it from the layout screens.
    res.json({
      message: "Task log erased successfully from disk database structures.",
      id,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to clear target configuration records mapping indexes.",
    });
  }
});

// ==========================================
// 6. START THE ENGINE MONITOR LISTENER WIDGETS
// ==========================================
// Fire up the listener engine. The system starts checking the network interface line continually.
app.listen(PORT, () => {
  console.log(`⚡ TaskLogger API Engine running securely on port ${PORT}`);
});

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose"; // 👈 1. Import Mongoose

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // 🔌 2. CONNECT TO YOUR LOCAL MONGODB INSTANCE
// // This securely connects to the background service we just spun up via Homebrew
// mongoose
//   .connect("mongodb://127.0.0.1:27017/tasklogger")
//   .then(() =>
//     console.log("📁 MongoDB connected successfully to your Mac system!"),
//   )
//   .catch((err) => console.error("❌ Database connection error:", err));

// // 📝 3. DEFINE THE DATABASE SCHEMA STRUCTURE
// // This enforces structural safety rules for what a "task record" must look like inside the database rows
// const taskSchema = new mongoose.Schema(
//   {
//     text: { type: String, required: true },
//     completed: { type: Boolean, default: false },
//     category: { type: String, default: "General" },
//     date: { type: String, required: true },
//     priority: { type: String, default: "Low" },
//     description: { type: String, default: "" },
//     timeConsumed: { type: String, default: "" },
//   },
//   { timestamps: true },
// ); // Automatically logs creation time metadata under the hood

// const Task = mongoose.model("Task", taskSchema);

// // 🟢 GET: Fetch all log entries straight out of MongoDB
// app.get("/api/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch data tracks." });
//   }
// });

// // 🔵 POST: Create a brand new operational task document inside MongoDB
// app.post("/api/tasks", async (req, res) => {
//   try {
//     const { text, category, date, priority, description } = req.body;

//     if (!text) {
//       return res.status(400).json({ error: "Task text string is required." });
//     }

//     const newTaskDoc = new Task({
//       text,
//       category: category || "General",
//       date: date || new Date().toISOString().split("T")[0],
//       priority: priority || "Low",
//       description: description || "",
//       timeConsumed: "",
//     });

//     const savedRecord = await newTaskDoc.save();
//     res.status(201).json(savedRecord);
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to persist new database document configuration.",
//     });
//   }
// });

// // 🟠 PUT: Toggle completion status securely using unique Database Object IDs
// app.put("/api/tasks/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { timeConsumed } = req.body;
//     const currentTask = await Task.findById(id);

//     if (!currentTask) {
//       return res
//         .status(404)
//         .json({ error: "Task record parameters not found." });
//     }

//     // Toggle the boolean switch state values
//     currentTask.completed = !currentTask.completed;
//     if (currentTask.completed && timeConsumed) {
//       currentTask.timeConsumed = timeConsumed;
//     } else if (!currentTask.completed) {
//       currentTask.timeConsumed = "";
//     }

//     const updatedRecord = await currentTask.save();

//     res.json(updatedRecord);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to modify database document metadata fields." });
//   }
// });

// // 🔴 DELETE: Remove a configuration row entry completely from the database disc storage
// app.delete("/api/tasks/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedTask = await Task.findByIdAndDelete(id);

//     if (!deletedTask) {
//       return res
//         .status(404)
//         .json({ error: "Record index missing from catalog mapping rows." });
//     }

//     res.json({
//       message: "Task log erased successfully from disk database structures.",
//       id,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to clear target configuration records mapping indexes.",
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`⚡ TaskLogger API Engine running securely on port ${PORT}`);
// });
