import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
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
    const databaseProduct = databaseProducts.find(
      (product) => product._id.toString() === cartItem.productId,
    );

    if (databaseProduct.countInStock < cartItem.qty) {
      return res.status(400).json({
        success: false,
        message: 'The product you selected is out of stock',
        cartItem: {
          productId: cartItem.productId,
          size: cartItem.size,
          color: cartItem.color,
        },
      });
    }

    const sizeExists = databaseProduct.sizes.includes(cartItem.size);
    const colorExists = databaseProduct.colors.includes(cartItem.color);

    if (!sizeExists || !colorExists) {
      return res.status(400).json({
        success: false,
        message: 'The selected variant does not exist',
        cartItem: {
          productId: cartItem.productId,
          size: cartItem.size,
          color: cartItem.color,
        },
      });
    }
  }

  const updatedCartItems = cartItems.map((cartItem) => {
    const databaseProduct = databaseProducts.find(
      (product) => product._id.toString() === cartItem.productId,
    );

    return {
      ...cartItem,
      image: databaseProduct.images[0],
    };
  });

  if (existingCart) {
    // Identical variant
    for (const cartItem of updatedCartItems) {
      const identicalVariant = existingCart.cartItems.find(
        (item) =>
          item.productId.toString() === cartItem.productId &&
          item.color === cartItem.color &&
          item.size === cartItem.size,
      );

      if (identicalVariant) {
        const databaseProduct = databaseProducts.find(
          (product) => product._id.toString() === cartItem.productId,
        );

        const totalQuantity = identicalVariant.qty + cartItem.qty;

        if (totalQuantity > databaseProduct.countInStock) {
          return res.status(400).json({
            success: false,
            message: 'The product you selected is out of stock',
            cartItem: {
              productId: cartItem.productId,
              size: cartItem.size,
              color: cartItem.color,
            },
          });
        }

        identicalVariant.qty = totalQuantity;
      } else {
        existingCart.cartItems.unshift(cartItem);
      }
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
  const user = await User.findById(req.user?._id);

  const existingCart = await Cart.findOne({
    user,
  });

  res.send(existingCart);
});

export { createCart, mergeCart };
