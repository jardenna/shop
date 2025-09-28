import bcrypt from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import formatMongoData from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';
import { validateCreateAddress } from '../utils/validateAddress.js';
import { validateEmail, validatePassword } from '../utils/validateAuth.js';

// @desc    Get all users
// @route   /api/users
// @method  Get
// @access  Private for admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .select('-password') // Exclude password field
    .lean();

  if (!users?.length) {
    return res.status(400).json({ message: t('noData', req.lang) });
  }

  const formattedUsers = formatMongoData(users);

  res.status(200).json(formattedUsers);
});

// @desc    Get User profile
// @route   /api/users/profile
// @method  Get
// @access  Private for logged in user
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json(user);
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
  const {
    password,
    email,
    username,
    phoneNo,
    dateOfBirth,
    preferredFashion,
    addresses,
  } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    user.phoneNo = phoneNo || user.phoneNo;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.preferredFashion = preferredFashion || user.preferredFashion;

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

    // Addresses
    if (addresses) {
      // Add new addresses
      if (addresses.add && addresses.add.length) {
        const error = validateCreateAddress(addresses.add);

        if (error) {
          return res.status(400).json({
            message: error,
          });
        }

        addresses.add.forEach((address) => {
          user.addresses.push(user.addresses.create(address));
        });
      }

      // Update existing addresses
      if (addresses.update && addresses.update.length) {
        const existingAddress = addresses.update.find((address) =>
          user.addresses.id(address._id),
        );

        if (!existingAddress) {
          return res.status(404).json({
            message: t('noUser', req.lang),
          });
        }

        addresses.update.forEach((address) => {
          const existing = user.addresses.id(address._id);
          if (existing) {
            existing.street = address.street || existing.street;
            existing.zipCode = address.zipCode || existing.zipCode;
            existing.city = address.city || existing.city;
            existing.country = address.country || existing.country;
          }
        });
      }

      // Remove addresses
      if (addresses.remove && addresses.remove.length) {
        addresses.remove.forEach((addressId) => {
          const existing = user.addresses.id(addressId);
          if (existing) {
            existing.deleteOne();
          }
        });
      }
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
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
        message: t('adminCannotBeDeleted', req.lang),
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
    res.status(200).json(user);
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

    res.status(200).json(updatedUser);
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
