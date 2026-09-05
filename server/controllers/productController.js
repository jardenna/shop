import mongoose from 'mongoose';
import { PUBLISHED } from '../config/constants.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import { getProductByIdService } from '../services/getProductByIdService.js';
import getProductListing from '../services/getProductListing.js';
import { formatMongoData } from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';

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
      'productName price discount sizes colors images brand countInStock subCategory description',
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

// @desc    Get Sale menu
// @route   /api/products/sale-menu
// @method  GET
// @access  Public
const getSaleSubMenu = asyncHandler(async (req, res) => {
  const categories = await Category.find({
    categoryStatus: PUBLISHED,
  })
    .select('categoryName')
    .lean();

  const saleSubMenu = categories.map(({ _id, categoryName }) => ({
    label: categoryName.toLowerCase(),
    categoryId: _id,
  }));

  res.status(200).json(formatMongoData(saleSubMenu));
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

export { getSaleProducts, getSaleSubMenu, getShopProductById, getShopProducts };
