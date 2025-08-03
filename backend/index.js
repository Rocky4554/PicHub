import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import imageRoutes from './routes/imageroutes.js';
import userRoutes from './routes/userroutes.js';
import downloadimageroutes from './routes/downloadimageroutes.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
const corsOptions = {
  origin: 'https://localhost:5173', // Allow specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies/auth headers
  optionsSuccessStatus: 200 // Use 200 for preflight responses
};

// Apply CORS middleware with the specified options
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/images', imageRoutes);
app.use('/api/users', userRoutes);
app.use(downloadimageroutes);
app.use('/api',contactRoutes)

// Serve frontend (Vite dist folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

app.get("/", (req, res) => {
  res.send("Welcome to the Image AI API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❗ Error stack:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


export default app; // vercel don't need app.listen