import mongoose from 'mongoose';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import formatMongoData from '../utils/formatMongoData.js';
import { toggleItemInArray } from '../utils/toggleItemInArray.js';

// @desc    Get favorite
// @route   /api/favorites
// @method  Get
// @access  Public
const getFavorites = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const userWithFavorites = await User.findById(userId)
    .populate({
      path: 'favorites',
      select: 'productName price discount sizes colors images',
    })
    .lean();

  const formattedFavorites = formatMongoData(userWithFavorites.favorites);

  res.status(200).json({ favorites: formattedFavorites });
});

// @desc    Toggle favorite
// @route   /api/favorites/:id
// @method  Post
// @access  Public
const toggleFavorite = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid product ID' });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const alreadyInFavorites = user.favorites.includes(productId);
  user.favorites = toggleItemInArray(user.favorites, productId);
  await user.save();

  res.status(200).json({
    isFavorite: !alreadyInFavorites,
  });
});

export { getFavorites, toggleFavorite };
