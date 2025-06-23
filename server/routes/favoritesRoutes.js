import express from 'express';
import { toggleFavorite } from '../controllers/favoritesController.js';

import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id', authenticate, toggleFavorite);

export default router;
