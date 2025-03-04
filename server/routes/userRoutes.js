import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

import {
  createUser,
  getAllUsers,
  loginUser,
  logoutCurrentUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', languageMiddleware, createUser);
router.post('/auth', languageMiddleware, loginUser);
router.post('/logout', languageMiddleware, logoutCurrentUser);
router.get('/', languageMiddleware, authenticate, authorizeAdmin, getAllUsers);

export default router;
