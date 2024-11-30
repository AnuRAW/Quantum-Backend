import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cron from "./cron/cron.js";

cron.start();

dotenv.config();

const app = express();
const PORT = 5000;
const JWT_SECRET_KEY = "your_secret_key";
console.log(process.env.MONGO_URI);


// Middleware
app.use(bodyParser.json());
app.use(cors());
// MongoDB Connection
async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("Connection error:", error);
  }
}
connectMongoDB();


// Routes
app.use("/api/auth", authRoutes);


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
