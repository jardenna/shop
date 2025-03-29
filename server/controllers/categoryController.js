import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';
import { t } from '../utils/translator.js';

// @desc    Create category
// @route   /api/category
// @method  Post
// @access  Private for admin and employee
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({
        success: false,
        message: 'Name is required',
      });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.json({
        success: false,
        message: t('categorieAlreadyExist', req.lang),
      });
    }
    const category = await new Category({ name }).save();

    if (category) {
      res.status(201).json({
        success: true,
        message: 'New category created',
        id: category._id,
        name: category.name,
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

// @desc    Create category
// @route   /api/category/id
// @method  Put
// @access  Private for admin and employee
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findOne({ id: categoryId });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: t('categorieNotFound', req.lang),
      });
    }

    category.name = name;

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

export { createCategory, updateCategory };
