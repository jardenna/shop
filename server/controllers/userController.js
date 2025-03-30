import bcrypt from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { validateEmail } from '../utils/emailValidator.js';
import formatMongoData from '../utils/formatMongoData.js';
import { validatePassword } from '../utils/passwordValidator.js';
import { t } from '../utils/translator.js';

// @desc    Get all users
// @route   /api/users
// @method  Get
// @access  Private for admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .select('-password') // Exclude password field
    .lean();

  const formattedUsers = formatMongoData(users);

  res.json(formattedUsers);
});

// @desc    Get User profile
// @route   /api/users/profile
// @method  Get
// @access  Private for logged in user
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: t('noUser', req.lang),
    });
  }
});

// @desc    Update User profile
// @route   /api/users/profile
// @method  Put
// @access  Private for logged in user
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const { password, email, username } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;

    if (email) {
      // Validate email
      const emailResult = validateEmail(email, req.lang);
      if (!emailResult.isValid) {
        return res.status(emailResult.status).json(emailResult.payload);
      }
    }
    if (password) {
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      const passwordErrorKey = validatePassword(password);

      if (password === '') {
        return res.status(401).json({
          success: false,
          message: t('noPassword', req.lang),
        });
      }

      if (passwordErrorKey) {
        return res.status(400).json({
          message: t(passwordErrorKey, req.lang),
        });
      }
      user.password = hashedPassword;
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

// @desc    Delete user
// @route   /api/users/:id
// @method  Delete
// @params  id
// @access  Private for Admin
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      return res.status(400).json({
        success: false,
        message: t('cannotDeleteAdmin', req.lang),
      });
    }

    await User.deleteOne({ _id: user._id });

    res.status(200).json({
      success: true,
      message: t('userDeleted', req.lang),
    });
  } else {
    res.status(404).json({
      success: false,
      message: t('noUser', req.lang),
    });
  }
});

// @desc    Get user by Id
// @route   /api/users/:id
// @method  Get
// @params  id
// @access  Private for Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      success: false,
      message: t('noUser', req.lang),
    });
  }
});

// @desc    Update user by Id
// @route   /api/users/:id
// @method   Put
// @params  id
// @access  Private
const updateUserById = asyncHandler(async (req, res) => {
  const { username, email, role } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    if (email) {
      // Validate email
      const emailResult = validateEmail(email, req.lang);
      if (!emailResult.isValid) {
        return res.status(emailResult.status).json(emailResult.payload);
      }
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404).json({
      success: false,
      message: t('noUser', req.lang),
    });
  }
});

export {
  deleteUserById,
  getAllUsers,
  getCurrentUserProfile,
  getUserById,
  updateCurrentUserProfile,
  updateUserById,
};
