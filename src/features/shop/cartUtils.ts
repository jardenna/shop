import { CartItem } from '../../app/api/apiTypes/sharedApiTypes';

interface CartUtilsParams {
  cartItem: CartItem;
  cartList: CartItem[];
}
export const cartUtils = ({ cartList, cartItem }: CartUtilsParams) => {
  const existingVariants = cartList.filter(
    (item) => item.productId === cartItem.productId,
  );

  const identicalVariant = existingVariants.find(
    (item) => item.size === cartItem.size && item.color === cartItem.color,
  );

  if (identicalVariant) {
    return {
      action: 'addToQty',
      existingVariant: identicalVariant,
    };
  }

  const popupVariant = existingVariants.find((item) => {
    const sameSize = item.size === cartItem.size;
    const sameColor = item.color === cartItem.color;

    return (sameSize && !sameColor) || (!sameSize && sameColor);
  });

  if (popupVariant) {
    const changedAttribute =
      popupVariant.size !== cartItem.size ? 'size' : 'color';

    return {
      action: 'showPopup',
      existingVariant: popupVariant,
      incomingVariant: cartItem,
      changedAttribute,
      existingValue:
        changedAttribute === 'size' ? popupVariant.size : popupVariant.color,
      incomingValue:
        changedAttribute === 'size' ? cartItem.size : cartItem.color,
    };
  }

  return {
    action: 'addToCartList',
    incomingVariant: cartItem,
  };
};
