import express from 'express';
import { createOrder, getAllOrders } from '../controllers/orderController.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(authenticate, createOrder)
  .get(authenticate, authorizeEmployee, getAllOrders);

export default router;
