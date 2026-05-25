import express from 'express';
import {
  createOrder,
  deliverOrder,
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
router
  .route('/:id')
  .get(languageMiddleware, authenticate, authorizeEmployee, getOrderById);
router.route('/:id/pay').put(languageMiddleware, authenticate, payOrder);
router
  .route('/:id/deliver')
  .put(languageMiddleware, authenticate, authorizeEmployee, deliverOrder);

export default router;
