import fs from 'fs';
import path from 'path';
import asyncHandler from '../middleware/asyncHandler.js';
import scheduledStatusHandler from '../middleware/scheduledStatusHandler.js';
import Product from '../models/productModel.js';
import SubCategory from '../models/subCategoryModel.js';
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

  const { subCategory, quantity, ...rest } = req.body;

  // Check subcategory
  const subCategoryId = await SubCategory.findById(subCategory);
  if (!subCategoryId) {
    return res
      .status(400)
      .json({ success: false, message: 'Subcategory does not exist' });
  }

  // Use quantity to set initial countInStock
  const countInStock = Number(quantity) || 0;

  const product = new Product({
    subCategory,
    countInStock,
    ...rest,
  });

  await product.save();

  res.status(201).json({ id: product._id, ...req.body });
});

// @desc    Update Product
// @route   /api/products/:id
// @method  Put
// @access  Private for admin and employee
const updateProduct = [
  scheduledStatusHandler, // Apply middleware here
  asyncHandler(async (req, res) => {
    const { subCategory, quantity, images, ...rest } = req.body;

    const subCategoryId = await SubCategory.findById(subCategory);
    if (!subCategoryId) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid subCategory ID' });
    }

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    if (images && Array.isArray(images)) {
      const oldImages = existingProduct.images || [];
      const imagesToDelete = oldImages.filter(
        (oldImage) => !images.includes(oldImage),
      );

      imagesToDelete.forEach((imagePath) => {
        const fullPath = path.join(process.cwd(), imagePath);
        fs.unlink(fullPath, (error) => {
          if (error) {
            return res
              .status(500)
              .json({ message: `Failed to delete image: ${fullPath}`, error });
          }
        });
      });
    }

    let updatedCountInStock = existingProduct.countInStock;
    if (quantity && quantity > 0) {
      updatedCountInStock += Number(quantity);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        subCategory,
        countInStock: updatedCountInStock,
        images,
        scheduledDate: req.body.scheduledDate, // Set or clear scheduledDate
        ...rest,
      },
      { new: true },
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product update failed' });
    }

    res.json({
      id: product._id,
      productName: product.productName,
      countInStock: product.countInStock,
      quantity: product.quantity,
      images: product.images,
      ...rest,
    });
  }),
];

// @desc    Delete Product
// @route   /api/products/:id
// @method  Delete
// @access  Private for admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json(errorResponse);
  }

  // Delete associated images
  if (product.images && product.images.length > 0) {
    product.images.forEach((imagePath) => {
      const fullPath = path.join(process.cwd(), imagePath);
      fs.unlink(fullPath, (error) => {
        if (error) {
          return res
            .status(500)
            .json({ message: `Failed to delete image: ${fullPath}`, error });
        }
      });
    });
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
    .populate({
      path: 'subCategory',
      populate: {
        path: 'category',
        model: 'Category',
      },
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 })
    .lean();

  const count = await Product.countDocuments();

  res.json({
    success: true,
    products: formatMongoData(
      products.map(({ subCategoryName, ...rest }) => ({
        ...rest,
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
  const product = await Product.findById(req.params.id)
    .populate({
      path: 'subCategory',
      populate: {
        path: 'category',
        model: 'Category',
      },
    })
    .lean();

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
