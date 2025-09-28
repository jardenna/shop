import bcrypt from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import createToken from '../utils/createToken.js';
import { t } from '../utils/translator.js';
import { validateEmail, validatePassword } from '../utils/validateAuth.js';

// @desc    Create a new user (used for both self-registration and admin creation)
// @route   /api/auth/register
// @method   POST
// @access  Public (register) / Admin (create-user)

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  const currentUser = req.user;
  const isAdmin = currentUser?.isAdmin === true;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: t('fillAll', req.lang),
    });
  }

  // Non-admins are not allowed to set role
  if (!isAdmin && role) {
    return res.status(403).json({
      success: false,
      message: t('onlyAdminsAssignRole', req.lang),
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
    role: isAdmin ? role : 'User', // enforce "User" role if not admin
  });

  await newUser.save();

  if (!isAdmin) {
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

export { createUser, loginUser, logoutCurrentUser };
