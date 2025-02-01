require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const bcrypt = require("bcrypt");

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;
const API_BASE_URL = process.env.API_BASE_URL;

if (!MONGO_URI || !CLIENT_URL) {
  throw new Error('Required environment variables are missing.');
}

const app = express();

// CORS Middleware using 'cors' library
app.use(
  cors({
    origin: CLIENT_URL, // Only allow this client URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials (cookies)
  })
);

// MongoDB connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const saltRounds = process.env.NODE_ENV === 'production' ? 12 : 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await UserModel.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Start server with error handling
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});
