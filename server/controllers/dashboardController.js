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
  const { goals } = req.body;

  if (!goals || typeof goals !== 'object' || Array.isArray(goals)) {
    return res.status(400).json({
      success: false,
      message: t('pleaseEnterValidGoal', req.lang),
    });
  }

  const goalKeys = Object.keys(goals);

  if (
    goalKeys.length !== KPI.length ||
    !goalKeys.every((key) => KPI.includes(key))
  ) {
    return res.status(400).json({
      success: false,
      message: t('pleaseEnterValidGoal', req.lang),
    });
  }

  for (const key of KPI) {
    const periods = goals[key];

    if (!periods || typeof periods !== 'object' || Array.isArray(periods)) {
      return res.status(400).json({
        success: false,
        message: t('pleaseEnterValidPeriod', req.lang),
      });
    }

    const periodKeys = Object.keys(periods);

    if (
      periodKeys.length !== GOAL_DAYS.length ||
      !periodKeys.every((day) => GOAL_DAYS.includes(Number(day)))
    ) {
      return res.status(400).json({
        success: false,
        message: t('pleaseEnterValidPeriod', req.lang),
      });
    }

    for (const goal of Object.values(periods)) {
      if (typeof goal !== 'number' || !Number.isFinite(goal) || goal < 0) {
        return res.status(400).json({
          success: false,
          message: t('pleaseEnterValidGoal', req.lang),
        });
      }
    }
  }

  const updatedDashboard = await Dashboard.findOneAndUpdate(
    { main: 'main' },
    {
      $set: { goals },
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
    goals: updatedDashboard.goals,
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
  console.log(req.period);

  res.status(200).json({ count });
});

// @desc    Get Top selling Products
// @route   /api/dashboard/products/top-selling
// @method  Get
// @access  Private for admin and employees
const getTopSellingProducts = asyncHandler(async (req, res) => {
  const orders = await Order.find().select('orderItems');

  res.send(orders);
});

// @desc    Get Top Products
// @route   /api/dashboard/products/top
// @method  Get
// @access  Private for admin and employees
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
// @access  Private for admin and employees
const getNewProducts = asyncHandler(async (req, res) => {
  // if no new in 1 month show no new products within the last month
  const products = await Product.find({ productStatus: PUBLISHED })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  res.status(200).json(products);
});

// @desc    Get total KPIs
// @route   GET /api/dashboard/total-kpi
// @method  GET
// @access  Private (admin and employees)
const getTotalKpi = asyncHandler(async (req, res) => {
  const orders = await Order.find().select('summary createdAt');

  const userCount = await User.countDocuments({
    role: ROLES.USER,
  });

  const orderCount = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) => total + order.summary.totalPrice,
    0,
  );

  res.send({
    totals: [
      {
        key: 'totalCustomers',
        title: 'totalCustomers',
        description: 'totalCustomersDescription',
        total: userCount,
        chartData: [],
      },
      {
        key: 'totalRevenue',
        title: 'totalRevenue',
        description: 'totalRevenueDescription',
        total: totalRevenue,
        chartData: [],
      },
      {
        key: 'totalOrders',
        title: 'totalOrders',
        description: 'totalOrdersDescription',
        total: orderCount,
        chartData: [],
      },
    ],
  });
});

// @desc    Get total KPIs
// @route   GET /api/dashboard/period-kpi
// @method  GET
// @access  Private (admin and employees)
const getPeriodKpi = asyncHandler(async (req, res) => {
  const orders = await Order.find().select('summary createdAt');

  res.send(orders);
});

export {
  createGoals,
  getGoals,
  getNewestCustomers,
  getNewProducts,
  getPeriodKpi,
  getTopProducts,
  getTopSellingProducts,
  getTotalKpi,
  updateGoals,
};
