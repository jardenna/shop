import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import validateProduct from '../utils/validateProduct .js';

// @desc    Create Product
// @route   /api/products
// @method  Post
// @access  Private for admin and employee
const createProduct = asyncHandler(async (req, res) => {
  try {
    const error = validateProduct(req.body);
    if (error) {
      return res.json({ success: false, message: error });
    }

    const product = new Product({ ...req.body });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// @desc    Update product
// @route   /api/products/id
// @method  Put
// @access  Private for admin and employee
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const error = validateProduct(req.body);
    if (error) {
      return res.json({ success: false, message: error });
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      },
      { new: true },
    );
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// @desc    Delete product
// @route   /api/products/id
// @method  Put
// @access  Private for admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export { createProduct, deleteProduct, updateProduct };
