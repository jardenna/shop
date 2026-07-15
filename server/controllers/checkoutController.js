import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/cartModel.js';
import User from '../models/userModel.js';
import { buildOrderItems } from '../services/buildOrderItems.js';
import { calculateCartSummary } from '../services/calculateCartSummary.js';
import { getProductsMap } from '../utils/cartUtils.js';

// @desc    Get checkout
// @route   GET /api/checkout
// @access  Private
const getCheckout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('addresses').lean();

  if (!user?.addresses.length) {
    return res.status(400).json({
      success: false,
      message: t('noAddressData', req.lang),
    });
  }

  const cart = await Cart.findOne({
    user: req.user._id,
  }).lean();

  if (!cart) {
    return res.status(200).json({
      cartItems: [],
      addresses: user.addresses,
    });
  }

  const productMap = await getProductsMap({
    productIds: cart.cartItems.map(({ productId }) => productId.toString()),
  });

  const missingProduct = cart.cartItems.find(
    (cartItem) => !productMap.has(cartItem.productId.toString()),
  );

  if (missingProduct) {
    return res.status(500).json({
      success: false,
      message: t('productsNoLongerAvailable', req.lang),
    });
  }

  const cartItems = buildOrderItems({
    databaseProducts: [...productMap.values()],
    productItems: cart.cartItems,
  });

  const summary = calculateCartSummary(cartItems);

  return res.status(200).json({
    addresses: user.addresses,
    cartItems,
    summary,
  });
});

export { getCheckout };
