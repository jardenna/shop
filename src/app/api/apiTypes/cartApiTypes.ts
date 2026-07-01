import type { DefaultResponseType, Size } from './sharedApiTypes';

export interface CartItem {
  color: string;
  productId: string;
  qty: number;
  size: Size;
}

export interface CreateCartRequest {
  cartItems: CartItem[];
}

export interface CreateCartResponse extends DefaultResponseType {
  cartItems: CartItem[];
}
