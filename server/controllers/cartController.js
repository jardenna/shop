import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
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
    const databaseProduct = findDatabaseProduct({ databaseProducts, cartItem });

    if (databaseProduct.countInStock < cartItem.qty) {
      return res.status(400).json({
        success: false,
        message: t('temporarilyOutOfStock', req.lang),
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
    'sizes colors',
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

  cartItemToUpdate.color = color;
  cartItemToUpdate.size = size;

  const updatedCart = await existingCart.save();
  return res.status(200).json(updatedCart);
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

  if (!existingCart) {
    const cart = new Cart({
      user: req.user._id,
      cartItems: cartList,
    });

    const createdCart = await cart.save();

    return res.status(201).json(createdCart);
  }

  const uniqueProductIds = [
    ...new Set(cartList.map((cartItem) => cartItem.productId)),
  ];

  const databaseProducts = await Product.find({
    _id: {
      $in: uniqueProductIds,
    },
  });

  const mergeResult = mergeCartItems({
    existingCarts: existingCart.cartItems,
    incomingCartItems: cartList,
    databaseProducts,
  });

  if (!mergeResult.success) {
    return res.status(400).json({
      success: false,
      message: mergeResult.message,
      cartItem: mergeResult.cartItem,
    });
  }

  existingCart.cartItems = mergeResult.cartItems;

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

  const uniqueProductIds = [
    ...new Set(cart.cartItems.map(({ productId }) => productId.toString())),
  ];

  const databaseProducts = await Product.find({
    _id: {
      $in: uniqueProductIds,
    },
  })
    .select('images productName price discount countInStock brand material')
    .lean();

  const productMap = new Map(
    databaseProducts.map((product) => [product._id.toString(), product]),
  );

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
      brand: product.brand,
      material: product.material,
    };
  });

  return res.status(200).json({
    ...formatMongoData(cart),
    cartItems,
  });
});

export { createCart, getCart, mergeCart, updateCart };
