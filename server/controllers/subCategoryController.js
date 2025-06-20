import asyncHandler from '../middleware/asyncHandler.js';
import scheduledStatusHandler from '../middleware/scheduledStatusHandler.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import SubCategory from '../models/subCategoryModel.js';
import formatMongoData from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';
import { updateScheduledItems } from '../utils/UpdateScheduledItemsOptions.js';
import validateScheduledDate from '../utils/validateScheduledDate.js';

// @desc    Create SubCategory
// @route   /api/subcategories
// @method  Post
// @access  Private for admin and employee
const createSubCategory = [
  scheduledStatusHandler('categoryStatus'),
  asyncHandler(async (req, res) => {
    const { subCategoryName, category, categoryStatus, scheduledDate } =
      req.body;

    const validationResult = validateScheduledDate(
      categoryStatus,
      scheduledDate,
      req.lang,
    );

    if (!validationResult.success) {
      return res.status(400).json(validationResult);
    }

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
  const { id } = req.params;

  const category = await SubCategory.findById(id)
    .populate('category', 'categoryName categoryStatus') // Populate parent category details
    .lean();

  if (!category) {
    return res.status(404).json({
      success: false,
      message: t('couldNotFindInfo', req.lang),
    });
  }

  // Check if subcategory have attached products. If so it is not allowed to delete the subcategory
  const productCount = await Product.countDocuments({
    subCategory: id,
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
  scheduledStatusHandler('categoryStatus'),
  asyncHandler(async (req, res) => {
    const { subCategoryName, category, categoryStatus, scheduledDate } =
      req.body;
    const validationResult = validateScheduledDate(
      categoryStatus,
      scheduledDate,
      req.lang,
    );
    if (!validationResult.success) {
      return res.status(400).json(validationResult);
    }
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
        scheduledDate,
      },
      { new: true },
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
        from: 'categories',
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
        categoryId: '$_id',
        parentCategoryName: '$parentCategory.categoryName',
        _id: 0,
      },
    },
  ]);

  res.status(200).json(subCategories);
});

// @desc    Get sub cat items if main cat is published
// @route   /api/subcategories//menu/?parentCategoryName=Kids
// @method  Get
// @access  Public
const getMenuByParentCategory = asyncHandler(async (req, res) => {
  const { parentCategoryName } = req.query;

  const subCategories = await SubCategory.find({ categoryStatus: 'Published' })
    .populate('category', 'categoryName')
    .lean();

  // Filter by parent category name

  const priorityOrder = ['clothing', 'shoes', 'accessoriesAndToys'];

  const menu = subCategories
    .filter(
      (sub) =>
        sub.category?.categoryName?.toLowerCase() ===
        parentCategoryName?.toLowerCase(),
    )
    .map((sub) => ({
      label: t(sub.translationKey, req.lang) || t(sub.translationKey, 'en'),
      translationKey: sub.translationKey,
      categoryId: sub._id,
    }))
    .sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.translationKey);
      const bIndex = priorityOrder.indexOf(b.translationKey);

      const aInPriority = aIndex !== -1;
      const bInPriority = bIndex !== -1;

      if (aInPriority && bInPriority) return aIndex - bIndex;
      if (aInPriority) return -1;
      if (bInPriority) return 1;

      // fallback: sort by translated label
      return a.label.localeCompare(b.label);
    })
    .map(({ label, categoryId }) => ({ label, categoryId }));

  res.status(200).json({ success: true, data: menu });
});

export {
  checkScheduled,
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getMenuByParentCategory,
  getSubCategoriesWithParent,
  getSubCategoryById,
  updateSubCategory,
};
