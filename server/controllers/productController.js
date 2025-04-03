import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import validateProduct from '../utils/validateProduct .js';

const errorResponse = { success: false, message: 'Product not found' };
// @desc    Create Product
// @route   /api/products
// @method  Post
// @access  Private for admin and employee
const createProduct = asyncHandler(async (req, res) => {
  try {
    const error = validateProduct(req.body);
    if (error) {
      return res.json({ success: false, message: error });
    }

    const product = new Product({ ...req.body });

    if (!product) {
      return res.status(404).json(errorResponse);
    }

    await product.save();
    const productResponse = { id: product._id, ...req.body };

    res.json(productResponse);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// @desc    Update product
// @route   /api/products/id
// @method  Put
// @access  Private for admin and employee
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const error = validateProduct(req.body);
    if (error) {
      return res.json({ success: false, message: error });
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      },
      { new: true },
    );

    if (!product) {
      return res.status(404).json(errorResponse);
    }

    await product.save();

    const productResponse = { id: product._id, ...req.body };
    res.json(productResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete product
// @route   /api/products/id
// @method  Put
// @access  Private for admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json(errorResponse);
  }
});

// @desc    Get all paginated products and keyword-based search
// @route   /api/products
// @method  Get
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .lean();

    if (!products) {
      return res.status(404).json(errorResponse);
    }

    res.json({
      products: products.map(({ _id, ...rest }) => ({
        id: _id,
        ...rest,
      })),
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// @desc    Get ProductById
// @route   /api/products/id
// @method  Get
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    const { _id, ...rest } = product;
    const productResponse = { id: _id, ...rest };

    if (product) {
      return res.json(productResponse);
    } else {
      res.status(404).json(errorResponse);
    }
  } catch (error) {
    res.status(404).json(errorResponse);
  }
});

// @desc    Get sorted Products
// @route   /api/products/allProducts
// @method  Get
// @access  Public
const getSortedProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category')
      .limit(12)
      .sort({ createAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// @desc    Create reviews
// @route   /api/products/id/reviews
// @method  Post
// @access  Public for logged in users
const createProductReviews = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);


    // const { _id, ...rest } = product;
    // const productResponse = { id: _id, ...rest };

    if (!product) {
      return res.status(404).json(errorResponse);
    }

    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'Product already reviewed',
      });
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

    await product.save();
    return res.status(201).json({ message: 'Review added' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// @desc    Get 4 top products
// @route   /api/products/top
// @method  Get
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// @desc   Get 5 newest products
// @route   /api/products/new
// @method  Get
// @access  Public
const getNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export {
  createProduct,
  createProductReviews,
  deleteProduct,
  getNewProducts,
  getProductById,
  getProducts,
  getSortedProducts,
  getTopProducts,
  updateProduct
};

