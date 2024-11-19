const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyToken = require("../middleware/verify-token");

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
    });
    console.log("user", user);
    const token = jwt.sign(
      { username: user.username, _id: user._id },
      process.env.JWT_SECRET
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Signin route (Authenticate user)
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET
      );
      //Added "user" to use whole user object including mongo ID for future use
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users (Read)
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, "-hashedPassword");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID (Read)
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-hashedPassword");
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID (Update)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.hashedPassword = bcrypt.hashSync(updates.password, SALT_LENGTH);
      delete updates.password;
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

// Delete a user by ID (Delete)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
