import express from 'express';
import { getNewestCustomers } from '../controllers/dashboardController.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router.get(
  '/new-custormers/:id',
  languageMiddleware,
  authenticate,
  authorizeEmployee,
  getNewestCustomers,
);

export default router;
