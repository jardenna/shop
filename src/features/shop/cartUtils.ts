import { CartItem } from '../../app/api/apiTypes/sharedApiTypes';

interface CartUtilsParams {
  cart: CartItem[];
  cartItem: CartItem;
}

export const cartUtils = ({ cart, cartItem }: CartUtilsParams) => {
  console.log(cart, cartItem);
};
