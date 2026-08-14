import express from 'express';
import {
  cancelOrder,
  deliverOrder,
  getAdminOrderById,
  getAllOrders,
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
  .route('/:id/deliver')
  .patch(languageMiddleware, authenticate, authorizeEmployee, deliverOrder);

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
