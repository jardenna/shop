import express from 'express';
import languageMiddleware from '../middleware/languageMiddleware.js';

import { createUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', languageMiddleware, createUser);

export default router;
