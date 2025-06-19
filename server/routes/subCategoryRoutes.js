import express from 'express';
import {
  checkScheduled,
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getMenuByParentCategory,
  getSubCategoriesWithParent,
  getSubCategoryById,
  updateSubCategory,
} from '../controllers/subCategoryController.js';
import {
  authenticate,
  authorizeAdmin,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';
const router = express.Router();

router.get(
  '/with-parent',
  authenticate,
  authorizeEmployee,
  getSubCategoriesWithParent,
);

router.get('/scheduled', checkScheduled);
router.get('/menu', getMenuByParentCategory);
router
  .route('/')
  .post(languageMiddleware, authenticate, authorizeEmployee, createSubCategory)
  .get(languageMiddleware, getAllSubCategories);

router
  .route('/:id')
  .post(languageMiddleware, authenticate, authorizeEmployee, createSubCategory)
  .put(languageMiddleware, authenticate, authorizeEmployee, updateSubCategory)
  .get(languageMiddleware, authenticate, authorizeEmployee, getSubCategoryById)
  .delete(languageMiddleware, authenticate, authorizeAdmin, deleteSubCategory);

export default router;
