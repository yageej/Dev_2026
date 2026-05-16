const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Endpoint 1: A basic health check to see if the server is alive
app.get("/", (req, res) => {
  res.send("Pokemon API Server is running beautifully!");
});
