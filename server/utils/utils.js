export const calculateOrderRevenue = (order) =>
  order.summary.subTotal -
  order.summary.discountPrice -
  order.summary.promoDiscount -
  order.summary.taxPrice;

export const calculateChangePercentage = (current, previous) => {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }

  return Math.round(((current - previous) / previous) * 100);
};
