import { VAT_SHARE } from '../config/constants.js';

export const buildOrderItems = ({ databaseProducts, productItems }) => {
  const databaseProductsMap = new Map(
    databaseProducts.map((databaseProduct) => [
      databaseProduct._id.toString(),
      databaseProduct,
    ]),
  );

  return productItems.map((productItem) => {
    const databaseProduct = databaseProductsMap.get(
      productItem.productId.toString(),
    );

    const price =
      databaseProduct.price -
      (databaseProduct.price * databaseProduct.discount) / 100;

    const subtotal = price * productItem.qty;

    const taxPrice = Math.round(subtotal * VAT_SHARE * 100) / 100;

    const discountPrice =
      ((databaseProduct.price * databaseProduct.discount) / 100) *
      productItem.qty;

    return {
      id: productItem._id,
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
      discountPrice,
    };
  });
};
