import express from 'express';
import {
  checkScheduled,
  createProduct,
  deleteProduct,
  duplicateProduct,
  getNewProducts,
  getProductById,
  getProducts,
  getSortedProducts,
  getTopProducts,
  updateProduct,
} from '../controllers/productController.js';
import createProductReviews from '../controllers/productReviewController.js';
import {
  authenticate,
  authorizeAdmin,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import checkId from '../middleware/checkId.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();
router
  .route('/')
  .get(getProducts)
  .post(authenticate, authorizeEmployee, createProduct);

router.get('/scheduled', checkScheduled);
router.get('/allProducts', getSortedProducts);
router.post('/:id/reviews', authenticate, checkId, createProductReviews);
router.get('/top', getTopProducts);
router.get('/new', getNewProducts);
router.post(
  '/:id/duplicate',
  languageMiddleware,
  authenticate,
  authorizeEmployee,
  duplicateProduct,
);

router
  .route('/:id')
  .get(languageMiddleware, getProductById)
  .put(languageMiddleware, authenticate, authorizeEmployee, updateProduct)
  .delete(languageMiddleware, authenticate, authorizeAdmin, deleteProduct);

export default router;
