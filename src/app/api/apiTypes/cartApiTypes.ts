import type { DefaultResponseType } from './sharedApiTypes';

export interface CartItem {
  color: string;
  productId: string;
  qty: number;
  size: string;
  id?: string;
  image?: string;
}

export interface CartListRequest {
  cartItems: CartItem[];
}

export interface CartListResponse extends DefaultResponseType {
  cartItems: CartItem[];
}
