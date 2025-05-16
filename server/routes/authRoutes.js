import express from 'express';
import {
  createUser,
  loginUser,
  logoutCurrentUser,
} from '../controllers/authController.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router.post('/register', languageMiddleware, createUser);
router.post('/login', languageMiddleware, loginUser);
router.post('/logout', languageMiddleware, logoutCurrentUser);

router.get(
  '/check-auth',
  languageMiddleware,
  authenticate,
  authorizeEmployee,

  (req, res) => {
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
