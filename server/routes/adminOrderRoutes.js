import express from 'express';
import {
  deliverOrder,
  getAdminOrderById,
  getAllOrders,
} from '../controllers/adminOrderController.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import filterOrdersMiddleware from '../middleware/filterOrdersMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(filterOrdersMiddleware, authenticate, authorizeEmployee, getAllOrders);

router
  .route('/:id')
  .get(languageMiddleware, authenticate, authorizeEmployee, getAdminOrderById);

router
  .route('/:id/deliver')
  .put(languageMiddleware, authenticate, authorizeEmployee, deliverOrder);

export default router;
