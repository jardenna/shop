import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import SubCategory from '../models/subCategoryModel.js';
import formatMongoData from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';
import validateScheduledDate from '../utils/validateScheduledDate.js';

// @desc    Create SubCategory
// @route   /api/subcategories
// @method  Post
// @access  Private for admin and employee
const createSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryName, category, categoryStatus, scheduledDate } = req.body;

  // Validate category existence
  const mainCategory = await Category.findById(category);

  if (!mainCategory) {
    return res
      .status(400)
      .json({ success: false, message: 'Parent category does not exist' });
  }

  const validationResult = validateScheduledDate(categoryStatus, scheduledDate);
  if (!validationResult.success) {
    return res.status(400).json(validationResult);
  }

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

  const existingSubCategory = await SubCategory.findOne({
    subCategoryName: { $regex: new RegExp(`^${subCategoryName}$`, 'i') },
  });
  if (existingSubCategory) {
    return res
      .status(400)
      .json({ success: false, message: 'Subcategory already exists' });
  }

  const subCategoryData = { subCategoryName, category, categoryStatus };
  if (categoryStatus === 'Scheduled') {
    subCategoryData.scheduledDate = scheduledDate;
  }

  const subCategory = new SubCategory(subCategoryData);
  await subCategory.save();

  // Fetch the categoryName for the mainCategory field
  const mainCategoryData =
    await Category.findById(category).select('categoryName');

  res.status(201).json({
    id: subCategory._id,
    mainCategory: {
      id: mainCategoryData._id,
      categoryName: mainCategoryData.categoryName,
    },
    categoryName: subCategory.subCategoryName,
    categoryStatus: subCategory.categoryStatus || 'Inactive',
    scheduledDate: subCategory.scheduledDate,
    createdAt: subCategory.createdAt,
    updatedAt: subCategory.updatedAt,
    productCount: 0, // Default product count as 0 for a new subcategory
  });
});

// @desc    Get All SubCategories
// @route   /api/subcategories
// @method  Get
// @access  Public
const getAllSubCategories = asyncHandler(async (req, res) => {
  const now = new Date();

  // Automatically update "Scheduled" subcategories to "Published" if the date has passed
  const subCategoriesToUpdate = await SubCategory.find({
    categoryStatus: 'Scheduled',
    scheduledDate: { $lte: now },
  });

  for (const subCategory of subCategoriesToUpdate) {
    subCategory.categoryStatus = 'Published';
    subCategory.scheduledDate = undefined; // Clear the scheduledDate
    await subCategory.save();
  }

  // Fetch subcategories with product count and mainCategory details
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
      $lookup: {
        from: 'categories', // Collection name for categories
        localField: 'category',
        foreignField: '_id',
        as: 'mainCategory',
      },
    },
    {
      $unwind: {
        path: '$mainCategory',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        'mainCategory.id': '$mainCategory._id', // Add an `id` field in mainCategory
      },
    },
    {
      $project: {
        products: 0, // Exclude the products array from the response
        'mainCategory._id': 0, // Exclude the original `_id` field in mainCategory
        category: 0, // Exclude the `category` field from the response
      },
    },
  ]);

  const formattedCategories = formatMongoData(subCategories);
  res.json({
    success: true,
    subCategories: formattedCategories,
  });
});

// @desc    Get category by id
// @route   /api/category/id
// @method  Get
// @access  Public
const getSubCategoryById = asyncHandler(async (req, res) => {
  const category = await SubCategory.findById(req.params.id)
    .populate('category', 'categoryName categoryStatus')
    .lean();

  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: 'No subcategory with that ID' });
  }

  const productCount = await Product.countDocuments({
    subCategory: req.params.id,
  });

  const { category: mainCategory, ...rest } = category;

  res.status(200).json(
    formatMongoData({
      ...rest,
      mainCategory,
      productCount,
    }),
  );
});

// @desc    Update SubCategory
// @route   /api/subcategories/:id
// @method  Put
// @access  Private for admin and employee
const updateSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryName, category, categoryStatus, scheduledDate } = req.body;

  const subCategory = await SubCategory.findById(req.params.id);

  if (!subCategory) {
    return res.status(404).json({
      success: false,
      message: 'Subcategory not found',
    });
  }

  // Update only the provided fields
  if (subCategoryName) {
    subCategory.subCategoryName = subCategoryName;
  }

  if (category) {
    subCategory.category = category;
  }

  if (categoryStatus) {
    subCategory.categoryStatus = categoryStatus;

    const validationResult = validateScheduledDate(
      categoryStatus,
      scheduledDate,
    );
    if (!validationResult.success) {
      return res.status(400).json(validationResult);
    }

    if (categoryStatus === 'Scheduled' && scheduledDate) {
      subCategory.scheduledDate = scheduledDate;
    } else if (categoryStatus !== 'Scheduled') {
      subCategory.scheduledDate = undefined; // Clear scheduledDate if status is not "Scheduled"
    }
  }

  const updatedSubCategory = await subCategory.save();
  res.status(200).json({
    message: 'Subcategory updated',
    updatedSubCategory: {
      id: updatedSubCategory._id,
      subCategoryName: updatedSubCategory.subCategoryName,
      category: updatedSubCategory.category,
      categoryStatus: updatedSubCategory.categoryStatus,
      scheduledDate: updatedSubCategory.scheduledDate,
      createdAt: updatedSubCategory.createdAt,
      updatedAt: updatedSubCategory.updatedAt,
    },
  });
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
      message: t('deleteOrReassignCategory', req.lang),
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

export {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
};
