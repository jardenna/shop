import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js'; // Import Category model
import Product from '../models/productModel.js';
import SubCategory from '../models/subCategoryModel.js'; // Import SubCategory model
import formatMongoData from '../utils/formatMongoData.js';
import validateProduct from '../utils/validateProduct.js';

const errorResponse = {
  success: false,
  message: 'Product not found',
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

  const { category, subCategory, ...rest } = req.body;

  // Validate category existence
  const categoryId = await Category.findById(category);

  if (!categoryId) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid category ID' });
  }

  // Validate subCategory existence
  const subCategoryId = await SubCategory.findById(subCategory);
  if (!subCategoryId) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid subCategory ID' });
  }

  const product = new Product({ category, subCategory, ...rest });

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

  const { category, subCategory, ...rest } = req.body;

  // Validate category existence
  const categoryId = await Category.findById(category);
  if (!categoryId) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid category ID' });
  }

  // Validate subCategory existence
  const subCategoryId = await SubCategory.findById(subCategory);
  if (!subCategoryId) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid subCategory ID' });
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { category, subCategory, ...rest },
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
    products: formatMongoData(products),
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
    products: formatMongoData(
      products.map(({ category, ...rest }) => ({
        ...rest,
        category: category
          ? { id: category._id, ...category, _id: undefined }
          : null,
      })),
    ),
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
    products: formatMongoData(products),
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
    products: formatMongoData(products),
  });
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

  res.json(formatMongoData(product));
});

export {
  createProduct,
  deleteProduct,
  getNewProducts,
  getProductById,
  getProducts,
  getSortedProducts,
  getTopProducts,
  updateProduct,
};
