// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import imageRoutes from './routes/imageroutes.js';  // Make sure filename matches
// import userRoutes from './routes/userroutes.js';    // Make sure filename matches  
// import contactRoutes from './routes/contactRoutes.js'; // Make sure filename matches


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT;
// const MONGODB_URI = process.env.MONGODB_URI;

// // Middleware
// const corsOptions = {
//   origin: [
//     'http://localhost:3000',        // Local development
//     'http://localhost:5173',
//     'https://pic-hub-one.vercel.app']  // Your deployed Vercel app
//   , // Allow specific origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//   credentials: true, // Allow cookies/auth headers
//   optionsSuccessStatus: 200 // Use 200 for preflight responses
// };

// // Apply CORS middleware with the specified options
// app.use(cors(corsOptions));
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// mongoose.connect(MONGODB_URI)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// // Routes
// app.use('/api/images', imageRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api',contactRoutes)

// // Serve frontend (Vite dist folder)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const distPath = path.join(__dirname, 'dist');

// app.use(express.static(distPath));


// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(distPath, 'index.html'));
// // });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('❗ Error stack:', err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(distPath, 'index.html'));
// // });
// app.get(/^(?!\/api).*$/, (req, res) => {
//   res.sendFile(path.join(distPath, 'index.html'));
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// // export default app; // vercel don't need app.listen

///////
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import imageRoutes from '../routes/imageroutes.js';
// import userRoutes from '../routes/userroutes.js';
// import contactRoutes from '../routes/contactRoutes.js';

// dotenv.config();

// const app = express();

// // Middleware
// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'http://localhost:5173',
//     'https://pic-hub-one.vercel.app'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// // MongoDB Connection (Connect immediately)
// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) return;
  
//   try {
//     console.log('🔄 Attempting to connect to MongoDB...');
//     console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    
//     await mongoose.connect(process.env.MONGODB_URI, {
//       serverSelectionTimeoutMS: 30000,
//       socketTimeoutMS: 45000,
//       maxPoolSize: 5,
//       minPoolSize: 0,
//       bufferCommands: false,
//     });
//     isConnected = true;
//     console.log('✅ Connected to MongoDB');
//   } catch (error) {
//     console.error('❌ MongoDB connection error:', error);
//     throw error;
//   }
// };

// // Connect immediately when server starts
// connectDB().catch(console.error);

// // Database middleware for each request
// app.use(async (req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (error) {
//     console.error('Database connection failed:', error);
//     res.status(500).json({ error: 'Database connection failed' });
//   }
// });

// // API Routes
// app.use('/api/images', imageRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/contact', contactRoutes);

// // Serve static files from dist folder
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const distPath = path.join(__dirname, '../dist'); // Go up one level to reach dist

// app.use(express.static(distPath));

// // Handle frontend routes (for React Router)
// app.get(/^(?!\/api).*$/, (req, res) => {
//   res.sendFile(path.join(distPath, 'index.html'));
// });

// // Error handling
// app.use((err, req, res, next) => {
//   console.error('❗ Error stack:', err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // For local development
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//     console.log(`📁 Serving static files from: ${distPath}`);
//   });
// }

// // Export for Vercel
// export default app;
///////////

// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import imageRoutes from '../routes/imageroutes.js';
// import userRoutes from '../routes/userroutes.js';
// import contactRoutes from '../routes/contactRoutes.js';

// dotenv.config();

// const app = express();

// // Middleware
// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'http://localhost:5173',
//     'https://pic-hub-one.vercel.app',
//     'https://pic-hub-jab2.vercel.app',  // Add your frontend domain
//     /^https:\/\/.*\.vercel\.app$/       // Allow all vercel apps
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// // MongoDB Connection (Connect immediately)
// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) return;
  
//   try {
//     console.log('🔄 Attempting to connect to MongoDB...');
//     console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    
//     await mongoose.connect(process.env.MONGODB_URI, {
//       serverSelectionTimeoutMS: 30000,
//       socketTimeoutMS: 45000,
//       maxPoolSize: 5,
//       minPoolSize: 0,
//     });
//     isConnected = true;
//     console.log('✅ Connected to MongoDB');
//   } catch (error) {
//     console.error('❌ MongoDB connection error:', error);
//     throw error;
//   }
// };

// // Connect immediately when server starts
// connectDB().catch(console.error);

// // Database middleware - ENSURES connection before ANY query
// app.use(async (req, res, next) => {
//   try {
//     console.log(`🔍 ${req.method} ${req.path} - Checking database connection...`);
    
//     // Ensure database is connected before processing request
//     await connectDB();
    
//     // Double check connection is ready
//     if (mongoose.connection.readyState !== 1) {
//       throw new Error('Database connection not ready');
//     }
    
//     console.log(`✅ Database ready for ${req.method} ${req.path}`);
//     next();
//   } catch (error) {
//     console.error('❌ Database connection failed for request:', error);
//     res.status(500).json({ 
//       error: 'Database connection failed',
//       details: error.message 
//     });
//   }
// });

// // API Routes
// app.use('/api/images', imageRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/contact', contactRoutes);

// // Serve static files from dist folder
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const distPath = path.join(__dirname, '../dist'); // Go up one level to reach dist

// app.use(express.static(distPath));

// // Handle frontend routes (for React Router)
// app.get(/^(?!\/api).*$/, (req, res) => {
//   res.sendFile(path.join(distPath, 'index.html'));
// });

// // Error handling
// app.use((err, req, res, next) => {
//   console.error('❗ Error stack:', err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // For local development
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//     console.log(`📁 Serving static files from: ${distPath}`);
//   });
// }

// // Export for Vercel
// export default app;


/////////////////

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import imageRoutes from "../routes/imageroutes.js";
import userRoutes from "../routes/userroutes.js";
import contactRoutes from "../routes/contactRoutes.js";
import { dbConnect } from "../lib/dbconnect.js";

dotenv.config();

const app = express();

// Middleware
const corsOptions = { /* your cors setup */ };
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Database middleware — only ensure once per request
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// API Routes
app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

// Static + SPA handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));
app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❗ Error stack:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Local dev only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 Serving static files from: ${distPath}`);
  });
}

// Export for Vercel
export default app;
