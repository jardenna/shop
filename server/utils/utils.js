export const calculateOrderRevenue = (order) =>
  order.summary.subTotal -
  order.summary.discountPrice -
  order.summary.promoDiscount -
  order.summary.taxPrice;
