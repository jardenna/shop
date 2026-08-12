import bcrypt from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { createUserService } from '../services/userService.js';
import createToken from '../utils/createToken.js';
import { t } from '../utils/translator.js';

// @desc    Register a new user
// @route   /api/auth/register
// @method  POST
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: t('fillAll', req.lang),
    });
  }

  const user = await createUserService({
    username,
    email,
    password,
    role: 'User',
    language: req.lang,
  });

  createToken(res, user._id);

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    },
  });
});

// @desc    Create a new user
// @route   /api/auth/admin/create-user
// @method  POST
// @access  Private for admin and employees
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: t('fillAll', req.lang),
    });
  }

  const user = await createUserService({
    username,
    email,
    password,
    role,
    language: req.lang,
  });

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    },
  });
});

// @desc    Login user
// @route   /api/auth/login
// @method   POST
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: t('noUser', req.lang),
      });
    }
  }

  if (!email) {
    return res.status(401).json({
      success: false,
      message: 'Please enter an email',
    });
  }

  if (!password) {
    return res.status(401).json({
      success: false,
      message: 'Please enter a password',
    });
  }

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: t('noUser', req.lang),
    });
  }

  createToken(res, existingUser._id);

  const { _id, username, isAdmin, role } = existingUser;
  const user = {
    id: _id,
    username,
    email,
    ...(isAdmin && { isAdmin, role }), // only add if isAdmin is true
  };

  res.status(201).json({
    success: true,
    user,
  });
});

// @desc    Logout user / clear cookie
// @route   /api/auth/logout
// @method   POST
// @access  Public
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httyOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: t('logOutSucceeded', req.lang),
  });
});

export { createUser, loginUser, logoutCurrentUser, registerUser };
