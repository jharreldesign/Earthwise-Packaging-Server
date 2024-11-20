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
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(409).json({ error: "Username already taken." });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, SALT_LENGTH);

    const user = await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      companyName: req.body.companyName,
      address: req.body.address,
      hashedPassword,
      role: req.body.role || "customer", // Default to 'customer'
    });

    const token = jwt.sign(
      { username: user.username, _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Signin route (Authenticate user)
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user based on the username
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Check if the password is correct
    if (password && bcrypt.compareSync(password, user.hashedPassword)) {
      // If password matches, generate a JWT token
      const token = jwt.sign(
        { username: user.username, _id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
      );
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    console.error("Signin error:", error); // Keep for backend debugging
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

// Get all users (Read) - Admin only
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "-hashedPassword");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID (Read) - Admin only
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-hashedPassword");
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID (Update) - Store Managers can update their details, but only Admin can update role
router.put("/:id", verifyToken, verifyStoreManager, async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.hashedPassword = bcrypt.hashSync(updates.password, SALT_LENGTH);
      delete updates.password;
    }

    // Store managers cannot update role
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

// Delete a user by ID (Delete) - Admin only
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
