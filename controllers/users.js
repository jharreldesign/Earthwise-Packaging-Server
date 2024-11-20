const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = require('../middleware/verify-token');
const { verifyAdmin, verifyStoreManager } = require('../middleware/role-check');

const SALT_LENGTH = 12;

// Signup route (Create user)
router.post("/signup", async (req, res) => {
  try {
    const { username, password, name, email, phoneNumber, companyName, address, role = 'customer' } = req.body;

    // Validate that all required fields are provided
    if (!username || !password || !name || !email) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if user exists
    const userInDatabase = await User.findOne({ username });
    if (userInDatabase) {
      return res.status(409).json({ error: "Username already taken." });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);

    // Create user
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

    // Generate JWT
    const token = jwt.sign(
      { username: user.username, _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({ error: error.message });
  }
});

// Signin route (Authenticate user)
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // If the user does not have a password stored, throw an error
    if (!user.hashedPassword) {
      return res.status(500).json({ error: "User password data is corrupted. Please reset your password." });
    }

    // Compare the provided password with the stored hash
    const isPasswordMatch = bcrypt.compareSync(password, user.hashedPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

// Admin routes (Get all users)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "-hashedPassword");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID (Read)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-hashedPassword");
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user by ID (Store managers can update their details, Admin can update role)
router.put("/:id", verifyToken, verifyStoreManager, async (req, res) => {
  try {
    const updates = req.body;

    // Hash password if provided
    if (updates.password) {
      updates.hashedPassword = bcrypt.hashSync(updates.password, SALT_LENGTH);
      delete updates.password;
    }

    // Ensure managers cannot update their roles
    if (updates.role) {
      return res.status(403).json({ error: "Cannot update role." });
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user by ID (Admin only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
