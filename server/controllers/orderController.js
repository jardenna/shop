import { PAYMENT_STATUS, VAT_SHARE } from '../config/constants.js';
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

  const uniqueProductIds = [
    ...new Set(orderItems.map((orderItem) => orderItem.product)),
  ];

  const orderItemsMap = new Map(
    orderItems.map((orderItem) => [orderItem.product, orderItem]),
  );

  const databaseProducts = await Product.find({
    _id: {
      $in: uniqueProductIds,
    },
  }).lean();

  if (databaseProducts.length !== uniqueProductIds.length) {
    return res.status(404).json({
      success: false,
      message: t('productsNoLongerAvailable', req.lang),
    });
  }

  const productsWithDiscountedPrices = databaseProducts.map(
    (databaseProduct) => {
      const matchingOrderItem = orderItemsMap.get(
        databaseProduct._id.toString(),
      );

      if (!matchingOrderItem?.qty || matchingOrderItem.qty < 1) {
        return res.status(404).json({
          success: false,
          message: t('qtyMustBeAtLeast', req.lang),
        });
      }

      const discountedPrice =
        databaseProduct.price -
        (databaseProduct.price * databaseProduct.discount) / 100;

      const subtotal = discountedPrice * matchingOrderItem.qty;

      const calculatedTaxPrice = Math.round(subtotal * VAT_SHARE * 100) / 100;

      const noTax = subtotal - calculatedTaxPrice;

      return {
        productId: databaseProduct._id,
        productName: databaseProduct.productName,
        image: databaseProduct.images[0],
        price: discountedPrice,
        taxPrice: calculatedTaxPrice,
        subtotal,
        noTax,
        qty: matchingOrderItem.qty,
      };
    },
  );

  const itemPrice = productsWithDiscountedPrices.reduce(
    (totalPrice, productItem) => {
      return totalPrice + productItem.subtotal;
    },
    0,
  );

  const taxPrice = productsWithDiscountedPrices.reduce(
    (totalPrice, productItem) => {
      return totalPrice + productItem.taxPrice;
    },
    0,
  );

  const shippingPrice = itemPrice >= 1500 ? 0 : 49;

  const totalPrice = itemPrice + shippingPrice;

  const order = new Order({
    user: req.user._id,
    orderItems: productsWithDiscountedPrices,
    shippingAddress,
    paymentStatus: PAYMENT_STATUS.PENDING,
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
      message: t('orderAllreadyPaid', req.lang),
    });
  }

  const validationError = validateFakePayment(req.body);

  if (validationError) {
    order.paymentStatus = PAYMENT_STATUS.FAILED;

    await order.save();

    return res.status(400).json({
      success: false,
      message: validationError,
    });
  }

  const productIds = order.orderItems.map((item) => item.productId);

  const databaseProducts = await Product.find({
    _id: {
      $in: productIds,
    },
  });

  for (const databaseProduct of databaseProducts) {
    const matchingOrderItem = order.orderItems.find((orderItem) => {
      return orderItem.productId.toString() === databaseProduct._id.toString();
    });

    if (databaseProduct.countInStock < matchingOrderItem.qty) {
      order.paymentStatus = PAYMENT_STATUS.FAILED;

      await order.save();

      return res.status(400).json({
        success: false,
        message: `${databaseProduct.productName} is out of stock`,
      });
    }
  }

  for (const databaseProduct of databaseProducts) {
    const matchingOrderItem = order.orderItems.find((orderItem) => {
      return orderItem.productId.toString() === databaseProduct._id.toString();
    });

    databaseProduct.countInStock -= matchingOrderItem.qty;

    await databaseProduct.save();
  }

  order.isPaid = true;
  order.paymentStatus = PAYMENT_STATUS.PAID;
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

// @desc    Deliver order
// @route   /api/orders/:id/deliver
// @method  Put
// @access  Private for admin and employee
const deliverOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: t('couldNotFindInfo', req.lang),
    });
  }

  if (!order.isPaid) {
    return res.status(400).json({
      success: false,
      message: t('orderNotPaid', req.lang),
    });
  }

  if (order.isDelivered) {
    return res.status(400).json({
      success: false,
      message: t('orderAllreadyDelivered', req.lang),
    });
  }

  order.isDelivered = true;
  order.deliveredAt = new Date();
  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

export {
  createOrder,
  deliverOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  payOrder,
};
