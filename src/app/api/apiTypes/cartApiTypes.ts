import type { DefaultResponseType } from './sharedApiTypes';

export interface CartItem {
  color: string;
  productId: string;
  qty: number;
  size: string;
  id?: string;
  image?: string;
}

export type AddToCartRequest = CartItem | CartItem[];

export interface CartListRequest {
  cartItems: AddToCartRequest;
}

export interface CartListResponse extends DefaultResponseType {
  cartItems: CartItem[];
}

export interface UpdatedCart {
  color: string;
  size: string;
  qty?: number;
}

export interface UpdateCartRequest {
  cartItem: UpdatedCart;
  id: string;
}
