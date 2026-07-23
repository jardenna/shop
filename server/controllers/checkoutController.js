import { PAYMENT_METHODS1 } from '../config/paymentConstants.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/cartModel.js';
import User from '../models/userModel.js';
import { buildCartData } from '../services/buildCartData.js';
import { getActiveDiscount } from '../services/getActiveDiscount.js';
import { getAddressLabel } from '../utils/addressUtils.js';
import { t } from '../utils/translator.js';

// @desc    Get checkout
// @route   GET /api/checkout
// @access  Private
const getCheckout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('addresses role');

  const addresses = user.addresses.map((address) => ({
    ...address.toObject(),
    label: getAddressLabel(address.standardAddress),
  }));

  const cart = await Cart.findOne({
    user: req.user._id,
  }).lean();

  if (!cart) {
    return res.status(200).json({
      cartItems: [],
      addresses,
    });
  }

  const activeDiscount = getActiveDiscount(user.role, cart.discount?.code);

  const cartData = await buildCartData({
    cart,
    promoDiscountPercent: activeDiscount.percent,
  });

  if (!cartData.success) {
    return res.status(500).json({
      success: false,
      message: t('productsNoLongerAvailable', req.lang),
    });
  }

  return res.status(200).json({
    addresses,
    cartItems: cartData.orderItems,
    summary: cartData.summary,
    discount: activeDiscount,
    paymentMethod1: PAYMENT_METHODS1,
  });
});

export { getCheckout };
