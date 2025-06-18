import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import asyncHandler from '../middleware/asyncHandler.js';
import scheduledStatusHandler from '../middleware/scheduledStatusHandler.js';
import Product from '../models/productModel.js';
import SubCategory from '../models/subCategoryModel.js';
import formatMongoData from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';
import { updateScheduledItems } from '../utils/UpdateScheduledItemsOptions.js';
import validateProduct from '../utils/validateProduct.js';
import validateScheduledDate from '../utils/validateScheduledDate.js';

// @desc    Create Product
// @route   /api/products
// @method  Post
// @access  Private for admin and employee
const createProduct = [
  scheduledStatusHandler('productStatus'),
  asyncHandler(async (req, res) => {
    const error = validateProduct(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const { subCategory, quantity, ...rest } = req.body;

    const validationResult = validateScheduledDate(
      rest.productStatus,
      rest.scheduledDate,
      req.lang,
    );

    if (!validationResult.success) {
      return res.status(400).json(validationResult);
    }

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
  }),
];

// @desc    Dublicate Product
// @route   /api/products/:id/duplicate
// @method  Post
// @access  Private for admin and employee
const duplicateProduct = asyncHandler(async (req, res) => {
  const original = await Product.findById(req.params.id);

  if (!original) {
    return res
      .status(404)
      .json({ success: false, message: 'Original product not found' });
  }

  const { _id, images, createdAt, updatedAt, ...rest } = original.toObject();

  const subCategoryExists = await SubCategory.findById(original.subCategory);
  if (!subCategoryExists) {
    return res
      .status(400)
      .json({ success: false, message: 'Subcategory does not exist' });
  }

  const countInStock = Number(rest.quantity) || 0;

  const copy = new Product({
    ...rest,
    countInStock,
    images: [],
    createdAt: new Date(),
    productName: `${rest.productName} (${t('copy', req.lang)})`,
  });

  await copy.save();

  res.status(201).json({
    id: copy._id,
    ...copy.toObject(),
  });
});

// @desc    Update Product
// @route   /api/products/:id
// @method  Put
// @access  Private for admin and employee
const updateProduct = [
  scheduledStatusHandler('productStatus'),
  asyncHandler(async (req, res) => {
    const { subCategory, quantity, images, scheduledDate, ...rest } = req.body;

    const validationResult = validateScheduledDate(
      rest.productStatus,
      scheduledDate,
      req.lang,
    );

    if (!validationResult.success) {
      return res.status(400).json(validationResult);
    }

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
        productStatus: req.body.productStatus,
        scheduledDate: req.body.scheduledDate,
        ...rest,
      },
      { new: true },
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: t('productNotFound', req.lang) });
    }

    res.status(200).json({
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
    return res.status(404).json({
      success: false,
      message: t('productNotFound', req.lang),
    });
  }

  // Delete associated images
  if (product.images && product.images.length > 0) {
    const deleteImagePromises = product.images.map((imagePath) => {
      const fullPath = path.join(process.cwd(), imagePath);
      return fs.promises.unlink(fullPath).catch((error) => {
        console.error(`Failed to delete image: ${fullPath}`, error);
      });
    });

    await Promise.all(deleteImagePromises); // Wait for all deletions to complete
  }

  res
    .status(200)
    .json({ success: true, message: 'Product deleted successfully' });
});

// @desc    Get All Products with Pagination
// @route   /api/products
// @method  Get
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 6;
  const page = parseInt(req.query.page) || 1;
  const subCategoryId = req.query.subCategoryId;
  const mainCategory = req.query.mainCategory;

  const matchStage = [];

  if (subCategoryId) {
    matchStage.push({
      'subCategoryData._id': new mongoose.Types.ObjectId(String(subCategoryId)),
    });
  }

  if (mainCategory) {
    matchStage.push({ 'categoryData.categoryName': mainCategory });
  }

  const basePipeline = [
    {
      $lookup: {
        from: 'subcategories',
        localField: 'subCategory',
        foreignField: '_id',
        as: 'subCategoryData',
      },
    },
    { $unwind: '$subCategoryData' },
    {
      $lookup: {
        from: 'categories',
        localField: 'subCategoryData.category',
        foreignField: '_id',
        as: 'categoryData',
      },
    },
    { $unwind: '$categoryData' },
  ];

  if (matchStage.length > 0) {
    basePipeline.push({ $match: { $and: matchStage } });
  }

  // Count pipeline
  const countPipeline = [...basePipeline, { $count: 'total' }];
  const countResult = await Product.aggregate(countPipeline);
  const count = countResult[0]?.total || 0;

  // Paginated results
  const paginatedPipeline = [
    ...basePipeline,
    { $sort: { createdAt: -1 } },
    { $skip: pageSize * (page - 1) },
    { $limit: pageSize },
    {
      $addFields: {
        id: '$_id',
        mainCategory: '$categoryData._id', // include just the ID
      },
    },
    {
      $project: {
        _id: 0,
        subCategoryData: 0,
        categoryData: 0,
      },
    },
  ];

  const products = await Product.aggregate(paginatedPipeline);

  res.status(200).json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    productCount: count,
  });
});

// @desc    Get Sorted Products
// @route   /api/products/allProducts
// @method  Get
// @access  Public
const getSortedProducts = asyncHandler(async (req, res) => {
  await updateScheduledItems({
    items: await Product.find({ productStatus: 'Scheduled' }).lean(),
    model: Product,
    statusKey: 'productStatus',
  });

  const { page, pageSize } = req.pagination;
  const filter = req.filter;
  const sort = req.sort;

  const products = await Product.find(filter)
    .populate({
      path: 'subCategory',
      populate: { path: 'category', model: 'Category' },
    })
    .sort(sort)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const count = await Product.countDocuments(filter);

  res.status(200).json({
    success: true,
    products: formatMongoData(
      products.map(({ subCategoryName, scheduledDate, ...rest }) =>
        rest.productStatus === 'Scheduled' ? { ...rest, scheduledDate } : rest,
      ),
    ),
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

// @desc    Get Top Products
// @route   /api/products/top
// @method  Get
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4).lean();

  res.status(200).json({
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

  res.status(200).json({
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
    return res.status(404).json({
      success: false,
      message: t('couldNotFindInfo', req.lang),
    });
  }

  res.status(200).json(formatMongoData(product));
});

// @desc    Check Scheduled Products
// @route   /api/products/scheduled
// @method  Get
// @access  Public
const checkScheduled = asyncHandler(async (req, res) => {
  const now = new Date();

  const hasScheduled = await Product.exists({
    productStatus: 'Scheduled',
    scheduledDate: { $lte: now },
  });

  res.status(200).json({ hasScheduled: !!hasScheduled });
});

export {
  checkScheduled,
  createProduct,
  deleteProduct,
  duplicateProduct,
  getNewProducts,
  getProductById,
  getProducts,
  getSortedProducts,
  getTopProducts,
  updateProduct,
};
