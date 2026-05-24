import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  payOrder,
} from '../controllers/orderController.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(languageMiddleware, authenticate, createOrder)
  .get(authenticate, authorizeEmployee, getAllOrders);

router.route('/me').get(languageMiddleware, authenticate, getUserOrders);
router.route('/:id').get(languageMiddleware, authenticate, getOrderById);
router.route('/:id/pay').put(languageMiddleware, authenticate, payOrder);

export default router;
