import bcrypt from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import createToken from '../utils/createToken.js';
import { validateEmail } from '../utils/emailValidator.js';
import { validatePassword } from '../utils/passwordValidator.js';
import { t } from '../utils/translator.js';

// @desc    Register a new user
// @route   /api/auth/register
// @method   POST
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: t('fillAll', req.lang),
    });
  }

  if (!req.user?.isAdmin && role) {
    return res.status(403).json({
      success: false,
      message: t('actionOnlyAllowedForAdmin', req.lang),
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: t('userAlreadyExist', req.lang),
    });
  }

  const emailResult = validateEmail(email, req.lang);
  if (!emailResult.isValid) {
    return res.status(emailResult.status).json(emailResult.payload);
  }

  const passwordErrorKey = validatePassword(password);
  if (passwordErrorKey) {
    return res.status(400).json({
      message: t(passwordErrorKey, req.lang),
    });
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
    role,
  });

  await newUser.save();

  if (!req.user?.isAdmin) {
    createToken(res, newUser._id);
  }

  res.status(201).json({
    success: true,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      role: newUser.role,
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
        message: t('invalidPassword', req.lang),
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
  res.status(201).json({
    success: true,
    user: {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    },
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

export { createUser, loginUser, logoutCurrentUser };
