import express from 'express';
import {
  applyPromoCode,
  createCart,
  deleteCart,
  deleteCartItem,
  getCart,
  getCartQty,
  getGuestCartProducts,
  updateCart,
  updateCartQuantity,
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();
router
  .route('/promo-code')
  .patch(languageMiddleware, authenticate, applyPromoCode);

router
  .route('/')
  .post(languageMiddleware, authenticate, createCart)
  .delete(languageMiddleware, authenticate, deleteCart)
  .get(languageMiddleware, authenticate, getCart);

router.route('/guest').post(languageMiddleware, getGuestCartProducts);
router.route('/qty').get(languageMiddleware, authenticate, getCartQty);
router.route('/:id').patch(languageMiddleware, authenticate, updateCart);

router
  .route('/:id/quantity')
  .patch(languageMiddleware, authenticate, updateCartQuantity);
router.route('/:id').delete(languageMiddleware, authenticate, deleteCartItem);

export default router;
