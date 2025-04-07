import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';
import formatMongoData from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';
import validateScheduledDate from '../utils/validateScheduledDate.js';

// @desc    Create category
// @route   /api/category
// @method  Post
// @access  Private for admin and employee
const createCategory = asyncHandler(async (req, res) => {
  const { categoryName, categoryStatus, scheduledDate } = req.body;

  const validationResult = validateScheduledDate(categoryStatus, scheduledDate);
  if (!validationResult.success) {
    return res.status(400).json(validationResult);
  }

  if (!categoryName) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a category name',
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
    success: true,
    message: 'New category created',
    id: category._id,
    categoryName: category.categoryName,
    categoryStatus: category.categoryStatus || 'Inactive',
    scheduledDate: category.scheduledDate, // Ensure this field is included
    createdAt: category.createdAt,
  });
});

// @desc    Get all Categories
// @route   /api/category
// @method  Get
// @access  Public
const getAllCategories = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({}).lean();

  // Automatically update "Scheduled" categories to "Published" if the date has passed
  const now = new Date();
  const updatedCategories = await Promise.all(
    allCategories.map(async (category) => {
      if (
        category.categoryStatus === 'Scheduled' &&
        category.scheduledDate <= now
      ) {
        await Category.findByIdAndUpdate(category._id, {
          categoryStatus: 'Published',
          scheduledDate: undefined, // Clear the scheduledDate
        });
        category.categoryStatus = 'Published';
        category.scheduledDate = undefined;
      }
      return category;
    }),
  );

  const formattedCategories = formatMongoData(updatedCategories);

  if (!updatedCategories?.length) {
    return res.status(404).json({ message: t('noData', req.lang) });
  }

  res.status(200).json(formattedCategories);
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
      message: 'Please enter a category name',
    });
  }

  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found',
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
    message: 'Category updated',
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
