import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
// import languageMiddleware from '../middleware/languageMiddleware.js';
// import checkId from '../middleware/checkId.js'

import {
  createProduct,
  deleteProduct,
  getAllProject,
  updateProduct,
} from '../controllers/productController.js';

const router = express.Router();
router
  .route('/')
  .get(getAllProject)
  .post(authenticate, authorizeAdmin, createProduct);

router
  .route('/:id')
  .put(authenticate, authorizeAdmin, updateProduct)
  .delete(authenticate, authorizeAdmin, deleteProduct);

export default router;
