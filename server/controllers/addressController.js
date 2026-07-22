import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import {
  findDuplicateAddress,
  formatAddresses,
} from '../utils/addressUtils.js';
import { t } from '../utils/translator.js';
import { validateCreateAddress } from '../validators/validateAddress.js';

// @desc    Create users address
// @route   /api/users/profile/addresses
// @method  Post
// @access  Private
const createUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { address } = req.body;

  const validationError = validateCreateAddress(address);
  if (validationError) {
    return res.status(400).json({ message: validationError });
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

  res.status(201).json(formatAddresses(user.addresses));
});

// @desc    Update users address
// @route   /api/users/profile/addresses/:addressId
// @method  Patch
// @access  Private
const updateUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { address } = req.body;
  const { addressId } = req.params;

  const validationError = validateCreateAddress(address);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const existingAddress = user.addresses.id(addressId);
  if (!existingAddress) {
    return res.status(404).json({ message: t('noAddressData', req.lang) });
  }

  const duplicateAddress = findDuplicateAddress(user.addresses, address);

  if (duplicateAddress) {
    return res.status(400).json({
      message: t('addressAlreadyExists', req.lang),
    });
  }

  existingAddress.name = address.name ?? existingAddress.name;
  existingAddress.street = address.street ?? existingAddress.street;
  existingAddress.zipCode = address.zipCode ?? existingAddress.zipCode;
  existingAddress.city = address.city ?? existingAddress.city;
  existingAddress.country = address.country ?? existingAddress.country;
  existingAddress.standardAddress =
    address.standardAddress ?? existingAddress.standardAddress;

  await user.save();

  res.status(200).json(formatAddresses(user.addresses));
});

// @desc    Delete users address
// @route   /api/users/profile/addresses/:addressId
// @method  Delete
// @access  Private
const deleteUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { addressId } = req.params;

  const existingAddress = user.addresses.id(addressId);
  if (!existingAddress) {
    return res.status(404).json({ message: t('noAddressData', req.lang) });
  }
  existingAddress.deleteOne();

  await user.save();
  res.status(200).json(formatAddresses(user.addresses));
});

// @desc    Get users addresses
// @route  /api/users/profile/addresses
// @method  Get
// @access  Private
const getUserAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json(formatAddresses(user.addresses));
});

export {
  createUserAddress,
  deleteUserAddress,
  getUserAddresses,
  updateUserAddress,
};
