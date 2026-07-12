import { VAT_SHARE } from '../config/constants.js';
import Product from '../models/productModel.js';

export const calculateCartSummary = async (productItems) => {
  const uniqueProductIds = [
    ...new Set(productItems.map((item) => item.productId)),
  ];

  const databaseProducts = await Product.find({
    _id: {
      $in: uniqueProductIds,
    },
  }).lean();

  const productItemsMap = new Map(
    productItems.map((item) => [item.productId.toString(), item]),
  );

  const summaryItems = databaseProducts.map((databaseProduct) => {
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

  const itemPrice = summaryItems.reduce(
    (totalPrice, summaryItem) => totalPrice + summaryItem.subtotal,
    0,
  );

  const taxPrice = summaryItems.reduce(
    (totalPrice, summaryItem) => totalPrice + summaryItem.taxPrice,
    0,
  );

  const shippingPrice = itemPrice >= 1500 ? 0 : 49;

  return {
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice: itemPrice + shippingPrice,
  };
};
