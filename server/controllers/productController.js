import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import { PUBLISHED, SCHEDULED } from '../config/constants.js';
import asyncHandler from '../middleware/asyncHandler.js';
import scheduledStatusHandler from '../middleware/scheduledStatusHandler.js';
import Product from '../models/productModel.js';
import SubCategory from '../models/subCategoryModel.js';
import { getProductByIdService } from '../services/getProductByIdService.js';
import getProductListing from '../services/getProductListing.js';
import { formatMongoData } from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';
import { updateScheduledItems } from '../utils/UpdateScheduledItemsOptions.js';
import { validateProduct } from '../validators/validateProduct.js';
import { validateScheduledDate } from '../validators/validateScheduledDate.js';

// @desc    Create Product
// @route   /api/products
// @method  POST
// @access  Private for admin and employees
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
// @method  POST
// @access  Private for admin and employees
const duplicateProduct = asyncHandler(async (req, res) => {
  const original = await Product.findById(req.params.id);

  if (!original) {
    return res
      .status(404)
      .json({ success: false, message: 'Original product not found' });
  }

  const { _id, ...rest } = original.toObject();

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
// @method  PUT
// @access  Private for admin and employees
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
// @method  DELETE
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

// @desc    Get Shop products
// @route   /api/products
// @method  GET
// @access  Public
const getShopProducts = asyncHandler(async (req, res) => {
  const { page, productsPerPage } = req.pagination;
  const { subCategoryId, mainCategory } = req.query;

  if (subCategoryId && !mongoose.isValidObjectId(subCategoryId)) {
    return res.status(400).json({
      success: false,
      message: t('resourceNotFound', req.lang),
    });
  }

  const {
    products,
    productCount,
    totalCount,
    availableBrands,
    availableSizes,
  } = await getProductListing({
    page,
    productsPerPage,
    subCategoryId,
    mainCategory,
    filter: req.filter,
  });

  res.status(200).json({
    success: true,
    products,
    page,
    pages: Math.ceil(productCount / productsPerPage),
    productCount,
    totalCount,
    availableBrands,
    availableSizes,
  });
});

// @desc    Get admin Products
// @route   /api/products/allProducts
// @method  GET
// @access  Private for admin and employees
const getAdminProducts = asyncHandler(async (req, res) => {
  await updateScheduledItems({
    items: await Product.find({ productStatus: SCHEDULED }).lean(),
    model: Product,
    statusKey: 'productStatus',
  });

  const { page, productsPerPage } = req.pagination;
  const filter = req.filter;

  const sortField = req.query.sortField;
  const sortOrder = req.query.sortOrder;

  const sortConfig = {};

  if (sortField && sortOrder) {
    sortConfig[sortField] = sortOrder === 'desc' ? -1 : 1;
  } else {
    sortConfig.createdAt = -1;
  }

  // Validate BEFORE parsing
  const hasMinDiscountedPrice =
    req.query.minDiscountedPrice !== undefined &&
    req.query.minDiscountedPrice !== '';

  const hasMaxDiscountedPrice =
    req.query.maxDiscountedPrice !== undefined &&
    req.query.maxDiscountedPrice !== '';

  const parsedMinDiscountedPrice = hasMinDiscountedPrice
    ? Number(req.query.minDiscountedPrice)
    : undefined;

  const parsedMaxDiscountedPrice = hasMaxDiscountedPrice
    ? Number(req.query.maxDiscountedPrice)
    : undefined;

  const hasDiscountFilter = hasMinDiscountedPrice || hasMaxDiscountedPrice;

  const basePipeline = [
    { $match: filter },

    {
      $addFields: {
        discountedPrice: {
          $subtract: [
            '$price',
            {
              $multiply: [
                '$price',
                {
                  $divide: [{ $ifNull: ['$discount', 0] }, 100],
                },
              ],
            },
          ],
        },
      },
    },

    ...(hasDiscountFilter
      ? [
          {
            $match: {
              discountedPrice: {
                ...(hasMinDiscountedPrice && {
                  $gte: parsedMinDiscountedPrice,
                }),
                ...(hasMaxDiscountedPrice && {
                  $lte: parsedMaxDiscountedPrice,
                }),
              },
            },
          },
        ]
      : []),
  ];

  const nameFilters = {
    ...(req.query.subCategoryName && {
      $or: req.query.subCategoryName.split(',').map((value) => {
        const trimmedValue = value.trim();

        return {
          subCategoryName: {
            $regex: trimmedValue,
            $options: 'i',
          },
        };
      }),
    }),

    ...(req.query.categoryName && {
      categoryName: {
        $in: req.query.categoryName
          .split(',')
          .map((value) => new RegExp(`^${value.trim()}$`, 'i')),
      },
    }),
  };
  const pipeline = [
    ...basePipeline,

    {
      $lookup: {
        from: 'subcategories',
        localField: 'subCategory',
        foreignField: '_id',
        as: 'subCategory',
      },
    },
    { $unwind: { path: '$subCategory', preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: 'categories',
        localField: 'subCategory.category',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },

    {
      $addFields: {
        subCategoryName: '$subCategory.subCategoryName',
        categoryName: '$category.categoryName',
      },
    },

    ...(Object.keys(nameFilters).length ? [{ $match: nameFilters }] : []),

    { $sort: sortConfig },
    { $skip: productsPerPage * (page - 1) },
    { $limit: productsPerPage },
  ];

  const countPipeline = [
    ...basePipeline,

    {
      $lookup: {
        from: 'subcategories',
        localField: 'subCategory',
        foreignField: '_id',
        as: 'subCategory',
      },
    },
    { $unwind: { path: '$subCategory', preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: 'categories',
        localField: 'subCategory.category',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },

    {
      $addFields: {
        subCategoryName: '$subCategory.subCategoryName',
        categoryName: '$category.categoryName',
      },
    },

    ...(Object.keys(nameFilters).length ? [{ $match: nameFilters }] : []),

    { $count: 'total' },
  ];

  const products = await Product.aggregate(pipeline);
  const countResult = await Product.aggregate(countPipeline);

  const productCount = countResult[0]?.total || 0;
  const totalCount = await Product.countDocuments();

  res.status(200).json({
    success: true,
    products: formatMongoData(
      products.map(({ scheduledDate, ...rest }) => {
        const base = { ...rest };

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

// @desc    Get Sale products
// @route   /api/products/sale
// @method  GET
// @access  Public
const getSaleProducts = asyncHandler(async (req, res) => {
  const saleProducts = await Product.find({
    productStatus: PUBLISHED,
    discount: { $gt: 0 },
  })
    .select(
      'productName price discount sizes colors images brand countInStock subCategory',
    )
    .populate({
      path: 'subCategory',
      select: 'category allowedSizes',
      populate: {
        path: 'category',
        select: 'categoryName',
      },
    })
    .lean();

  const formattedSaleProducts = formatMongoData(
    saleProducts.map((product) => {
      const { images, subCategory, ...restData } = product;

      return {
        ...restData,
        image: images[0],
        allowedSizes: subCategory.allowedSizes,
        categoryName: subCategory.category.categoryName,
        categoryId: subCategory.category._id,
      };
    }),
  );

  res.status(200).json(formattedSaleProducts);
});

// @desc    Get Product By ID
// @route   /api/products/:id
// @method  GET
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await getProductByIdService(req.params.id, true);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: t('couldNotFindInfo', req.lang),
    });
  }

  res.status(200).json(product);
});

// @desc    Get shop product by ID
// @route   /api/products/shop/:id
// @method  GET
// @access  Public
const getShopProductById = asyncHandler(async (req, res) => {
  const product = await getProductByIdService(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: t('couldNotFindInfo', req.lang),
    });
  }

  res.status(200).json(product);
});

// @desc    Check Scheduled Products
// @route   /api/products/scheduled
// @method  GET
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
  getAdminProducts,
  getProductById,
  getSaleProducts,
  getShopProductById,
  getShopProducts,
  updateProduct,
};
