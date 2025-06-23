import mongoose from 'mongoose';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { toggleItemInArray } from '../utils/toggleItemInArray.js';

// @desc    Toggle favorite
// @route   /api/favorites/:id
// @method  Post
// @access  Public
const toggleFavorite = asyncHandler(async (req, res) => {
  const { ObjectId } = mongoose.Types;

  const productId = req.params.id;

  if (!ObjectId.isValid(productId)) {
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

  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.favorites = toggleItemInArray(user.favorites, productId);
  await user.save();

  res.status(200).json({ favorites: user.favorites });
});

export { toggleFavorite };
