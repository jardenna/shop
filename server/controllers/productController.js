import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import validateProduct from '../utils/validateProduct .js';

const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: 'Product not found',
};

const errorResponse = {
  success: false,
  message: ERROR_MESSAGES.PRODUCT_NOT_FOUND,
};

// @desc    Create Product
// @route   /api/products
// @method  Post
// @access  Private for admin and employee
const createProduct = asyncHandler(async (req, res) => {
  const error = validateProduct(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const {
    productName,
    image,
    brand,
    quantity,
    category,
    subCategory,
    description,
    price,
    countInStock,
    sizes,
    colors,
    material,
    discount,
  } = req.body;

  const product = new Product({
    productName,
    image,
    brand,
    quantity,
    category,
    subCategory,
    description,
    price,
    countInStock,
    colors,
    material,
    sizes,
    discount,
  });

  await product.save();

  res.status(201).json({ id: product._id, ...req.body });
});

// @desc    Update Product
// @route   /api/products/:id
// @method  Put
// @access  Private for admin and employee
const updateProduct = asyncHandler(async (req, res) => {
  const error = validateProduct(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const {
    productName,
    image,
    brand,
    quantity,
    category,
    subCategory,
    description,
    price,
    countInStock,
    sizes,
    colors,
    material,
    discount,
  } = req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      productName,
      image,
      brand,
      quantity,
      category,
      subCategory,
      description,
      price,
      countInStock,
      sizes: req.body.sizes || ['S', 'M', 'L', 'XL'],
      colors,
      material,
      discount,
    },
    { new: true },
  );

  if (!product) {
    return res.status(404).json(errorResponse);
  }

  res.json({ id: product._id, ...req.body });
});

// @desc    Delete Product
// @route   /api/products/:id
// @method  Delete
// @access  Private for admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json(errorResponse);
  }

  res.json({ success: true, message: 'Product deleted successfully' });
});

// @desc    Get All Products with Pagination
// @route   /api/products
// @method  Get
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 6;
  const page = parseInt(req.query.page) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Product.countDocuments(keyword);
  const products = await Product.find(keyword)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    products: products.map(({ _id, ...rest }) => ({ id: _id, ...rest })),
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Get Sorted Products
// @route   /api/products/allProducts
// @method  Get
// @access  Public
const getSortedProducts = asyncHandler(async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 12;
  const page = parseInt(req.query.page) || 1;

  const products = await Product.find({})
    .populate('category')
    .populate('subCategory')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 })
    .lean();

  const count = await Product.countDocuments();

  res.json({
    products: products.map(({ _id, category, ...rest }) => ({
      id: _id,
      category: category
        ? { id: category._id, ...category, _id: undefined }
        : null,
      ...rest,
    })),
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Get Top Products
// @route   /api/products/top
// @method  Get
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4).lean();

  res.json({
    products: products.map(({ _id, ...rest }) => ({ id: _id, ...rest })),
  });
});

// @desc    Get New Products
// @route   /api/products/new
// @method  Get
// @access  Public
const getNewProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  res.json({
    products: products.map(({ _id, ...rest }) => ({ id: _id, ...rest })),
  });
});

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

  await product.save();
  res.status(201).json({ message: 'Review added' });
});

// @desc    Get Product By ID
// @route   /api/products/:id
// @method  Get
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).lean();

  if (!product) {
    return res.status(404).json(errorResponse);
  }

  const { _id, ...rest } = product;
  res.json({ id: _id, ...rest });
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
  updateProduct,
};
