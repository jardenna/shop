import {
  DISCOUNT_SHIPPING_PRICE,
  SHIPPING_PRICE,
} from '../config/constants.js';
const roundPrice = (amount) => Math.round(amount * 100) / 100;

export const calculateCartSummary = (orderItems, promoDiscountPercent = 0) => {
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

  const shippingPrice =
    subTotal >= DISCOUNT_SHIPPING_PRICE ? 0 : SHIPPING_PRICE;
  const totalPrice = roundPrice(subTotal - discountPrice);
  const promoDiscount = roundPrice(totalPrice * (promoDiscountPercent / 100));

  return {
    subTotal: roundPrice(subTotal),
    discountPrice: roundPrice(discountPrice),
    taxPrice: roundPrice(taxPrice),
    shippingPrice,
    totalPrice: totalPrice + shippingPrice - promoDiscount,
    promoDiscount,
  };
};
