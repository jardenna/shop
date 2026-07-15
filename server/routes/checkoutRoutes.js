import express from 'express';
import { getCheckout } from '../controllers/checkoutController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router.route('/').get(languageMiddleware, authenticate, getCheckout);

export default router;
