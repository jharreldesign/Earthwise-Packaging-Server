const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyToken = require("../middleware/verify-token");
const { verifyAdmin, verifyStoreManager } = require("../middleware/role-check");

const SALT_LENGTH = 12;

// Signup route (Create user)
router.post("/signup", async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      companyName,
      address,
      role = "customer",
    } = req.body;

    if (!username || !password || !name || !email) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);

    const user = await User.create({
      username,
      name,
      email,
      phoneNumber,
      companyName,
      address,
      hashedPassword,
      role,
    });

    const token = jwt.sign(
      { username: user.username, _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "An unexpected error occurred during signup." });
  }
});

// Signin route (Authenticate user)
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    if (!user.hashedPassword) {
      return res
        .status(500)
        .json({ error: "Password data is missing. Please reset your password." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
      { username: user.username, _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "An unexpected error occurred during signin." });
  }
});

// Admin routes (Get all users)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "-hashedPassword");
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// Get user by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-hashedPassword");
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Failed to fetch user details." });
  }
});

// Update user by ID
router.put("/:id", verifyToken, verifyStoreManager, async (req, res) => {
  try {
    const updates = req.body;

    if (updates.password) {
      updates.hashedPassword = await bcrypt.hash(updates.password, SALT_LENGTH);
      delete updates.password;
    }

    if (updates.role) {
      return res.status(403).json({ error: "You are not authorized to update roles." });
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(400).json({ error: "Failed to update user details." });
  }
});

// Delete user by ID
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json({ message: "User deleted successfully.", user });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Failed to delete user." });
  }
});

module.exports = router;
