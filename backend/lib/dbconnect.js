// lib/dbConnect.js
import mongoose from "mongoose";

let isConnected = false; // connection state

export async function dbConnect() {
  if (isConnected) return;

  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  try {
    console.log("🔄 Attempting MongoDB connection...");
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 5,
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
