// server.js
require("dotenv").config();
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");


const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, message: "Backend is running" });
});

//  root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

const PORT = Number(process.env.PORT) || 3000;
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use(cors({ origin: "http://localhost:5173" }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
