require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const bcrypt = require("bcrypt");
const MONGO_URI=process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { name,email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
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

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check the password
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

// Start the server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
