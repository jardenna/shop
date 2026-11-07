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
// @route   /api/reviews
// @method  GET
// @access  Private for admin and employees
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
// @route   /api/reviews/unread
// @method  GET
// @access  Private for admin and employees
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

// @desc    Mark all unread reviews as read
// @route   /api/reviews/read-all
// @method  Patch
// @access  Private for admin and employees
const markAllReviewsAsRead = asyncHandler(async (req, res) => {
  const result = await Product.updateMany(
    {
      reviews: {
        $elemMatch: {
          $or: [{ isRead: false }, { isRead: { $exists: false } }],
        },
      },
    },
    {
      $set: {
        'reviews.$[review].isRead': true,
      },
    },
    {
      arrayFilters: [
        {
          $or: [
            { 'review.isRead': false },
            { 'review.isRead': { $exists: false } },
          ],
        },
      ],
    },
  );

  res.status(200).json({
    success: true,
    message: t('allReviewMarkedAsRead', req.lang),
    modifiedCount: result.modifiedCount,
  });
});

// @desc    Mark one review as read
// @route   /api/reviews/:reviewId/read
// @method  Patch
// @access  Private for admin and employees
const markReviewAsRead = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const product = await Product.findOneAndUpdate(
    {
      'reviews._id': reviewId,
    },
    {
      $set: {
        'reviews.$.isRead': true,
      },
    },
    {
      new: true,
      projection: {
        _id: 1,
      },
    },
  );

  if (!product) {
    res.status(404).json({
      success: false,
      message: t('reviewNotFound', req.lang),
    });
  }

  res.status(200).json({
    success: true,
    message: t('reviewMarkedAsRead', req.lang),
    reviewId,
  });
});

export {
  createProductReviews,
  getAllReviews,
  getUnreadReviewCount,
  hasReviewed,
  markAllReviewsAsRead,
  markReviewAsRead,
};
