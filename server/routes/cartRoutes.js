import express from 'express';
import {
  createCart,
  getCart,
  mergeCart,
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router.route('/merge').post(languageMiddleware, authenticate, mergeCart);
router
  .route('/')
  .post(languageMiddleware, authenticate, createCart)
  .get(languageMiddleware, authenticate, getCart);

export default router;
