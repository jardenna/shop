import express from 'express';
import {
  cancelOrder,
  getAdminOrderById,
  getAllOrders,
  shipOrder,
  updateOrderStatus,
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
  .route('/:id/send-order')
  .patch(languageMiddleware, authenticate, authorizeEmployee, shipOrder);

router
  .route('/:id/status')
  .patch(
    languageMiddleware,
    authenticate,
    authorizeEmployee,
    updateOrderStatus,
  );

router
  .route('/:id/cancel')
  .patch(languageMiddleware, authenticate, authorizeEmployee, cancelOrder);

export default router;
