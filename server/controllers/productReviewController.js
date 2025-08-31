import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import { t } from '../utils/translator.js';

// @desc    Create Product Reviews
// @route   /api/products/:id/reviews
// @method  Post
// @access  Public for logged-in users
const createProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  // Find product by id
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  // Prevent multiple reviews from same user
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString(),
  );

  if (alreadyReviewed) {
    return res.status(400).json({
      success: false,
      message: t('multipleReviewsNotPermitted', req.lang),
    });
  }

  // Create review object
  const review = {
    name: req.user.username,
    user: req.user._id, // keep this as user reference
    rating: Number(rating),
    comment,
  };

  // Push review and recalculate
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.reviews.length;

  // Save product with updated values
  await product.save();

  res.status(201).json({ message: 'Review added' });
});

export default createProductReviews;
