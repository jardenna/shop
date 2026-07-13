import express from 'express';
import {
  createCart,
  deleteCart,
  getCart,
  getGuestCartProducts,
  updateCart,
  updateCartQuantity,
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(languageMiddleware, authenticate, createCart)
  .get(languageMiddleware, authenticate, getCart);

router.route('/guest').post(languageMiddleware, getGuestCartProducts);
router.route('/:id').patch(languageMiddleware, authenticate, updateCart);
router
  .route('/:id/quantity')
  .patch(languageMiddleware, authenticate, updateCartQuantity);
router.route('/:id').delete(languageMiddleware, authenticate, deleteCart);

export default router;
