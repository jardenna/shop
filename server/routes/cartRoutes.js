import express from 'express';
import { createCart, mergeCart } from '../controllers/cartController.js';

import { authenticate } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router.route('/merge').get(languageMiddleware, authenticate, mergeCart);
router.route('/').post(languageMiddleware, authenticate, createCart);

export default router;
