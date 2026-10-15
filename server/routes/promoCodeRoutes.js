import express from 'express';
import { createPromoCode } from '../controllers/PromoCodeController.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(languageMiddleware, authenticate, authorizeEmployee, createPromoCode);

export default router;
