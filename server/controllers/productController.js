import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import { PUBLISHED, SCHEDULED } from '../config/constants.js';
import asyncHandler from '../middleware/asyncHandler.js';
import scheduledStatusHandler from '../middleware/scheduledStatusHandler.js';
import Product from '../models/productModel.js';
import SubCategory from '../models/subCategoryModel.js';
import { formatMongoData } from '../utils/formatMongoData.js';
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

      // Delete images safely
      await Promise.all(
        imagesToDelete.map(async (imagePath) => {
          const cleanPath = imagePath.replace(/^\/+/, ''); // remove leading slash
          const fullPath = path.join(process.cwd(), 'public', cleanPath);

          try {
            await fs.promises.unlink(fullPath);
          } catch (error) {
            console.error(`Failed to delete image: ${fullPath}`, error);
          }
        }),
      );

      existingProduct.images = images;
    }

    if (quantity && quantity > 0) {
      existingProduct.countInStock += Number(quantity);
    }

    existingProduct.subCategory = subCategory;
    existingProduct.productStatus = rest.productStatus;
    existingProduct.scheduledDate = scheduledDate;

    Object.assign(existingProduct, rest);

    await existingProduct.save();

    res.status(200).json({
      id: existingProduct._id,
      productName: existingProduct.productName,
      countInStock: existingProduct.countInStock,
      quantity: quantity || 0,
      images: existingProduct.images,
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
    await Promise.all(
      product.images.map(async (imagePath) => {
        const cleanPath = imagePath.replace(/^\/+/, ''); // remove leading slash
        const fullPath = path.join(process.cwd(), 'public', cleanPath);

        try {
          await fs.promises.unlink(fullPath);
        } catch (error) {
          console.error(`Failed to delete image: ${fullPath}`, error);
        }
      }),
    );
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
  const productsPerPage = parseInt(req.query.productsPerPage) || 6;
  const page = parseInt(req.query.page) || 1;
  const subCategoryId = req.query.subCategoryId;
  const mainCategory = req.query.mainCategory;

  // Helper: common pipeline for category/subcategory joins
  const categoryJoinPipeline = [
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
    {
      $match: {
        'subCategoryData.categoryStatus': PUBLISHED,
        'categoryData.categoryStatus': PUBLISHED,
      },
    },
  ];

  // Category/Subcategory filters
  const categoryMatchStage = [];
  if (subCategoryId) {
    categoryMatchStage.push({
      'subCategoryData._id': new mongoose.Types.ObjectId(String(subCategoryId)),
    });
  }

  if (mainCategory) {
    categoryMatchStage.push({
      'categoryData.categoryName': {
        $regex: `^${mainCategory}$`,
        $options: 'i',
      },
    });
  }

  if (categoryMatchStage.length) {
    categoryJoinPipeline.push({ $match: { $and: categoryMatchStage } });
  }

  // Meta aggregation (brands/sizes unfiltered by product filters)
  const metaPipeline = [
    ...categoryJoinPipeline,
    { $match: { productStatus: PUBLISHED } }, // only published products in meta
    {
      $group: {
        _id: null,
        brands: { $addToSet: '$brand' },
        sizes: { $addToSet: '$sizes' },
      },
    },
    { $project: { _id: 0, brands: 1, sizes: 1 } },
  ];

  const metaResult = await Product.aggregate(metaPipeline);
  const availableSizesRaw = metaResult[0]?.sizes?.flat() || [];
  const availableSizes = [...new Set(availableSizesRaw)];
  const availableBrandsRaw = metaResult[0]?.brands || [];
  const availableBrands = [...new Set(availableBrandsRaw)].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  );

  // Product filters
  const combinedMatch =
    req.filter && Object.keys(req.filter).length ? { ...req.filter } : {};

  // Always only published products
  combinedMatch.productStatus = PUBLISHED;

  if (categoryMatchStage.length) {
    if (Object.keys(combinedMatch).length) {
      combinedMatch.$and = [
        ...(combinedMatch.$and || []),
        ...categoryMatchStage,
      ];
    } else {
      Object.assign(combinedMatch, { $and: categoryMatchStage });
    }
  }

  // Count all published products in same category scope (before filters)
  const baseCategoryPipeline = [
    ...categoryJoinPipeline,
    {
      $match: { productStatus: PUBLISHED },
    },
  ];

  const totalCountResult = await Product.aggregate([
    ...baseCategoryPipeline,
    { $count: 'total' },
  ]);
  const totalCount = totalCountResult[0]?.total || 0;

  const filteredCountResult = await Product.aggregate([
    ...categoryJoinPipeline,
    { $match: combinedMatch },
    { $count: 'total' },
  ]);
  const filteredCount = filteredCountResult[0]?.total || 0;

  const productPipeline = [
    ...categoryJoinPipeline,
    { $match: combinedMatch },
    { $sort: { createdAt: -1 } },
    { $skip: productsPerPage * (page - 1) },
    { $limit: productsPerPage },
    {
      $addFields: {
        id: '$_id',
        subCategoryId: '$subCategory',
        subCategoryName: '$subCategoryData.subCategoryName',
        categoryName: '$categoryData.categoryName',
      },
    },
    {
      $project: {
        _id: 0,
        subCategoryData: 0,
        categoryData: 0,
        __v: 0,
        subCategory: 0,
      },
    },
  ];

  const products = await Product.aggregate(productPipeline);

  res.status(200).json({
    success: true,
    products,
    page,
    pages: Math.ceil(filteredCount / productsPerPage),
    productCount: filteredCount, // for pagination
    totalCount, // all products within same category scope
    availableBrands,
    availableSizes,
  });
});

// @desc    Get Sorted Products
// @route   /api/products/allProducts
// @method  Get
// @access  Public
const getSortedProducts = asyncHandler(async (req, res) => {
  await updateScheduledItems({
    items: await Product.find({ productStatus: SCHEDULED }).lean(),
    model: Product,
    statusKey: 'productStatus',
  });

  const { page, productsPerPage } = req.pagination;
  const filter = req.filter;
  const sort = req.sort;

  const products = await Product.find(filter)
    .populate({
      path: 'subCategory',
      populate: { path: 'category', model: 'Category' },
    })
    .sort(sort)
    .skip(productsPerPage * (page - 1))
    .limit(productsPerPage)
    .lean();

  const productCount = await Product.countDocuments(filter);
  const totalCount = await Product.countDocuments();

  res.status(200).json({
    success: true,
    products: formatMongoData(
      products.map(({ scheduledDate, ...rest }) => {
        const subCategory = rest.subCategory;
        const subCategoryName = subCategory?.subCategoryName;
        const categoryName = subCategory?.category?.categoryName;

        const base = {
          ...rest,
          subCategoryName,
          categoryName,
        };

        return rest.productStatus === SCHEDULED
          ? { ...base, scheduledDate }
          : base;
      }),
    ),
    page,
    pages: Math.ceil(productCount / productsPerPage),
    productCount,
    totalCount,
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

  product.subCategoryName = product.subCategory?.subCategoryName || '';
  product.categoryName = product.subCategory?.category?.categoryName || '';

  res.status(200).json(formatMongoData(product));
});

// @desc    Get shop product by ID
// @route   /api/products/shop/:id
// @method  Get
// @access  Public
const getShopProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate({
      path: 'subCategory',
      select: 'subCategoryName category',
      populate: {
        path: 'category',
        select: 'categoryName',
      },
    })
    .lean();

  if (!product) {
    return res.status(404).json({
      success: false,
      message: t('couldNotFindInfo', req.lang),
    });
  }

  const subCategoryName = product.subCategory?.subCategoryName || '';
  const categoryName = product.subCategory?.category?.categoryName || '';

  const { subCategory, ...rest } = formatMongoData(product);

  res.status(200).json({
    ...rest,
    subCategoryName,
    categoryName,
  });
});

// @desc    Check Scheduled Products
// @route   /api/products/scheduled
// @method  Get
// @access  Public
const checkScheduled = asyncHandler(async (req, res) => {
  const now = new Date();

  const hasScheduled = await Product.exists({
    productStatus: SCHEDULED,
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
  getShopProductById,
  getSortedProducts,
  getTopProducts,
  updateProduct,
};
