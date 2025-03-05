import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// router.post('/auth', languageMiddleware, loginUser);
// router.post('/logout', languageMiddleware, logoutCurrentUser);
router.get('/', languageMiddleware, authenticate, authorizeAdmin, getAllUsers);

export default router;
