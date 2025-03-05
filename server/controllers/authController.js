import bcrypt from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import createToken from '../utils/createToken.js';
import { validatePassword } from '../utils/passwordValidator.js';
import { emailRegex } from '../utils/regex.js';
import { t } from '../utils/translator.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  const userExists = await User.findOne({ email });

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: t('fillAll', req.lang),
    });
  }

  // Validate email
  if (!emailRegex.test(email)) {
    return res.status(422).json({
      success: false,
      message: t('invalidEmail', req.lang),
    });
  }

  // Validate password
  if (password) {
    const passwordErrorKey = validatePassword(password);

    if (passwordErrorKey) {
      return res.status(400).json({
        message: t(passwordErrorKey, req.lang),
      });
    }
  }

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: t('userAlreadyExist', req.lang),
    });
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error(t('invalidUserData', req.lang));
  }
});

// @desc    Login user
// @route   POST /api/auth/login
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
      message: 'Email must be provided',
    });
  }

  if (!password) {
    return res.status(401).json({
      message: 'Password must be provided',
    });
  }

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: t('noUser', req.lang),
    });
  }

  try {
    createToken(res, existingUser._id);
    res.status(201).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error.message} - ${t('loginFailed', req.lang)}`,
    });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httyOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: t('loggedOut', req.lang),
  });
});

export { createUser, loginUser, logoutCurrentUser };
