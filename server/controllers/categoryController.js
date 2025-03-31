import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';
import formatMongoData from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';

// @desc    Get all Categories
// @route   /api/category
// @method  Get
// @access  Private for admin and employee
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const allCategories = await Category.find({}).lean();
    const formattedCategories = formatMongoData(allCategories);

    if (!allCategories?.length) {
      return res.status(400).json({ message: t('noData', req.lang) });
    }

    res.status(200).json(formattedCategories);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create category
// @route   /api/category
// @method  Post
// @access  Private for admin and employee
const createCategory = asyncHandler(async (req, res) => {
  try {
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
    if (category) {
      res.status(201).json({
        success: true,
        message: t('newCategoryCreated', req.lang),
        id: category._id,
        categoryName: category.categoryName,
        createdAt: category.createdAt,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
});
// @desc    Update category
// @route   /api/category/id
// @method  Put
// @access  Private for admin and employee
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryName } = req.body;

    const category = await Category.findOne({ _id: req.params.id });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: t('categorieNotFound', req.lang),
      });
    }

    category.categoryName = categoryName;

    const updatedCategory = await category.save();
    res.status(201).json({
      success: true,
      message: 'Category updated',
      updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

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

export { createCategory, deleteCategory, getAllCategories, updateCategory };
