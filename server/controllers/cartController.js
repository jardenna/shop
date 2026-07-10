import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import { getProductsMap } from '../utils/cartUtils.js';
import { formatMongoData } from '../utils/formatMongoData.js';
import { t } from '../utils/translator.js';

import {
  cartItemIdentifier,
  findDatabaseProduct,
  mergeCartItems,
  validateVariant,
} from '../utils/cartUtils.js';
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
    const databaseProduct = findDatabaseProduct({
      databaseProducts,
      cartItem,
    });

    const totalQuantity =
      (existingCart?.cartItems
        .filter((item) => item.productId.toString() === cartItem.productId)
        .reduce((totalQty, item) => totalQty + item.qty, 0) ?? 0) +
      cartItem.qty;

    if (databaseProduct.countInStock < totalQuantity) {
      return res.status(400).json({
        success: false,
        message: t('temporarilyOutOfStock', req.lang),
        cartItem: cartItemIdentifier(cartItem),
      });
    }

    const isValidVariant = validateVariant({
      databaseProduct,
      cartItem,
    });

    if (!isValidVariant) {
      return res.status(400).json({
        success: false,
        message: 'The selected variant does not exist',
        cartItem: cartItemIdentifier(cartItem),
      });
    }
  }

  const updatedCartItems = cartItems.map((cartItem) => {
    const databaseProduct = findDatabaseProduct({
      databaseProducts,
      cartItem,
    });

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
        message: t('temporarilyOutOfStock', req.lang),
        cartItem: mergeResult.cartItem,
      });
    }

    const updatedCart = await existingCart.save();

    const formattedCart = formatMongoData(updatedCart.toObject());

    formattedCart.cartItems = formattedCart.cartItems.map((cartItem) =>
      formatMongoData(cartItem),
    );

    return res.status(200).json(formattedCart);
  }

  const cart = new Cart({
    user: req.user._id,
    cartItems: updatedCartItems,
  });

  const createdCart = await cart.save();

  const formattedCart = formatMongoData(createdCart.toObject());

  formattedCart.cartItems = formattedCart.cartItems.map((cartItem) =>
    formatMongoData(cartItem),
  );

  return res.status(201).json(formattedCart);
});

// @desc    Update cart
// @route   /api/cart/:cartItemId
// @method  patch
// @access  Private
const updateCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { color, size } = req.body;

  const existingCart = await Cart.findOne({
    user: req.user._id,
  });

  if (!existingCart) {
    return res.status(404).json({
      success: false,
      message: t('cartNotFound', req.lang),
    });
  }

  const cartItemToUpdate = existingCart.cartItems.find(
    (cartItem) => cartItem._id.toString() === id,
  );

  if (!cartItemToUpdate) {
    return res.status(404).json({
      success: false,
      message: t('cartItemNotFound', req.lang),
    });
  }

  const product = await Product.findById(cartItemToUpdate.productId).select(
    'sizes colors countInStock',
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: t('productNotFound', req.lang),
    });
  }

  if (!product.colors.includes(color)) {
    return res.status(400).json({
      success: false,
      message: t('invalidColor', req.lang),
    });
  }

  if (!product.sizes.includes(size)) {
    return res.status(400).json({
      success: false,
      message: t('invalidSize', req.lang),
    });
  }

  const existingVariant = existingCart.cartItems.find(
    (cartItem) =>
      cartItem._id.toString() !== id &&
      cartItem.productId.toString() === cartItemToUpdate.productId.toString() &&
      cartItem.color === color &&
      cartItem.size === size,
  );

  if (existingVariant) {
    const totalQuantity = existingVariant.qty + cartItemToUpdate.qty;

    if (totalQuantity > product.countInStock) {
      return res.status(400).json({
        success: false,
        message: t('temporarilyOutOfStock', req.lang),
      });
    }
  }

  cartItemToUpdate.color = color;
  cartItemToUpdate.size = size;

  const updatedCart = await existingCart.save();

  return res.status(200).json(updatedCart);
});

// @desc    Get cart
// @route   /api/cart
// @method  Get
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  }).lean();

  if (!cart) {
    return res.status(200).json({
      cartItems: [],
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

  const cartItems = cart.cartItems.map((cartItem) => {
    const product = productMap.get(cartItem.productId.toString());

    return {
      ...formatMongoData(cartItem),
      image: product.images[0],
      productName: product.productName,
      price: product.price,
      discount: product.discount,
      countInStock: product.countInStock,
    };
  });

  return res.status(200).json({
    ...formatMongoData(cart),
    cartItems,
  });
});

// @desc    Get guest cart
// @route   /api/cart/guest
// @method  Post
// @access  Public
const getGuestCartProducts = asyncHandler(async (req, res) => {
  const cartItems = req.body;

  if (!Array.isArray(cartItems)) {
    return res.status(400).json({
      success: false,
      message: t('invalidRequestProductIds', req.lang),
    });
  }

  if (cartItems.length === 0) {
    return res.status(200).json({
      products: [],
      missingProductIds: [],
    });
  }

  const productIds = cartItems.map((item) => item.productId);

  const productMap = await getProductsMap({
    productIds,
    publishedOnly: true,
  });

  const missingProductIds = productIds.filter(
    (productId) => !productMap.has(productId),
  );

  const products = cartItems.flatMap((item) => {
    const product = productMap.get(item.productId);

    if (!product) {
      return [];
    }

    return {
      id: item.productId,
      productId: item.productId,
      qty: item.qty,
      size: item.size,
      color: item.color,
      image: product.images[0],
      productName: product.productName,
      price: product.price,
      discount: product.discount,
      countInStock: product.countInStock,
    };
  });

  return res.status(200).json({
    products,
    missingProductIds,
  });
});

// @desc    Delete cart
// @route   /api/cart/:id
// @method  Delete
// @access  Private
const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    return res.status(404).json({
      message: t('cartItemNotFound', req.lang),
    });
  }

  cart.cartItems.pull(req.params.id);

  await cart.save();

  res.status(200).json({
    message: t('cartItemDeleted', req.lang),
  });
});

export { createCart, deleteCart, getCart, getGuestCartProducts, updateCart };
