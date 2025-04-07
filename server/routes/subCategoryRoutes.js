import express from 'express';
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  updateSubCategory,
} from '../controllers/subCategoryController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';
const router = express.Router();

router
  .route('/')
  .post(languageMiddleware, authenticate, authorizeAdmin, createSubCategory)
  .get(languageMiddleware, getAllSubCategories);

router
  .route('/:id')
  .put(authenticate, authorizeAdmin, updateSubCategory)
  .delete(authenticate, authorizeAdmin, deleteSubCategory);

export default router;
