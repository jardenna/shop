import { getProductsMap } from '../utils/cartUtils.js';
import { formatMongoData } from '../utils/formatMongoData.js';
import { buildOrderItems } from './buildOrderItems.js';
import { calculateCartSummary } from './calculateCartSummary.js';

export const buildCartData = async ({ cart }) => {
  const productMap = await getProductsMap({
    productIds: cart.cartItems.map(({ productId }) => productId.toString()),
  });

  const missingProduct = cart.cartItems.find(
    (cartItem) => !productMap.has(cartItem.productId.toString()),
  );

  if (missingProduct) {
    return {
      success: false,
    };
  }

  const orderItems = buildOrderItems({
    databaseProducts: [...productMap.values()],
    productItems: cart.cartItems,
  });

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

  const summary = calculateCartSummary(orderItems);

  return {
    success: true,
    summary,
    cartItems,
    orderItems,
  };
};
