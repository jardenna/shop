import express from 'express';
import {
  checkScheduled,
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/categoryController.js';
import {
  authenticate,
  authorizeAdmin,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';
const router = express.Router();

router.post(
  '/',
  languageMiddleware,
  authenticate,
  authorizeAdmin,
  createCategory,
);

// Always define specific routes before dynamic ones
router.get('/scheduled', checkScheduled);

router
  .route('/')
  .post(languageMiddleware, authenticate, authorizeAdmin, createCategory)
  .get(languageMiddleware, getAllCategories);

router
  .route('/:id')
  .get(languageMiddleware, authenticate, authorizeEmployee, getCategoryById)
  .put(languageMiddleware, authenticate, authorizeEmployee, updateCategory)
  .delete(languageMiddleware, authenticate, authorizeAdmin, deleteCategory);

export default router;
