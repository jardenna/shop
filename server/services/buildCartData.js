export const buildCartData = async ({}) => {
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
  const orderItems = buildOrderItems({
    databaseProducts: [...productMap.values()],
    productItems: cart.cartItems,
  });

  const summary = calculateCartSummary(orderItems);
  return { summary };
};
