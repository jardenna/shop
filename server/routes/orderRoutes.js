import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
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

export default router;
