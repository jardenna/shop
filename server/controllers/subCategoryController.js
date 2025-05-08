import asyncHandler from '../middleware/asyncHandler.js';
import scheduledStatusHandler from '../middleware/scheduledStatusHandler.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import SubCategory from '../models/subCategoryModel.js';
import formatMongoData from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';
import { updateScheduledItems } from '../utils/UpdateScheduledItemsOptions.js';

// @desc    Create SubCategory
// @route   /api/subcategories
// @method  Post
// @access  Private for admin and employee
const createSubCategory = [
  scheduledStatusHandler('categoryStatus'),
  asyncHandler(async (req, res) => {
    const { subCategoryName, category } = req.body;

    // Validate category existence
    const mainCategory = await Category.findById(category);

    if (!mainCategory) {
      return res
        .status(400)
        .json({ success: false, message: 'Parent category does not exist' });
    }

    if (!subCategoryName) {
      return res.status(400).json({
        success: false,
        message: t('pleaseEnterCategoryName', req.lang),
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required',
      });
    }

    const subCategoryData = { subCategoryName, category, ...req.body };

    const subCategory = new SubCategory(subCategoryData);
    await subCategory.save();

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
      productCount: 0,
    });
  }),
];

// @desc    Get All SubCategories
// @route   /api/subcategories
// @method  Get
// @access  Public
const getAllSubCategories = asyncHandler(async (req, res) => {
  const allSubCategories = await SubCategory.find({}).lean();

  await updateScheduledItems({
    items: allSubCategories,
    model: SubCategory,
    statusKey: 'categoryStatus',
  });

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
        mainCategoryName: '$mainCategory.categoryName',
      },
    },
    {
      $lookup: {
        from: 'categories',
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
        'mainCategory.id': '$mainCategory._id',
        mainCategoryName: '$mainCategory.categoryName',
      },
    },
    {
      $project: {
        products: 0,
        'mainCategory._id': 0,
        category: 0,
      },
    },
  ]);

  const formattedCategories = formatMongoData(subCategories);

  if (!subCategories?.length) {
    return res.status(404).json({ message: t('noData', req.lang) });
  }

  res.status(200).json({
    success: true,
    subCategories: formattedCategories,
  });
});

// @desc    Check if category is scheduled
// @route   /api/scheduled
// @method  Get
// @access  Public
const checkScheduled = asyncHandler(async (req, res) => {
  const now = new Date();

  const hasScheduled = await SubCategory.exists({
    categoryStatus: 'Scheduled',
    scheduledDate: { $lte: now },
  });

  res.status(200).json({ hasScheduled: !!hasScheduled });
});

// @desc    Get category by id
// @route   /api/category/id
// @method  Get
// @access  Public
const getSubCategoryById = asyncHandler(async (req, res) => {
  const category = await SubCategory.findById(req.params.id)
    .populate('category', 'categoryName categoryStatus') // Populate parent category details
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
const updateSubCategory = [
  scheduledStatusHandler('categoryStatus'), // Pass the field name
  asyncHandler(async (req, res) => {
    const { subCategoryName, category, categoryStatus, scheduledDate } =
      req.body;

    // Validate category existence
    if (category) {
      const mainCategory = await Category.findById(category);
      if (!mainCategory) {
        return res
          .status(400)
          .json({ success: false, message: 'Parent category does not exist' });
      }
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      {
        ...(subCategoryName && { subCategoryName }),
        ...(category && { category }),
        ...(categoryStatus && { categoryStatus }),
        scheduledDate, // Can be set or cleared
      },
      { new: true }, // Return the updated document
    );

    if (!updatedSubCategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found',
      });
    }

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
  }),
];

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
      message: t('categoryNotFound', req.lang),
    });
  }

  res.status(200).json({
    success: true,
    message: 'SubCategory deleted successfully',
  });
});

// @desc    Get subcategories with parent category
// @route   /api/subcategories/with-parent
// @method  Get
// @access  Private for employees
const getSubCategoriesWithParent = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.aggregate([
    {
      $lookup: {
        from: 'categories', // Collection name for categories
        localField: 'category',
        foreignField: '_id',
        as: 'parentCategory',
      },
    },
    {
      $unwind: {
        path: '$parentCategory',
        preserveNullAndEmptyArrays: true, // Allow subcategories without a parent category
      },
    },
    {
      $project: {
        categoryStatus: '$categoryStatus',
        label: '$subCategoryName',
        value: '$_id',
        parentCategoryName: '$parentCategory.categoryName',
        _id: 0,
      },
    },
  ]);

  res.status(200).json(subCategories);
});

export {
  checkScheduled,
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoriesWithParent,
  getSubCategoryById,
  updateSubCategory,
};
