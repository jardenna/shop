import asyncHandler from '../middleware/asyncHandler.js';
import SubCategory from '../models/subCategoryModel.js';

// @desc    Create SubCategory
// @route   POST /api/subcategories
// @access  Private for admin
const createSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryName, category } = req.body;

  if (!subCategoryName || !category) {
    return res.status(400).json({
      success: false,
      message: 'subCategoryName and category are required',
    });
  }

  const subCategoryExists = await SubCategory.findOne({ subCategoryName });
  if (subCategoryExists) {
    return res
      .status(400)
      .json({ success: false, message: 'SubCategory already exists' });
  }

  const subCategory = new SubCategory({ subCategoryName, category });
  await subCategory.save();

  res.status(201).json(subCategory);
});

// @desc    Get All SubCategories
// @route   GET /api/subcategories
// @access  Public
const getSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.find().populate('category').lean();
  res.json(subCategories);
});

// @desc    Delete SubCategory
// @route   /api/subcategories/:id
// @method  Delete
// @access  Private for admin
const deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
  if (!subCategory) {
    return res
      .status(404)
      .json({ success: false, message: 'SubCategory does not exists' });
  }

  res.json({ message: 'subCategory deleted successfully' });
});

export { createSubCategory, deleteSubCategory, getSubCategories };
