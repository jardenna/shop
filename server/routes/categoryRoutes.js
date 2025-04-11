import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  getScheduledCategories,
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

router
  .route('/')
  .post(languageMiddleware, authenticate, authorizeAdmin, createCategory)
  .get(languageMiddleware, getAllCategories);

// Always define specific routes before dynamic ones
router.get('/scheduled', getScheduledCategories);

router
  .route('/:id')
  .get(getCategoryById)
  .put(languageMiddleware, authenticate, authorizeEmployee, updateCategory);

export default router;
