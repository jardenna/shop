import {
  allowedStatusTransitions,
  DELIVERY_STATUS,
  DELIVERY_STATUS_ENUM,
} from '../config/constants.js';
import { PAYMENT_STATUS } from '../config/paymentConstants.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import { cancelOrderService } from '../services/cancelOrderService.js';
import { sortColumns } from '../utils/sortColumns.js';
import { t } from '../utils/translator.js';

// @desc    Get all orders
// @route   /api/orders
// @method  GET
// @access  Private for admin and employees
const getAllOrders = asyncHandler(async (req, res) => {
  const { page, ordersPerPage } = req.pagination;
  const filter = req.filter;

  const sortField = req.query.sortField;
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

  const orders = await Order.find(filter || {})
    .select([
      '_id',
      'createdAt',
      'orderItems',
      'summary.totalPrice',
      'payment.method',
      'payment.status',
      'delivery.status',
    ])
    .populate({
      path: 'user',
      select: '_id username',
    })
    .sort({ createdAt: -1 });

  const orderSortFields = {
    customer: 'user.username',
    totalPrice: 'summary.totalPrice',
    paymentMethod: 'payment.method',
    paymentStatus: 'payment.status',
    deliveryStatus: 'delivery.status',
  };

  const sortedOrders = sortColumns({
    collection: orders,
    sortField: orderSortFields[sortField] ?? 'createdAt',
    sortOrder,
    language: req.lang,
  });

  const startIndex = ordersPerPage * (page - 1);
  const paginatedOrders = sortedOrders.slice(
    startIndex,
    startIndex + ordersPerPage,
  );

  res.status(200).json({
    success: true,
    orders: paginatedOrders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt,
      customer: order.user?.username ?? '',
      totalPrice: order.summary.totalPrice,
      paymentMethod: order.payment.method,
      paymentStatus: order.payment.status,
      deliveryStatus: order.delivery.status,
    })),
    page,
    pages: Math.ceil(sortedOrders.length / ordersPerPage),
    orderCount: sortedOrders.length,
  });
});

// @desc    Get admin order by ID
// @route   /api/admin/orders/:id
// @method  GET
// @access  Private for admin and employees
const getAdminOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate({
    path: 'user',
    select: '_id username',
  });

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: t('orderNotFound', req.lang) });
  }

  res.status(200).json(order);
});

// @desc    Update order status
// @route   /api/admin/orders/:id/status
// @method  PATCH
// @access  Private for admin and employees
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const isValidStatus = DELIVERY_STATUS_ENUM.includes(status);

  if (!isValidStatus) {
    return res.status(400).json({
      success: false,
      message: t('invalidOrderStatus', req.lang),
    });
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: t('orderNotFound', req.lang) });
  }
  const currentStatus = order.delivery.status;
  const allowedStatuses = allowedStatusTransitions[currentStatus] ?? [];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: t('orderStatusUpdateNotAllowed', req.lang),
    });
  }

  res.send(order);
  // res.status(200).json(order);
});

// @desc    Cancel order
// @route   /api/admin/orders/:id/cancel
// @method  PATCH
// @access  Private for admin and employees
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: t('orderNotFound', req.lang) });
  }
  const cancelled = await cancelOrderService(order, req.user._id);
  if (!cancelled) {
    return res.status(400).json({
      success: false,
      message: t('orderCancellationNotAllowed', req.lang),
    });
  }

  res.status(200).json(order);
});

// @desc    Deliver order
// @route   /api/admin/orders/:id/deliver
// @method  PATCH
// @access  Private for admin and employees
const deliverOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: t('orderNotFound', req.lang),
    });
  }

  if (order.payment.status !== PAYMENT_STATUS.COMPLETED) {
    return res.status(400).json({
      success: false,
      message: t('orderNotPaid', req.lang),
    });
  }

  if (order.delivery.status === DELIVERY_STATUS.DELIVERED) {
    return res.status(400).json({
      success: false,
      message: t('orderAllreadyDelivered', req.lang),
    });
  }

  // if (order.delivery.status !== DELIVERY_STATUS.SHIPPED) {
  //   return res.status(400).json({
  //     success: false,
  //     message: t('orderMustBeShippedFirst', req.lang),
  //   });
  // }

  const statusHistory = {
    status: order.delivery.status,
    changedAt: order.createdAt,
    changedBy: order.user,
  };

  order.delivery.status = DELIVERY_STATUS.DELIVERED;
  order.delivery.deliveredAt = new Date();
  order.delivery.statusHistory.push(statusHistory);
  const delivery = order.delivery;

  res.send(delivery);

  // const updatedOrder = await order.save();

  // res.status(200).json(updatedOrder);
});

export {
  cancelOrder,
  deliverOrder,
  getAdminOrderById,
  getAllOrders,
  updateOrderStatus,
};
