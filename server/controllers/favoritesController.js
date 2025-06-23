import asyncHandler from '../middleware/asyncHandler.js';
import { toggleItemInArray } from '../utils/toggleItemInArray.js';

import User from '../models/userModel.js';
// @desc    Toggle favorite
// @route   /api/favorites/:id
// @method  Post
// @access  Public
const toggleFavorite = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const user = await User.findById(req.user);
  console.log(user);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.favorites = toggleItemInArray(user.favorites, productId);
  await user.save();

  res.status(200).json({ favorites: user.favorites });
});

export { toggleFavorite };
