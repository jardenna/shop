import type { DefaultResponseType, Size } from './sharedApiTypes';

interface BaseCartItem {
  color: string;
  productId: string;
  qty: number;
  size: Size | '';
}

export interface CartItem extends BaseCartItem {
  id?: string;
}

export interface CartProduct extends BaseCartItem {
  discount: number;
  id: string;
  image: string;
  price: number;
  productName: string;
}

export type AddToCartRequest = CartItem | CartItem[];

export interface CartListRequest {
  cartItems: AddToCartRequest;
}

export interface CartListResponse extends DefaultResponseType {
  cartItems: CartProduct[];
}

export interface UpdateCartRequest {
  cartItem: CartItem;
  cartItemId: string;
}

export interface GuestCardResponse {
  missingProductIds: string[];
  products: CartProduct[];
}
