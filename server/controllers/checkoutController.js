import { PROMO_CODES } from '../config/constants.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/cartModel.js';
import User from '../models/userModel.js';
import { buildCartData } from '../services/buildCartData.js';

// @desc    Get checkout
// @route   GET /api/checkout
// @access  Private
const getCheckout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('addresses role');

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

  const promoDiscount = () => {
    if (user.role === 'Employee') {
      return { percent: 15, label: 'employee' };
    }

    const promoCode = PROMO_CODES.find(
      ({ code }) => code === req.query.promoCode,
    );

    if (promoCode) {
      return {
        percent: promoCode.percent,
        label: promoCode.label,
      };
    }

    return { percent: 0, label: '' };
  };

  const activeDiscount = promoDiscount().percent;

  const cartData = await buildCartData({
    cart,
    promoDiscountPercent: activeDiscount,
  });

  if (!cartData.success) {
    return res.status(500).json({
      success: false,
      message: t('productsNoLongerAvailable', req.lang),
    });
  }

  return res.status(200).json({
    addresses: user.addresses,
    cartItems: cartData.orderItems,
    summary: cartData.summary,
    discount: promoDiscount(),
  });
});

export { getCheckout };
