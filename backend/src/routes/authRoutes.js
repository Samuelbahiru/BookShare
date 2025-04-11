import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters" });
    }
    // check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // get random avatar
    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    // create new user
    const newUser = await User.create({
      username,
      email,
      password,
      profileImage,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
router.post("/register", async (req, res) => {
  res.send("register route");
});

export default router;
