import type { DefaultResponseType, Size } from './sharedApiTypes';

export interface CartItem {
  color: string;
  productId: string;
  qty: number;
  size: Size | '';
  id?: string;
}

export type AddToCartRequest = CartItem | CartItem[];

export interface CartListRequest {
  cartItems: AddToCartRequest;
}

export interface CartListResponse extends DefaultResponseType {
  cartItems: CartItem[];
}

export interface UpdateCartRequest {
  cartItem: CartItem;
  cartItemId: string;
}
