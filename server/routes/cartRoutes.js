import express from 'express';
import {
  createCart,
  getCart,
  updateCart,
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(languageMiddleware, authenticate, createCart)
  .get(languageMiddleware, authenticate, getCart);

router.route('/:id').patch(languageMiddleware, authenticate, updateCart);

export default router;
