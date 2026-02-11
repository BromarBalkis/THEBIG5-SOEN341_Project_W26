// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, message: "Backend is running" });
});

// Optional: root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
