import express from 'express';
import { createCategory } from '../controllers/categoryController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';
const router = express.Router();

router
  .route('/')
  .post(languageMiddleware, authenticate, authorizeAdmin, createCategory);

export default router;
