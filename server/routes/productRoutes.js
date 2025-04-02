import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';
// import checkId from '../middleware/checkId.js'

import {
  createProduct,
  createProductReviews,
  deleteProduct,
  getProductById,
  getProducts,
  getSortedProducts,
  updateProduct,
} from '../controllers/productController.js';

const router = express.Router();
router
  .route('/')
  .get(getProducts)
  .post(authenticate, authorizeAdmin, createProduct);

router.get('/allProducts', getSortedProducts);
router
  .route('/:id/reviews')
  .post(authenticate, authorizeAdmin, createProductReviews);
router
  .route('/:id')
  .get(languageMiddleware, getProductById)
  .put(authenticate, updateProduct)
  .delete(authenticate, authorizeAdmin, deleteProduct);

export default router;
