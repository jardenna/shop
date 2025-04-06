import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';
import formatMongoData from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';
import validateScheduledDate from '../utils/validateCategory.js';

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
  const { categoryName, categoryStatus, scheduledDate } = req.body;

  if (!categoryStatus) {
    return res.status(400).json({
      success: false,
      message: t('pleaseSpecifyCategoryStatus', req.lang),
    });
  }

  const validationResult = validateScheduledDate(categoryStatus, scheduledDate);
  if (!validationResult.success) {
    return res.status(400).json(validationResult);
  }

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

  const categoryData = { categoryName, categoryStatus };
  if (categoryStatus === 'Scheduled') {
    categoryData.scheduledDate = scheduledDate;
  }

  const category = await new Category(categoryData).save();

  res.status(201).json({
    message: t('newCategoryCreated', req.lang),
    id: category._id,
    categoryName: category.categoryName,
    categoryStatus: category.categoryStatus,
    scheduledDate: category.scheduledDate, // Ensure this field is included
    createdAt: category.createdAt,
  });
});

// @desc    Update category
// @route   /api/category/id
// @method  Put
// @access  Private for admin and employee
const updateCategory = asyncHandler(async (req, res) => {
  const { categoryName, categoryStatus, scheduledDate } = req.body;

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

  if (categoryStatus) {
    category.categoryStatus = categoryStatus;

    const validationResult = validateScheduledDate(
      categoryStatus,
      scheduledDate,
    );
    if (!validationResult.success) {
      return res.status(400).json(validationResult);
    }

    if (categoryStatus === 'Scheduled') {
      category.scheduledDate = scheduledDate;
    } else {
      category.scheduledDate = undefined; // Clear scheduledDate if status is not "Scheduled"
    }
  }

  const updatedCategory = await category.save();
  res.status(200).json({
    success: true,
    message: t('categoryUpdated', req.lang),
    updatedCategory: {
      id: updatedCategory._id,
      categoryName: updatedCategory.categoryName,
      categoryStatus: updatedCategory.categoryStatus,
      scheduledDate: updatedCategory.scheduledDate,
      createdAt: updatedCategory.createdAt,
      updatedAt: updatedCategory.updatedAt,
    },
  });
});

export { createCategory, getAllCategories, updateCategory };
