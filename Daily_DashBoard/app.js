// DOM Elements - Clock & Greeting
const clockElement = document.getElementById("clock");
const greetingElement = document.getElementById("greeting");

// DOM Elements - Task Tracker
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// ==========================================
// 1. LIVE CLOCK & DYNAMIC GREETING
// ==========================================
function updateDashboard() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHours = String(hours).padStart(2, "0");

  clockElement.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

  const currentHour = now.getHours();
  if (currentHour < 12) {
    greetingElement.textContent = "Good Morning!";
  } else if (currentHour < 18) {
    greetingElement.textContent = "Good Afternoon!";
  } else {
    greetingElement.textContent = "Good Evening!";
  }
}

updateDashboard();
setInterval(updateDashboard, 1000);

// ==========================================
// 2. TASK TRACKER CORE LOGIC
// ==========================================

let tasks = []; // Master array holding multiple tasks

// Load tasks from localStorage on startup
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = localStorage.getItem("dashboardTasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
});

// Function to draw the tasks on the screen
function renderTasks() {
  taskList.innerHTML = ""; // Clear the current list UI

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">
                <span class="material-icons">delete</span>
            </button>
        `;
    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask(e) {
  if (e) e.preventDefault(); // 🔥 STOP THE PAGE FROM RELOADING!

  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  tasks.push(taskText); // Add new item to the array list
  localStorage.setItem("dashboardTasks", JSON.stringify(tasks)); // Save the entire updated array

  taskInput.value = ""; // Clear input box
  renderTasks(); // Update the screen
}

// Function to delete a task
window.deleteTask = function (index) {
  tasks.splice(index, 1);
  localStorage.setItem("dashboardTasks", JSON.stringify(tasks));
  renderTasks();
};

// Event Listeners for adding tasks
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask(e); // Pass the event down to stop the reload
  }
});
