import { ROLES } from '../config/constants.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

// @desc    Get new users
// @route   /api/dashboard/new-custormers
// @method  Get
// @access  Private for admin and employees
const getNewestCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({
    role: ROLES.USER,
  })
    .select('role username')
    .sort({ createdAt: -1 })
    .limit(5);

  res.send(customers);
});

// @desc    Get Top Products
// @route   /api/products/top
// @method  Get
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5).lean();

  res.status(200).json(products);
});

// @desc    Get New Products
// @route   /api/products/new
// @method  Get
// @access  Public
const getNewProducts = asyncHandler(async (req, res) => {
  // if no new in 1 month show no new products within the last month
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  res.status(200).json(products);
});

export { getNewestCustomers, getNewProducts, getTopProducts };

// -mangler afsendelse  alt minus levering og afsendt
// - annullerede order
// ordre qty

// newProducts: {
//   productName: { type: String, required: true },
//   image: { type: String, required: true },
// },
// mostSellingProducts: {
//   productName: { type: String, required: true },
//   image: { type: String, required: true },
//   salesNumber: {
//     type: Number,
//     required: true,
//   },
// },

// deliveryStatus: {},
// productLowQty: {},
