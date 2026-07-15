import { getProductsMap } from '../utils/cartUtils.js';
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

  const summary = calculateCartSummary(orderItems);

  return {
    success: true,
    orderItems,
    summary,
    productMap,
  };
};
