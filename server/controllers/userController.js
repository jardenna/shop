import bcrypt from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { validatePassword } from '../utils/passwordValidator.js';
import { emailRegex } from '../utils/regex.js';
import { t } from '../utils/translator.js';

// @desc    Get all users
// @route   Get /api/users
// @access  Private for admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Get User profile
// @route   Get /api/users/profile
// @access  Private for logged in user
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: t('noUser', req.lang),
    });
  }
});

// @desc    Update User profile
// @route   Put /api/users/profile
// @access  Private for logged in user
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const hashPassword = await bcrypt.hash(password, saltRounds);

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

    if (password) {
      user.password = hashPassword;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: t('noUser', req.lang),
    });
  }
});

export { getAllUsers, getCurrentUserProfile, updateCurrentUserProfile };
