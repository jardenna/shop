import express from 'express';
import {
  createPromoCode,
  getCurrentPromoCode,
  getPromoCode,
  getPromoCodeById,
  updatePromoCode,
} from '../controllers/PromoCodeController.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(authenticate, authorizeEmployee, getPromoCode)
  .post(languageMiddleware, authenticate, authorizeEmployee, createPromoCode);

router
  .route('/current')
  .get(languageMiddleware, authenticate, getCurrentPromoCode);

router
  .route('/:id')
  .get(languageMiddleware, authenticate, authorizeEmployee, getPromoCodeById)
  .patch(languageMiddleware, authenticate, authorizeEmployee, updatePromoCode);

export default router;
