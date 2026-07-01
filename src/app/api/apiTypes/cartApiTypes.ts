import type { DefaultResponseType, Size } from './sharedApiTypes';

export interface CartItem {
  color: string;
  productId: string;
  qty: number;
  size: Size;
}

export interface cartItemRequest {
  cartItems: CartItem[];
}

export interface cartItemResponse extends DefaultResponseType {
  cartItems: CartItem[];
  user: string;
}
