import { VAT_SHARE } from '../config/constants.js';

export const buildOrderItems = ({ databaseProducts, productItems }) => {
  const productItemsMap = new Map(
    productItems.map((productItem) => [
      productItem.productId.toString(),
      productItem,
    ]),
  );

  return databaseProducts.map((databaseProduct) => {
    const productItem = productItemsMap.get(databaseProduct._id.toString());

    const price =
      databaseProduct.price -
      (databaseProduct.price * databaseProduct.discount) / 100;

    const subtotal = price * productItem.qty;

    const taxPrice = Math.round(subtotal * VAT_SHARE * 100) / 100;

    return {
      productId: databaseProduct._id,
      productName: databaseProduct.productName,
      image: databaseProduct.images[0],
      qty: productItem.qty,
      color: productItem.color,
      size: productItem.size,
      price,
      subtotal,
      taxPrice,
      noTax: subtotal - taxPrice,
    };
  });
};
