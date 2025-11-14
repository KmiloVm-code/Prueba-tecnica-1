import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { verifyToken } from "./middleware/verifyToken.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
    credentials: true,
  })
);
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", verifyToken, userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
