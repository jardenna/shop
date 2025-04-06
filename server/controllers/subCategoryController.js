import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import SubCategory from '../models/subCategoryModel.js';

// @desc    Create SubCategory
// @route   POST /api/subcategories
// @access  Private for admin and employee
const createSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryName, category } = req.body;

  if (!subCategoryName) {
    return res.status(400).json({
      success: false,
      message: 'Subcategory name is required',
    });
  }

  if (!category) {
    return res.status(400).json({
      success: false,
      message: 'Category name is required',
    });
  }

  const subCategoryExists = await SubCategory.findOne({ subCategoryName });
  if (subCategoryExists) {
    return res
      .status(400)
      .json({ success: false, message: 'Subcategory already exists' });
  }

  const subCategory = new SubCategory({ subCategoryName, category });
  await subCategory.save();

  res.status(201).json(subCategory);
});

// @desc    Get All SubCategories
// @route   GET /api/subcategories
// @access  Public
const getSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.aggregate([
    {
      $lookup: {
        from: 'products', // Collection name for products
        localField: '_id',
        foreignField: 'subCategory',
        as: 'products',
      },
    },
    {
      $addFields: {
        productCount: { $size: '$products' },
      },
    },
    {
      $project: {
        products: 0, // Exclude the products array from the response
      },
    },
  ]);

  res.json(subCategories);
});

// @desc    Delete SubCategory
// @route   /api/subcategories/:id
// @method  Delete
// @access  Private for admin
const deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategoryId = req.params.id;

  // Check if any products are associated with this subcategory
  const products = await Product.find({ subCategory: subCategoryId });
  if (products.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Cannot delete subcategory. Products are associated with it.',
    });
  }

  // Proceed with deletion if no products are associated
  const subCategory = await SubCategory.findByIdAndDelete(subCategoryId);
  if (!subCategory) {
    return res.status(404).json({
      success: false,
      message: 'SubCategory does not exist',
    });
  }

  res.json({ success: true, message: 'SubCategory deleted successfully' });
});

export { createSubCategory, deleteSubCategory, getSubCategories };
