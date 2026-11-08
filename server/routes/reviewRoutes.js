import express from 'express';

import {
  getAllReviews,
  getReviewStats,
  getUnreadReviewCount,
  markAllReviewsAsRead,
  markReviewAsRead,
} from '../controllers/productReviewController.js';

import filterReviewsMiddleware from '../middleware/filterReviewsMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(
  '/',
  languageMiddleware,
  filterReviewsMiddleware,
  authenticate,
  authorizeEmployee,
  getAllReviews,
);

router.get('/stats', authenticate, authorizeEmployee, getReviewStats);

router.get('/unread', authenticate, authorizeEmployee, getUnreadReviewCount);
router.patch(
  '/read-all',
  languageMiddleware,
  authenticate,
  authorizeEmployee,
  markAllReviewsAsRead,
);

router.patch(
  '/:reviewId/read',
  languageMiddleware,
  authenticate,
  authorizeEmployee,
  markReviewAsRead,
);

export default router;
