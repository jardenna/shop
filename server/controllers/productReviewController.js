import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import { sortColumns } from '../utils/sortColumns.js';
import { t } from '../utils/translator.js';

// @desc    Create product reviews
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

// @desc    Create product reviews
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

// @desc    Get all product reviews
// @route   /api/products/reviews
// @method  GET
// @access  Private for Admin
const getAllReviews = asyncHandler(async (req, res) => {
  const { sortField } = req.query;
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
  const filter = req.filter;

  const reviews = await Product.aggregate([
    { $match: filter.productName ? { productName: filter.productName } : {} },
    { $unwind: '$reviews' },
    {
      $match: {
        ...(filter.isRead === false && {
          $or: [
            { 'reviews.isRead': false },
            { 'reviews.isRead': { $exists: false } },
          ],
        }),
        ...(filter.isRead === true && {
          'reviews.isRead': true,
        }),
        ...(filter.rating !== undefined && {
          'reviews.rating': filter.rating,
        }),
      },
    },
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

  const sortedReviews = sortColumns({
    collection: reviews,
    sortField,
    sortOrder,
  });

  res.status(200).json(sortedReviews);
});

// @desc    Get count for all unread reviews
// @route   /api/products/reviews/unread
// @method  GET
// @access  Private for Admin

const getUnreadReviewCount = asyncHandler(async (req, res) => {
  const unreadCount = await Product.aggregate([
    { $unwind: '$reviews' },
    {
      $match: {
        $or: [
          { 'reviews.isRead': false },
          { 'reviews.isRead': { $exists: false } },
        ],
      },
    },
    { $count: 'unreadCount' },
  ]);

  res.status(200).json({
    unreadCount: unreadCount[0]?.unreadCount ?? 0,
  });
});

export {
  createProductReviews,
  getAllReviews,
  getUnreadReviewCount,
  hasReviewed,
};
