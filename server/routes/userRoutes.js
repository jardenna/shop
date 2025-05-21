import express from 'express';
import {
  deleteUserById,
  getAllUsers,
  getCurrentUserProfile,
  getUserById,
  updateCurrentUserProfile,
  updateUserById,
} from '../controllers/userController.js';
import {
  authenticate,
  authorizeAdmin,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router.get(
  '/',
  languageMiddleware,
  authenticate,
  authorizeEmployee,
  getAllUsers,
);

router
  .route('/profile')
  .get(languageMiddleware, authenticate, getCurrentUserProfile)
  .put(languageMiddleware, authenticate, updateCurrentUserProfile);

// EMPLOYEE ROUTES
router
  .route('/:id')
  .delete(languageMiddleware, authenticate, authorizeAdmin, deleteUserById)
  .get(languageMiddleware, authenticate, authorizeAdmin, getUserById)
  .put(languageMiddleware, authenticate, authorizeAdmin, updateUserById);

export default router;
