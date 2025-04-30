import express from 'express';
import {
  checkScheduled,
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
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

// Static route for getting subcategories with parent
// @route   GET /api/subcategories/with-parent
// @desc    Get subcategories with parent category
// @access  Public
router.get('/with-parent', getSubCategoriesWithParent);

router.get('/scheduled', checkScheduled);
router
  .route('/')
  .post(languageMiddleware, authenticate, authorizeEmployee, createSubCategory)
  .get(languageMiddleware, getAllSubCategories);

router
  .route('/:id')
  .put(authenticate, authorizeEmployee, updateSubCategory)
  .get(getSubCategoryById)
  .delete(languageMiddleware, authenticate, authorizeAdmin, deleteSubCategory);

export default router;
