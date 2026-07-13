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
  })
    .select('price discount')
    .lean();

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

    const discountPrice =
      ((databaseProduct.price * databaseProduct.discount) / 100) *
      productItem.qty;

    return {
      subtotal,
      taxPrice,
      discountPrice,
    };
  });

  const subTotal = summaryItems.reduce(
    (totalPrice, summaryItem) => totalPrice + summaryItem.subtotal,
    0,
  );

  const taxPrice = summaryItems.reduce(
    (totalPrice, summaryItem) => totalPrice + summaryItem.taxPrice,
    0,
  );

  const shippingPrice = subTotal >= 1500 ? 0 : 49;
  const discountPrice = summaryItems.reduce(
    (totalPrice, summaryItem) => totalPrice + summaryItem.discountPrice,
    0,
  );

  return {
    subTotal,
    discountPrice,
    taxPrice,
    shippingPrice,
    totalPrice: subTotal - discountPrice + shippingPrice,
  };
};
