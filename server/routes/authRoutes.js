import express from 'express';
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  registerUser,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';
import { optionalAuthenticate } from '../middleware/optionalAuthenticate.js';

const router = express.Router();

router.post('/register', languageMiddleware, registerUser);
router.post('/login', languageMiddleware, loginUser);
router.post('/logout', languageMiddleware, logoutCurrentUser);

router.post('/admin/create-user', languageMiddleware, authenticate, createUser);

router.get(
  '/check-auth',
  languageMiddleware,
  optionalAuthenticate,
  (req, res) => {
    if (!req.user) {
      return res.status(200).json({
        success: true,
        message: 'Anonymous user',
        user: null,
      });
    }

    const user = req.user;

    res.status(200).json({
      success: true,
      message: 'Authenticated user',
      user: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user._id,
        role: user.role,
      },
    });
  },
);

export default router;
