import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Create Product Reviews
// @route   /api/products/:id/reviews
// @method  Post
// @access  Public for logged-in users
const createProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json(errorResponse);
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString(),
  );

  if (alreadyReviewed) {
    return res
      .status(400)
      .json({ success: false, message: 'Product already reviewed' });
  }

  const review = {
    name: req.user.username,
    id: req.user._id,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await Product.findByIdAndUpdate(
    req.params.id,
    {
      reviews: product.reviews,
      numReviews: product.numReviews,
      rating: product.rating,
    },
    { new: true },
  );

  res.status(201).json({ message: 'Review added' });
});

export default createProductReviews;
