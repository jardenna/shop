import express from 'express';
import {
  createOrder,
  getOrderById,
  getUserOrders,
  payOrder,
} from '../controllers/orderController.js';

import { authenticate } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router.route('/').post(languageMiddleware, authenticate, createOrder);

router.route('/me').get(languageMiddleware, authenticate, getUserOrders);

router.route('/:id').get(languageMiddleware, authenticate, getOrderById);
router.route('/:id/pay').put(languageMiddleware, authenticate, payOrder);

export default router;
