import express from 'express';
import {
  getSaleProducts,
  getSaleSubMenu,
  getShopProductById,
  getShopProducts,
} from '../controllers/productController.js';

import {
  checkScheduled,
  createProduct,
  deleteProduct,
  duplicateProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/adminProductController.js';
import {
  createProductReviews,
  hasReviewed,
} from '../controllers/productReviewController.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import checkId from '../middleware/checkId.js';
import filterProductsMiddleware from '../middleware/filterProductsMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();
router
  .route('/')
  .get(languageMiddleware, filterProductsMiddleware, getShopProducts)
  .post(languageMiddleware, authenticate, authorizeEmployee, createProduct);

router.get('/scheduled', checkScheduled);
router.get('/sale', languageMiddleware, getSaleProducts);
router.get('/sale-menu/:id', languageMiddleware, getSaleSubMenu);
router.get('/allProducts', filterProductsMiddleware, getAllProducts);
router.get('/shop/:id', languageMiddleware, getShopProductById);
router.post(
  '/:id/reviews',
  authenticate,
  checkId,
  languageMiddleware,
  createProductReviews,
);
router.get('/:id/reviewed', authenticate, checkId, hasReviewed);
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
  .delete(languageMiddleware, authenticate, deleteProduct);

export default router;
