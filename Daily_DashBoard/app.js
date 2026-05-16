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

// 2. LocalStorage Logic for Quick Notes
// Load saved note on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedNote = localStorage.getItem("dashboardNote");
  if (savedNote) {
    noteInput.value = savedNote;
  }
});

// Save note to localStorage on click
saveBtn.addEventListener("click", () => {
  localStorage.setItem("dashboardNote", noteInput.value);

  // Show a quick success status message
  saveStatus.textContent = "Note saved locally!";
  setTimeout(() => {
    saveStatus.textContent = "";
  }, 2000);
});
