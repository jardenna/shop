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

    res
      .status(201)
      .json({ success: true, message: 'New category created', category });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
});

export { createCategory };
