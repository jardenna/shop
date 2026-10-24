import express from 'express';
import {
  createGoals,
  getGoals,
  getNewestCustomers,
  updateGoals,
} from '../controllers/dashboardController.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

import validatePeriodMiddleware from '../middleware/dashboardPeriodMiddleware.js';

const router = express.Router();
router
  .route('/goals')
  .get(languageMiddleware, authenticate, authorizeEmployee, getGoals)
  .put(languageMiddleware, authenticate, authorizeEmployee, updateGoals)
  .post(languageMiddleware, authenticate, authorizeEmployee, createGoals);

router.get(
  '/new-custormers/:id',
  languageMiddleware,
  validatePeriodMiddleware,
  authenticate,
  authorizeEmployee,
  getNewestCustomers,
);

export default router;
