import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';
import formatMongoData from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';

// @desc    Get all Categories
// @route   /api/category
// @method  Get
// @access  Public
const getAllCategories = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({}).lean();
  const formattedCategories = formatMongoData(allCategories);

  if (!allCategories?.length) {
    return res.status(404).json({ message: t('noData', req.lang) });
  }

  res.status(200).json(formattedCategories);
});

// @desc    Create category
// @route   /api/category
// @method  Post
// @access  Private for admin and employee
const createCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).json({
      success: false,
      message: t('pleaseEnterCategoryName', req.lang),
    });
  }

  const existingCategory = await Category.findOne({ categoryName });

  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: t('categoryAlreadyExist', req.lang),
    });
  }

  const category = await new Category({ categoryName }).save();
  res.status(201).json({
    success: true,
    message: t('newCategoryCreated', req.lang),
    id: category._id,
    categoryName: category.categoryName,
    createdAt: category.createdAt,
  });
});

// @desc    Update category
// @route   /api/category/id
// @method  Put
// @access  Private for admin and employee
const updateCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).json({
      success: false,
      message: t('pleaseEnterCategoryName', req.lang),
    });
  }

  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: t('categoryNotFound', req.lang),
    });
  }

  category.categoryName = categoryName;

  const updatedCategory = await category.save();
  res.status(200).json({
    success: true,
    message: t('categoryUpdated', req.lang),
    updatedCategory,
  });
});

export { createCategory, getAllCategories, updateCategory };
