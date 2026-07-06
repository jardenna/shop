import { CartItem } from '../../app/api/apiTypes/cartApiTypes';

export type ChangedAttribute = 'size' | 'color';

interface CartUtilsParams {
  cartItem: CartItem;
  cartList: CartItem[];
}

interface CartResult {
  action: 'addToQtyAction' | 'showPopupAction' | 'addToCartListAction';
  changedAttribute?: ChangedAttribute;
  existingValue?: string;
  existingVariant?: CartItem;
  incomingValue?: string;
  incomingVariant?: CartItem;
}

export const cartUtils = ({
  cartList,
  cartItem,
}: CartUtilsParams): CartResult => {
  const existingVariants = cartList.filter(
    (item) => item.productId === cartItem.productId,
  );

  const identicalVariant = existingVariants.find(
    (item) => item.size === cartItem.size && item.color === cartItem.color,
  );

  if (identicalVariant) {
    return {
      action: 'addToQtyAction',
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
      action: 'showPopupAction',
      existingVariant: popupVariant,
      changedAttribute,
      existingValue:
        changedAttribute === 'size' ? popupVariant.size : popupVariant.color,
      incomingValue:
        changedAttribute === 'size' ? cartItem.size : cartItem.color,
    };
  }

  return {
    action: 'addToCartListAction',
  };
};

export const getTotalCartQuantity = (
  cartList: CartItem[],
  productId: string,
  quantity: number,
) =>
  cartList
    .filter((item) => item.productId === productId)
    .reduce((totalQty, item) => totalQty + item.qty, 0) + quantity;
