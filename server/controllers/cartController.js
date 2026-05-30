import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import { t } from '../utils/translator.js';

// @desc    Create cart
// @route   /api/cart
// @method  Post
// @access  Private
const createCart = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: t('cartIsEmpty', req.lang),
    });
  }

  const uniqueProductIds = [
    ...new Set(cartItems.map((cartItem) => cartItem.productId)),
  ];

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

  const existingCart = await Cart.findOne({
    user: req.user._id,
  });

  if (existingCart) {
    existingCart.cartItems.push(...cartItems);

    const updatedCart = await existingCart.save();

    return res.status(200).json(updatedCart);
  }

  const invalidQty = cartItems.some((cartItem) => {
    return (
      typeof cartItem.qty !== 'number' ||
      Number.isNaN(cartItem.qty) ||
      cartItem.qty < 1
    );
  });

  if (invalidQty) {
    return res.status(400).json({
      success: false,
      message: 'Invalid quantity',
    });
  }

  const missingCartFields = cartItems.some((cartItem) => {
    return (
      !cartItem.productId || !cartItem.qty || !cartItem.size || !cartItem.color
    );
  });

  if (missingCartFields) {
    return res.status(400).json({
      success: false,
      message: 'Missing cart item fields',
    });
  }

  const cart = new Cart({
    user: req.user._id,
    cartItems,
  });

  res.send(cart);
});

export { createCart };
