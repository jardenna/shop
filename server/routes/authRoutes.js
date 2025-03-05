import express from 'express';
import languageMiddleware from '../middleware/languageMiddleware.js';

import {
  createUser,
  loginUser,
  logoutCurrentUser,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', languageMiddleware, createUser);
router.post('/login', languageMiddleware, loginUser);
router.post('/logout', languageMiddleware, logoutCurrentUser);

export default router;
