import express from 'express';
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
} from '../controllers/subCategoryController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';
const router = express.Router();

router
  .route('/')
  .post(languageMiddleware, authenticate, authorizeAdmin, createSubCategory)
  .get(languageMiddleware, getSubCategories);

router.delete('/:id', deleteSubCategory);

export default router;
