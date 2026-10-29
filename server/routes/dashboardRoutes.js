import express from 'express';
import {
  createGoals,
  getGoals,
  getNewestCustomers,
  getPeriodKpi,
  getTotalKpi,
  updateGoals,
} from '../controllers/dashboardController.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import validatePeriodMiddleware from '../middleware/dashboardPeriodMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();
router
  .route('/goals')
  .get(languageMiddleware, authenticate, authorizeEmployee, getGoals)
  .patch(languageMiddleware, authenticate, authorizeEmployee, updateGoals)
  .post(languageMiddleware, authenticate, authorizeEmployee, createGoals);

router.get(
  '/total-kpi',
  languageMiddleware,
  authenticate,
  authorizeEmployee,
  getTotalKpi,
);
router.get(
  '/period-kpi/:id',
  languageMiddleware,
  validatePeriodMiddleware,
  authenticate,
  authorizeEmployee,
  getPeriodKpi,
);

router.get(
  '/new-custormers/:id',
  languageMiddleware,
  validatePeriodMiddleware,
  authenticate,
  authorizeEmployee,
  getNewestCustomers,
);

export default router;
