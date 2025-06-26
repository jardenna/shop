import express from 'express';
import {
  getFavorites,
  toggleFavorite,
} from '../controllers/favoritesController.js';

import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id', authenticate, toggleFavorite);
router.get('/', authenticate, getFavorites);

export default router;
