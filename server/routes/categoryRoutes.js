import express from 'express';
import {
  createCategory,
  getAllCategories,
  updateCategory,
} from '../controllers/categoryController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';
const router = express.Router();

router.post(
  '/',
  languageMiddleware,
  authenticate,
  authorizeAdmin,
  createCategory,
);

router
  .route('/')
  .post(languageMiddleware, authenticate, authorizeAdmin, createCategory)
  .get(languageMiddleware, getAllCategories);

router
  .route('/:id')
  .put(languageMiddleware, authenticate, authorizeAdmin, updateCategory);

export default router;
