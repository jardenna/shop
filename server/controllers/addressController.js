import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { findDuplicateAddress } from '../utils/addressUtils.js';
import { t } from '../utils/translator.js';
import { validateCreateAddress } from '../validators/validateAddress.js';

// @desc    Create users address
// @route   /api/users/profile/addresses
// @method  Post
// @access  Private
const createUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { address } = req.body;

  const error = validateCreateAddress(address);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const duplicateAddress = findDuplicateAddress(user.addresses, address);

  if (duplicateAddress) {
    return res.status(400).json({
      message: t('addressAlreadyExists', req.lang),
    });
  }

  if (user.addresses.length >= 4) {
    return res.status(400).json({
      success: false,
      message: t('onlyFourAddresses', req.lang),
    });
  }

  user.addresses.push(user.addresses.create(address));
  await user.save();

  res.status(201).json(user.addresses);
});

// @desc    Update users address
// @route   /api/users/profile/addresses/:addressId
// @method  Patch
// @access  Private
const updateUserAddresses = asyncHandler(async (req, res) => {
  res.send(req.body);
});

// @desc    Delete users address
// @route   /api/users/profile/addresses/:addressId
// @method  Delete
// @access  Private
const deleteUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { addressId } = req.params;

  const existing = user.addresses.id(addressId);
  if (!existing) {
    return res.status(404).json({ message: t('noAddressData', req.lang) });
  }
  existing.deleteOne();

  await user.save();
  res.send(user.addresses);
});

// @desc    Get users addresses
// @route  /api/users/profile/addresses
// @method  Get
// @access  Private
const getUserAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.send(user.addresses);
});

export {
  createUserAddress,
  deleteUserAddress,
  getUserAddresses,
  updateUserAddresses,
};
