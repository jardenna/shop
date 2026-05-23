import { VAT_SHARE } from '../config/constants.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/ordersModel.js';
import Product from '../models/productModel.js';
import { formatMongoData } from '../utils/formatMongoData.js';

// @desc    Create orders
// @route   /api/orders
// @method  Post
// @access  Public for logged-in users
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, paymentMethod, shippingAddress } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No order items',
    });
  }

  const productIds = orderItems.map((item) => item.product);

  const databaseProducts = await Product.find({
    _id: {
      $in: productIds,
    },
  });

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
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(formatMongoData(createdOrder));
});

// @desc    Get all orders
// @route   /api//orders
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

export { createOrder, getAllOrders };
