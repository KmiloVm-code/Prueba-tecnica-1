import user from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const newUser = new user({ username, password, email, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await user.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await foundUser.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const isProduction = process.env.NODE_ENV === "production";

    res
      .status(200)
      .cookie("token", token, { 
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "Lax",
        maxAge: 3600000,
        path: "/"
      })
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.userId;
    const foundUser = await user.findById(userId).select("-password");
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token", { path: "/" })
    .status(200)
    .json({ message: "Logout successful" });
};