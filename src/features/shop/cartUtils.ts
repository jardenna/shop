import { CartItem } from '../../app/api/apiTypes/sharedApiTypes';

interface CartUtilsParams {
  cartItem: CartItem;
  cartList: CartItem[];
}

export const cartUtils = ({ cartList, cartItem }: CartUtilsParams) => {
  const identicalVariant = cartList.find(
    (item) =>
      item.productId === cartItem.productId &&
      item.size === cartItem.size &&
      item.color === cartItem.color,
  );

  const sameProduct = cartList.find(
    (item) => item.productId === cartItem.productId,
  );

  const sameProductDifferentVariant = !!sameProduct && !identicalVariant;

  const existingProduct = cartList.find(
    (item) => item.productId === cartItem.productId,
  );

  const sizeChanged = existingProduct?.size !== cartItem.size;
  const colorChanged = existingProduct?.color !== cartItem.color;

  if (identicalVariant) {
    return 'add to qty';
  }

  if (
    sameProductDifferentVariant &&
    ((sizeChanged && !colorChanged) || (!sizeChanged && colorChanged))
  ) {
    return 'popup';
  }

  return 'add to cartlist';
};
