import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import {
  cartItemIdentifier,
  findDatabaseProduct,
  mergeCartItems,
  validateVariant,
} from '../utils/cartUtils.js';
import { t } from '../utils/translator.js';
import { validateCartItems } from '../utils/validateCartItems.js';

// @desc    Create cart
// @route   /api/cart
// @method  Post
// @access  Private
const createCart = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;
  const existingCart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: t('cartIsEmpty', req.lang),
    });
  }

  for (const cartItem of cartItems) {
    const validationMessage = validateCartItems(cartItem);

    if (validationMessage) {
      return res.status(400).json({
        success: false,
        message: validationMessage,
      });
    }
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

  for (const cartItem of cartItems) {
    const databaseProduct = findDatabaseProduct({ databaseProducts, cartItem });

    if (databaseProduct.countInStock < cartItem.qty) {
      return res.status(400).json({
        success: false,
        message: 'The product you selected is out of stock',
        cartItem: cartItemIdentifier(cartItem),
      });
    }

    const isValidVariant = validateVariant({ databaseProduct, cartItem });

    if (!isValidVariant) {
      return res.status(400).json({
        success: false,
        message: 'The selected variant does not exist',
        cartItem: cartItemIdentifier(cartItem),
      });
    }
  }

  const updatedCartItems = cartItems.map((cartItem) => {
    const databaseProduct = findDatabaseProduct({ databaseProducts, cartItem });

    return {
      ...cartItem,
      image: databaseProduct.images[0],
    };
  });

  if (existingCart) {
    const mergeResult = mergeCartItems({
      existingCartItems: existingCart.cartItems,
      incomingCartItems: updatedCartItems,
      databaseProducts,
    });

    if (!mergeResult.success) {
      return res.status(400).json({
        success: false,
        message: 'The product you selected is out of stock',
        cartItem: mergeResult.cartItem,
      });
    }

    const updatedCart = await existingCart.save();

    return res.status(200).json(updatedCart);
  }

  const cart = new Cart({
    user: req.user._id,
    cartItems: updatedCartItems,
  });

  const createdCart = await cart.save();

  return res.status(201).json(createdCart);
});

// @desc    Merge cart
// @route   /api/cart/merge
// @method  Post
// @access  Private
const mergeCart = asyncHandler(async (req, res) => {
  const { cartList } = req.body;

  const existingCart = await Cart.findOne({
    user: req.user._id,
  });

  const uniqueProductIds = [
    ...new Set(cartList.map((cartItem) => cartItem.productId)),
  ];

  const databaseProducts = await Product.find({
    _id: {
      $in: uniqueProductIds,
    },
  });

  const mergeResult = mergeCartItems({
    existingCartItems: existingCart.cartItems,
    incomingCartItems: cartList,
    databaseProducts,
  });

  if (!mergeResult.success) {
    return res.status(400).json({
      success: false,
      message: 'The product you selected is out of stock',
      cartItem: mergeResult.cartItem,
    });
  }

  res.send(mergeResult.cartItems);
});

export { createCart, mergeCart };
