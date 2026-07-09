import { STATUS } from '../config/constants.js';
import Product from '../models/productModel.js';

const findIdenticalVariant = ({ cartItems, cartItem }) => {
  return cartItems.find(
    (item) =>
      item.productId.toString() === cartItem.productId &&
      item.color === cartItem.color &&
      item.size === cartItem.size,
  );
};

const findDatabaseProduct = ({ databaseProducts, cartItem }) => {
  return databaseProducts.find(
    (product) => product._id.toString() === cartItem.productId,
  );
};

const validateVariant = ({ databaseProduct, cartItem }) => {
  return (
    databaseProduct.sizes.includes(cartItem.size) &&
    databaseProduct.colors.includes(cartItem.color)
  );
};

const cartItemIdentifier = (cartItem) => ({
  productId: cartItem.productId,
  size: cartItem.size,
  color: cartItem.color,
});

const mergeCartItems = ({
  existingCartItems,
  incomingCartItems,
  databaseProducts,
}) => {
  for (const cartItem of incomingCartItems) {
    const identicalVariant = findIdenticalVariant({
      cartItems: existingCartItems,
      cartItem,
    });

    if (identicalVariant) {
      const databaseProduct = findDatabaseProduct({
        databaseProducts,
        cartItem,
      });

      const totalQuantity = identicalVariant.qty + cartItem.qty;

      // Check count in stock
      if (totalQuantity > databaseProduct.countInStock) {
        return {
          success: false,
          message: 'The product you selected is out of stock',
          cartItem,
        };
      }
      identicalVariant.qty = totalQuantity;
    } else {
      existingCartItems.unshift(cartItem);
    }
  }

  return {
    success: true,
    cartItems: existingCartItems,
  };
};

export const getProductsMap = async ({ productIds, publishedOnly = false }) => {
  const uniqueProductIds = [...new Set(productIds)];

  const query = {
    _id: {
      $in: uniqueProductIds,
    },
  };

  if (publishedOnly) {
    query.productStatus = STATUS.PUBLISHED;
  }

  const databaseProducts = await Product.find(query)
    .select('images productName price discount countInStock')
    .lean();

  return new Map(
    databaseProducts.map((product) => [product._id.toString(), product]),
  );
};

export {
  cartItemIdentifier,
  findDatabaseProduct,
  findIdenticalVariant,
  mergeCartItems,
  validateVariant,
};
