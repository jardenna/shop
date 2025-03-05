import express from 'express';
import {
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router.get('/', languageMiddleware, authenticate, authorizeAdmin, getAllUsers);

router
  .route('/profile')
  .get(languageMiddleware, authenticate, getCurrentUserProfile)
  .put(languageMiddleware, authenticate, updateCurrentUserProfile);

export default router;
