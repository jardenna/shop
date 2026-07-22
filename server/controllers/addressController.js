import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import {
  findDuplicateAddress,
  getAddressLabel,
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

  const responseUser = updatedUser.toObject();

  responseUser.addresses = responseUser.addresses.map((address) => ({
    ...address,
    label: getAddressLabel(address.standardAddress),
  }));

  res.status(201).json(responseUser.addresses);
});

// @desc    Update users address
// @route   /api/users/profile/addresses/:addressId
// @method  Patch
// @access  Private
const updateUserAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { address } = req.body;
  const { addressId } = req.params;

  const error = validateCreateAddress(address);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const existing = user.addresses.id(addressId);
  if (!existing) {
    return res.status(404).json({ message: t('noAddressData', req.lang) });
  }

  const duplicateAddress = findDuplicateAddress(user.addresses, address);

  if (duplicateAddress) {
    return res.status(400).json({
      message: t('addressAlreadyExists', req.lang),
    });
  }

  existing.name = address.name ?? existing.name;
  existing.street = address.street ?? existing.street;
  existing.zipCode = address.zipCode ?? existing.zipCode;
  existing.city = address.city ?? existing.city;
  existing.country = address.country ?? existing.country;
  existing.standardAddress =
    address.standardAddress ?? existing.standardAddress;

  const updatedUser = await user.save();

  const responseUser = updatedUser.toObject();

  responseUser.addresses = responseUser.addresses.map((address) => ({
    ...address,
    label: getAddressLabel(address.standardAddress),
  }));
  res.status(200).json(responseUser);
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

  const updatedUser = await user.save();

  const responseUser = updatedUser.toObject();

  responseUser.addresses = responseUser.addresses.map((address) => ({
    ...address,
    label: getAddressLabel(address.standardAddress),
  }));

  res.status(200).json(responseUser);
});

export {
  createUserAddress,
  deleteUserAddress,
  getUserAddresses,
  updateUserAddresses,
};
