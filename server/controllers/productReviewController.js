import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import { t } from '../utils/translator.js';

// @desc    Create Product Reviews
// @route   /api/products/:id/reviews
// @method  POST
// @access  Public for logged-in users
const createProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
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

  const review = {
    name: req.user.username,
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.reviews.length;

  await product.save();

  res
    .status(201)
    .json({ success: true, message: t('reviewCreated', req.lang) });
});

// @desc    Create Product Reviews
// @route   /api/products/:id/reviewed
// @method  GET
// @access  Public for logged-in users
const hasReviewed = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }

  const reviewed = product.reviews.some(
    (review) => review.user.toString() === req.user._id.toString(),
  );

  res.json({ reviewed });
});

// @desc    Get all Product Reviews
// @route   /api/products/reviews
// @method  GET
// @access  Private for Admin
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Product.aggregate([
    { $unwind: '$reviews' },
    {
      $project: {
        id: '$reviews._id',
        productId: '$_id',
        productName: 1,
        image: { $arrayElemAt: ['$images', 0] },
        userName: '$reviews.name',
        rating: '$reviews.rating',
        comment: '$reviews.comment',
        user: '$reviews.user',
        isRead: { $ifNull: ['$reviews.isRead', false] },
        createdAt: '$reviews.createdAt',
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  res.status(200).json(reviews);
});

export { createProductReviews, getAllReviews, hasReviewed };
