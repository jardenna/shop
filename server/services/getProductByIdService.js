import Product from '../models/productModel.js';
import { formatMongoData } from '../utils/formatMongoData.js';

export const getProductByIdService = async (
  productId,
  includeCategoryStatus = false,
) => {
  const subCategorySelect = includeCategoryStatus
    ? 'subCategoryName categoryStatus allowedSizes'
    : 'subCategoryName allowedSizes';

  const product = await Product.findById(productId)
    .populate({
      path: 'subCategory',
      select: subCategorySelect,
      populate: {
        path: 'category',
        select: 'categoryName',
      },
    })
    .lean();

  if (!product) {
    return null;
  }

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  const formattedProduct = formatMongoData(product);

  return {
    ...formattedProduct,
    discountedPrice: Math.round(discountedPrice),
    subCategoryName: product.subCategory?.subCategoryName || '',
    categoryName: product.subCategory?.category?.categoryName || '',
    allowedSizes: product.subCategory?.allowedSizes || [],
  };
};
