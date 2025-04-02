import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Create Product
// @route   /api/products
// @method  Post
// @access  Private for admin and employee
const createProduct = asyncHandler(async (req, res) => {
  try {
    const { brand, description, price, category, productName, quantity } =
      req.body;

    switch (true) {
      case !productName:
        return res.json({ succes: false, message: 'Product name is requered' });
      case !description:
        return res.json({ succes: false, message: 'Description is requered' });
      case !price:
        return res.json({ succes: false, message: 'Price name is requered' });
      case !category:
        return res.json({
          succes: false,
          message: 'Category name is requered',
        });
      case !quantity:
        return res.json({
          succes: false,
          message: 'Quantity name is requered',
        });
      case !brand:
        return res.json({ succes: false, message: 'Brand name is requered' });
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
  } catch (error) {
    res.status(400).json(error.message);
  }
  const id = req.params.id;
  console.log(id);
});

// @desc    Delete product
// @route   /api/products/id
// @method  Put
// @access  Private for admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json(error.message);
  }
  const id = req.params.id;
  console.log(id);
});

export { createProduct, deleteProduct, updateProduct };
