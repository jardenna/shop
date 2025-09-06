import express from 'express';
import {
  checkScheduled,
  createProduct,
  deleteProduct,
  duplicateProduct,
  getNewProducts,
  getProductById,
  getProducts,
  getShopProductById,
  getSortedProducts,
  getTopProducts,
  updateProduct,
} from '../controllers/productController.js';
import {
  createProductReviews,
  hasReviewed,
} from '../controllers/productReviewController.js';
import {
  authenticate,
  authorizeAdmin,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import checkId from '../middleware/checkId.js';
import filterProductsMiddleware from '../middleware/filterProductsMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();
router
  .route('/')
  .get(languageMiddleware, filterProductsMiddleware, getProducts)
  .post(languageMiddleware, authenticate, authorizeEmployee, createProduct);

router.get('/scheduled', checkScheduled);
router.get('/allProducts', filterProductsMiddleware, getSortedProducts);
router.get('/shop/:id', languageMiddleware, getShopProductById);
router.post(
  '/:id/reviews',
  authenticate,
  checkId,
  languageMiddleware,
  createProductReviews,
);
router.get('/:id/reviewed', authenticate, checkId, hasReviewed);
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
