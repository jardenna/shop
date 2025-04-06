import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import SubCategory from '../models/subCategoryModel.js';
import validateScheduledDate from '../utils/validateScheduledDate.js';

// @desc    Create SubCategory
// @route   /api/subcategories
// @method  Post
// @access  Private for admin and employee
const createSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryName, category, categoryStatus, scheduledDate } = req.body;

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

  const subCategoryExists = await SubCategory.findOne({ subCategoryName });
  if (subCategoryExists) {
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

  res.status(201).json({
    message: 'New subcategory created',
    id: subCategory._id,
    subCategoryName: subCategory.subCategoryName,
    category: subCategory.category,
    categoryStatus: subCategory.categoryStatus || 'Inactive',
    scheduledDate: subCategory.scheduledDate,
    createdAt: subCategory.createdAt,
  });
});

// @desc    Get All SubCategories
// @route   /api/subcategories
// @method  Get
// @access  Public
const getSubCategories = asyncHandler(async (req, res) => {
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

  // Fetch subcategories with product count
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

// @desc    Get all SubCategories
// @route   /api/subcategories
// @method  Get
// @access  Public
const getAllSubCategories = asyncHandler(async (req, res) => {
  const allSubCategories = await SubCategory.find({})
    .populate('category')
    .lean();

  // Automatically update "Scheduled" subcategories to "Published" if the date has passed
  const now = new Date();
  const updatedSubCategories = await Promise.all(
    allSubCategories.map(async (subCategory) => {
      if (
        subCategory.categoryStatus === 'Scheduled' &&
        subCategory.scheduledDate <= now
      ) {
        await SubCategory.findByIdAndUpdate(subCategory._id, {
          categoryStatus: 'Published',
          scheduledDate: undefined, // Clear the scheduledDate
        });
        subCategory.categoryStatus = 'Published';
        subCategory.scheduledDate = undefined;
      }
      return subCategory;
    }),
  );

  if (!updatedSubCategories?.length) {
    return res.status(404).json({ message: 'No subcategories found' });
  }

  res.status(200).json(updatedSubCategories);
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
  if (subCategoryName !== undefined) {
    subCategory.subCategoryName = subCategoryName;
  }

  if (category !== undefined) {
    subCategory.category = category;
  }

  if (categoryStatus !== undefined) {
    subCategory.categoryStatus = categoryStatus;

    const validationResult = validateScheduledDate(
      categoryStatus,
      scheduledDate,
    );
    if (!validationResult.success) {
      return res.status(400).json(validationResult);
    }

    if (categoryStatus === 'Scheduled' && scheduledDate !== undefined) {
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

export {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategories,
  updateSubCategory,
};
