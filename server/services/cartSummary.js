import { VAT_SHARE } from '../config/constants.js';
export const calculateCartSummary = (databaseProducts, orderItemsMap) => {
  const productsWithDiscountedPrices = databaseProducts.map(
    (databaseProduct) => {
      const matchingOrderItem = orderItemsMap.get(
        databaseProduct._id.toString(),
      );

      if (!matchingOrderItem?.qty || matchingOrderItem.qty < 1) {
        return res.status(404).json({
          success: false,
          message: t('qtyMustBeAtLeast', req.lang),
        });
      }

      const discountedPrice =
        databaseProduct.price -
        (databaseProduct.price * databaseProduct.discount) / 100;

      const subtotal = discountedPrice * matchingOrderItem.qty;

      const calculatedTaxPrice = Math.round(subtotal * VAT_SHARE * 100) / 100;

      const noTax = subtotal - calculatedTaxPrice;

      return {
        productId: databaseProduct._id,
        productName: databaseProduct.productName,
        image: databaseProduct.images[0],
        price: discountedPrice,
        taxPrice: calculatedTaxPrice,
        subtotal,
        noTax,
        qty: matchingOrderItem.qty,
      };
    },
  );

  const itemPrice = productsWithDiscountedPrices.reduce(
    (totalPrice, productItem) => {
      return totalPrice + productItem.subtotal;
    },
    0,
  );

  const taxPrice = productsWithDiscountedPrices.reduce(
    (totalPrice, productItem) => {
      return totalPrice + productItem.taxPrice;
    },
    0,
  );

  const shippingPrice = itemPrice >= 1500 ? 0 : 49;

  const totalPrice = itemPrice + shippingPrice;

  return {
    productsWithDiscountedPrices,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  };
};
