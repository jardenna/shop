import asyncHandler from '../middleware/asyncHandler.js';
import scheduledStatusHandler from '../middleware/scheduledStatusHandler.js';
import Category from '../models/categoryModel.js';
import formatMongoData from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';
import { updateScheduledItems } from '../utils/UpdateScheduledItemsOptions.js';
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
      message: t('pleaseEnterCategoryName', req.lang),
    });
  }

  // const existingCategory = await Category.findOne({
  //   categoryName: { $regex: new RegExp(`^${categoryName}$`, 'i') },
  // });

  // if (existingCategory) {
  //   return res.status(400).json({
  //     success: false,
  //     message: t('categoryAlreadyExist', req.lang),
  //   });
  // }

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

// @desc    Get all categories
// @route   /api/category
// @method  Get
// @access  Public
const getAllCategories = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({}).lean();

  const updatedCategories = await updateScheduledItems({
    items: allCategories,
    model: Category,
  });

  const formattedCategories = formatMongoData(updatedCategories);

  if (!updatedCategories?.length) {
    return res.status(404).json({ message: t('noData', req.lang) });
  }

  // Include parent category IDs in the response
  const categoriesWithParent = formattedCategories.map((category) => ({
    ...category,
    parentCategoryId: category.parentCategory || null, // Add parentCategoryId if it exists
  }));

  res.status(200).json({ success: true, categories: categoriesWithParent });
});

// @desc    Check if category is scheduled
// @route   /api/scheduled
// @method  Get
// @access  Public
const checkScheduled = asyncHandler(async (req, res) => {
  const now = new Date();

  const hasScheduled = await Category.exists({
    categoryStatus: 'Scheduled',
    scheduledDate: { $lte: now },
  });

  res.json({ hasScheduled: !!hasScheduled });
});

// @desc    Get category by id
// @route   /api/category/id
// @method  Get
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).lean();

  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: 'No category with that ID' });
  }
  const formattedCategory = formatMongoData(category);
  res.status(200).json({ success: true, category: formattedCategory });
});

// @desc    Update category
// @route   /api/category/id
// @method  Put
// @access  Private for admin and employee
const updateCategory = [
  scheduledStatusHandler, // Apply middleware here
  asyncHandler(async (req, res) => {
    const { categoryName, categoryStatus } = req.body;

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
    category.categoryStatus = categoryStatus;
    category.scheduledDate = req.body.scheduledDate; // Set or clear scheduledDate

    const updatedCategory = await category.save();

    res.status(200).json({
      success: true,
      message: 'Category updated',
      category: formatMongoData(updatedCategory.toObject()),
    });
  }),
];

// @desc    Delete category
// @route   /api/category/id
// @method  Delete
// @access  Private for admin
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
    });

    if (!category) {
      return res
        .status(404)
        .json({ message: t('categorieNotFound', req.lang) });
    }

    return res
      .status(200)
      .json({ success: true, message: t('categoryDeleted', req.lang) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export {
  checkScheduled,
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
};
