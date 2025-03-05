import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router.get('/', languageMiddleware, authenticate, authorizeAdmin, getAllUsers);

export default router;
