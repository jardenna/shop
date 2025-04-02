import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';
// import checkId from '../middleware/checkId.js'

import {
  createProduct,
  createProductReviews,
  deleteProduct,
  getNewProducts,
  getProductById,
  getProducts,
  getSortedProducts,
  getTopProducts,
  updateProduct,
} from '../controllers/productController.js';

const router = express.Router();
router
  .route('/')
  .get(getProducts)
  .post(authenticate, authorizeAdmin, createProduct);

router.get('/allProducts', getSortedProducts);
router.post('/:id/reviews', authenticate, createProductReviews);
router.get('/top', getTopProducts);
router.get('/new', getNewProducts);

router
  .route('/:id')
  .get(languageMiddleware, getProductById)
  .put(authenticate, authorizeAdmin, updateProduct)
  .delete(authenticate, authorizeAdmin, deleteProduct);

export default router;
