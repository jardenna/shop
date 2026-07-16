import { CartItem } from '../app/api/apiTypes/cartApiTypes';

export const getCartQuantity = (cartItems: CartItem[]): number =>
  cartItems.reduce((totalQty, cartItem) => totalQty + cartItem.qty, 0);
