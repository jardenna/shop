import type { DefaultResponseType, Size } from './sharedApiTypes';

export interface CartItem {
  color: string;
  id: string;
  productId: string;
  qty: number;
  size: Size;
}

export interface CartListRequest {
  cartItems: CartItem[];
}

export interface CartListResponse extends DefaultResponseType {
  cartItems: CartItem[];
}
