import { VAT_SHARE } from '../config/constants.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/ordersModel.js';
import Product from '../models/productModel.js';
import { formatMongoData } from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';
import { validateFakePayment } from '../utils/validateFakePayment.js';

// @desc    Create orders
// @route   /api/orders
// @method  Post
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: t('cartIsEmpty', req.lang),
    });
  }

  const productIds = orderItems.map((item) => item.product);

  const databaseProducts = await Product.find({
    _id: {
      $in: productIds,
    },
  });

  if (databaseProducts.length !== productIds.length) {
    return res.status(404).json({
      success: false,
      message: t('productsNoLongerAvailable', req.lang),
    });
  }

  const productsWithDiscountedPrices = databaseProducts.map(
    (databaseProduct) => {
      const matchingOrderItem = orderItems.find(
        (orderItem) => orderItem.product === databaseProduct._id.toString(),
      );

      const discountedPrice =
        databaseProduct.price -
        (databaseProduct.price * databaseProduct.discount) / 100;

      const subtotal = discountedPrice * matchingOrderItem.qty;
      const taxPrice = subtotal * VAT_SHARE;
      const noTax = subtotal - taxPrice;

      return {
        productId: databaseProduct._id,
        productName: databaseProduct.productName,
        image: databaseProduct.images[0],
        price: discountedPrice,
        taxPrice: Math.round(taxPrice * 100) / 100,
        subtotal,
        noTax,
        qty: matchingOrderItem.qty,
      };
    },
  );

  const itemPrice = productsWithDiscountedPrices.reduce((total, product) => {
    return total + product.subtotal;
  }, 0);

  const taxPrice = productsWithDiscountedPrices.reduce((total, product) => {
    return total + product.taxPrice;
  }, 0);

  const shippingPrice = itemPrice >= 1500 ? 0 : 49;
  const totalPrice = itemPrice + shippingPrice;

  const order = new Order({
    user: req.user._id,
    orderItems: productsWithDiscountedPrices,
    shippingAddress,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Get all orders
// @route   /api/orders
// @method  Get
// @access  Private for admin and employee
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate({
      path: 'user',
      select: '_id username',
    })
    .lean();

  res.status(200).json(formatMongoData(orders));
});

// @desc    Get order by Id
// @route   /api/orders/id
// @method  Get
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const currentUserRole = req.user.role;

  const order = await Order.findById(req.params.id)
    .populate({
      path: 'user',
      select: '_id username',
    })
    .lean();

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: t('couldNotFindInfo', req.lang) });
  }
  if (currentUserRole === 'User') {
    const orderBelongsToUser =
      order.user._id.toString() === req.user._id.toString();

    if (!orderBelongsToUser) {
      return res.status(403).json({
        success: false,
        message: t('notAuthorized', req.lang),
      });
    }
  }
  res.status(200).json(formatMongoData(order));
});

// @desc    Get orders as a user
// @route   /api/orders/me
// @method  Get
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).lean();

  res.status(200).json(formatMongoData(orders));
});

// @desc    Pay order
// @route   /api/orders/:id/pay
// @method  Put
// @access  Private
const payOrder = asyncHandler(async (req, res) => {
  const { paymentMethod } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: t('couldNotFindInfo', req.lang),
    });
  }

  const orderBelongsToUser = order.user.toString() === req.user._id.toString();

  if (!orderBelongsToUser) {
    return res.status(403).json({
      success: false,
      message: t('notAuthorized', req.lang),
    });
  }

  if (order.isPaid) {
    return res.status(400).json({
      success: false,
      message: 'order already paid',
    });
  }

  const validationError = validateFakePayment(req.body);

  if (validationError) {
    return res.status(400).json({
      success: false,
      message: validationError,
    });
  }

  order.isPaid = true;
  order.paidAt = new Date();
  order.paymentMethod = paymentMethod;
  order.paymentResult = {
    id: crypto.randomUUID(),
    status: 'Completed',
    updateTime: new Date(),
    email: req.user.email,
  };

  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

export { createOrder, getAllOrders, getOrderById, getUserOrders, payOrder };
