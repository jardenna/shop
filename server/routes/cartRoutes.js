import express from 'express';
import { createCart } from '../controllers/cartController.js';

import { authenticate } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router.route('/').post(languageMiddleware, authenticate, createCart);

export default router;
