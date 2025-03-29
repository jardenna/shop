// import Category from '../models/categoryModel.js'
import asyncHandler from '../middleware/asyncHandler.js';

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
});

export { createCategory };
