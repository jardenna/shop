import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import favoritesRoutes from './routes/favoritesRoutes.js';
import productRoutes from './routes/productRoutes.js';
import subCategoryRoutes from './routes/subCategoryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dbConnect from './utils/dbConnect.js';
dotenv.config();

const app = express();
const __dirname = path.resolve();

dbConnect();

const PORT = process.env.PORT || 5000;

// Configure CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cache-Control',
    'Expires',
    'x-language',
  ],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cookieParser());
app.use(cors(corsOptions)); // Use the CORS middleware with options
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // Ensure this is before the routes

app.use(
  express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
      // Kun sæt cache headers på uploads
      if (filePath.includes('/images/uploads')) {
        res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
      }
    },
  }),
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/favorites', favoritesRoutes);

// Global error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
