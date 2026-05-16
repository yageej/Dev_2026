// DOM Elements
const clockElement = document.getElementById("clock");
const greetingElement = document.getElementById("greeting");
const noteInput = document.getElementById("note-input");
const saveBtn = document.getElementById("save-btn");
const saveStatus = document.getElementById("save-status");

// 1. Live Clock & Dynamic Greeting Function
function updateDashboard() {
  const now = new Date();

  // Format Time (HH:MM:SS AM/PM)
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12
  const formattedHours = String(hours).padStart(2, "0");

  clockElement.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

  // Dynamic Greeting based on 24hr time
  const currentHour = now.getHours();
  if (currentHour < 12) {
    greetingElement.textContent = "Good Morning!";
  } else if (currentHour < 18) {
    greetingElement.textContent = "Good Afternoon!";
  } else {
    greetingElement.textContent = "Good Evening!";
  }
}

// Run clock immediately, then update every second
updateDashboard();
setInterval(updateDashboard, 1000);

/// New DOM Elements for Task Tracker
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// 1. Initialize our tasks array
let tasks = [];

// 2. Load tasks from localStorage on startup
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = localStorage.getItem("dashboardTasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks); // Convert string back to array
    renderTasks();
  }
});

// 3. Function to draw the tasks on the screen
function renderTasks() {
  taskList.innerHTML = ""; // Clear the current list

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

// 4. Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return; // Don't add empty tasks

  tasks.push(taskText); // Add to our array
  localStorage.setItem("dashboardTasks", JSON.stringify(tasks)); // Save array as string

  taskInput.value = ""; // Clear the input box
  renderTasks(); // Update the UI
}

// 5. Function to delete a task
window.deleteTask = function (index) {
  tasks.splice(index, 1); // Remove the item from array
  localStorage.setItem("dashboardTasks", JSON.stringify(tasks)); // Resave the updated array
  renderTasks(); // Update the UI
};

// Event Listeners for adding tasks
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask(); // Add task if user presses Enter key
});
