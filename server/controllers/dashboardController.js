import { GOAL_DAYS, KPI, PUBLISHED, ROLES } from '../config/constants.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Dashboard from '../models/dashboardModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { getDashboardDayRange } from '../utils/dateUtils.js';
import { t } from '../utils/translator.js';

// @desc    Create goals
// @route   /api/dashboard/goals
// @method  Post
// @access  Private for admin and employees
const createGoals = asyncHandler(async (req, res) => {
  const dashboard = await Dashboard.findOneAndUpdate(
    { main: 'main' },
    { $setOnInsert: { main: 'main' } },
    {
      upsert: true,
      returnDocument: 'after',
      setDefaultsOnInsert: true,
    },
  );

  res.status(200).json({
    success: true,
    dashboard,
  });
});

// @desc    Get goals
// @route   /api/dashboard/goals
// @method  Get
// @access  Private for admin and employees
const getGoals = asyncHandler(async (req, res) => {
  const dashboard = await Dashboard.findOne({ main: 'main' });

  res.status(200).json(dashboard);
});

// @desc    Update goals
// @route   /api/dashboard/goals
// @method  Patch
// @access  Private for admin and employees
const updateGoals = asyncHandler(async (req, res) => {
  const { key, days, goal } = req.body;
  const period = Number(days);

  if (!KPI.includes(key) || !GOAL_DAYS.includes(period)) {
    return res.status(400).json({
      success: false,
      message: t('pleaseEnterValidPeriod', req.lang),
    });
  }

  if (typeof goal !== 'number' || !Number.isFinite(goal) || goal < 0) {
    return res.status(400).json({
      success: false,
      message: t('pleaseEnterValidGoal', req.lang),
    });
  }

  const updatedDashboard = await Dashboard.findOneAndUpdate(
    { main: 'main' },
    {
      $set: {
        [`goals.${key}.${period}`]: goal,
      },
    },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );

  if (!updatedDashboard) {
    return res.status(404).json({
      success: false,
      message: t('dashboardNotFound', req.lang),
    });
  }

  res.status(200).json({
    success: true,
    goal: updatedDashboard.goals[key][period],
  });
});

// @desc    Get 5 newest customers
// @route   /api/dashboard/new-custormers/id
// @method  Get
// @access  Private for admin and employees
const getNewestCustomers = asyncHandler(async (req, res) => {
  const period = getDashboardDayRange(req.period);
  const count = await User.countDocuments({
    role: ROLES.USER,
    createdAt: period,
  });

  res.status(200).json({ count });
});

// @desc    Get Top selling Products
// @route   /api/dashboard/products/top-selling
// @method  Get
// @access  Public
const getTopSellingProducts = asyncHandler(async (req, res) => {
  const orders = await Order.find().select('orderItems');

  // const products = await Product.find()
  //   .select('productName images')
  //   .sort({ createdAt: -1 })
  //   .limit(5)
  //   .lean();

  // console.log(products);

  res.send(orders);
  // res.status(200).json(products);
});

// @desc    Get Top Products
// @route   /api/dashboard/products/top
// @method  Get
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ productStatus: PUBLISHED })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  res.status(200).json(products);
});

// @desc    Get New Products
// @route   /api/dashboard/products/new
// @method  Get
// @access  Public
const getNewProducts = asyncHandler(async (req, res) => {
  // if no new in 1 month show no new products within the last month
  const products = await Product.find({ productStatus: PUBLISHED })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  res.status(200).json(products);
});
export {
  createGoals,
  getGoals,
  getNewestCustomers,
  getNewProducts,
  getTopProducts,
  getTopSellingProducts,
  updateGoals,
};

// -mangler afsendelse  alt minus levering og afsendt
// - annullerede order
// ordre qty

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
