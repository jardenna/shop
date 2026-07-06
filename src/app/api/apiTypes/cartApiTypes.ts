import type { DefaultResponseType, Size } from './sharedApiTypes';

export interface CartItemRequest {
  color: string;
  productId: string;
  qty: number;
  size: Size | '';
  id?: string;
}

export interface CartItem extends CartItemRequest {
  image: string;
  productId: string;
}

export type AddToCartRequest = CartItemRequest | CartItemRequest[];

export interface CartListRequest {
  cartItems: AddToCartRequest;
}

export interface CartListResponse extends DefaultResponseType {
  cartItems: CartItem[];
}

export interface UpdateCartRequest {
  cartItem: CartItemRequest;
  cartItemId: string;
}
