require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const bcrypt = require("bcrypt");
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL
const API_BASE_URL = process.env.API_BASE_URL;

const app = express();

// CORS Middleware - Place this before any routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_URL); // Explicitly set the origin header
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Set allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Set allowed headers
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
  
  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(204).end(); // No Content response
  }
  
  next(); // Continue with the next middleware/route handler
});

// Existing middleware
app.use(express.json());

// CORS configuration using 'cors' library (ensure the origin matches the correct URLs)
app.use(
  cors({
    origin: [CLIENT_URL, API_BASE_URL], // Ensure the URLs are correct in the environment variables
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
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
