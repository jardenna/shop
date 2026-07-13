export const calculateCartSummary = (orderItems) => {
  const subTotal = orderItems.reduce(
    (totalPrice, orderItem) => totalPrice + orderItem.subtotal,
    0,
  );

  const taxPrice = orderItems.reduce(
    (totalPrice, orderItem) => totalPrice + orderItem.taxPrice,
    0,
  );

  const discountPrice = orderItems.reduce(
    (totalPrice, orderItem) => totalPrice + orderItem.discountPrice,
    0,
  );

  const shippingPrice = subTotal >= 1500 ? 0 : 49;

  return {
    subTotal,
    discountPrice,
    taxPrice,
    shippingPrice,
    totalPrice: subTotal - discountPrice + shippingPrice,
  };
};
