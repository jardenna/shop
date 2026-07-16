const roundPrice = (amount) => Math.round(amount * 100) / 100;

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

  const totalPrice = roundPrice(subTotal - discountPrice + shippingPrice);

  return {
    subTotal: roundPrice(subTotal),
    discountPrice: roundPrice(discountPrice),
    taxPrice: roundPrice(taxPrice),
    shippingPrice,
    totalPrice,
    promoDiscount: totalPrice - 100,
  };
};
