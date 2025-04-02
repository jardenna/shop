import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import { t } from '../utils/translator.js';
import validateProduct from '../utils/validateProduct .js';

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
    await product.save();
    res.json(product);
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
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// @desc    Delete product
// @route   /api/products/id
// @method  Put
// @access  Private for admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('noProduct', req.lang),
    });
  }
});

// @desc    Get all products
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
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// @desc    Get ProductById
// @route   /api/products
// @method  Get
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      res.status(404).json({
        success: false,
        message: t('noProduct', req.lang),
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: t('noProduct', req.lang),
    });
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

const createProductReviews = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString(),
      );

      if (alreadyReviewed) {
        res.status(400).json({
          success: false,
          message: 'Product already reviewed',
        });
      }
      const review = {
        name: req.user.username,
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
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({
        success: false,
        message: t('noProduct', req.lang),
      });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export {
  createProduct,
  createProductReviews,
  deleteProduct,
  getProductById,
  getProducts,
  getSortedProducts,
  updateProduct,
};
