import type {
  DefaultResponseType,
  Discount,
  Size,
  Summary,
} from './sharedApiTypes';
import { AddressLab, PaymentMethod } from './shopApiTypes';

export interface BaseOrder {
  color: string;
  productId: string;
  qty: number;
  size: Size | '';
}

export interface CartItem extends BaseOrder {
  id?: string;
}

export interface Order extends BaseOrder {
  countInStock: number;
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

export type PaymentMethods = 'Visa' | 'PayPal' | 'MobilePay' | 'Mastercard';

export interface CartListResponse extends DefaultResponseType {
  cartItems: Order[];
  discount: Discount;
  paymentMethods: PaymentMethods[];
  summary: Summary;
}

export interface CheckoutResponse extends CartListResponse {
  addresses: AddressLab[];
  paymentMethod: PaymentMethod[];
}

export interface UpdateCartRequest {
  cartItem: CartItem;
  cartItemId: string;
}

export interface GuestCardResponse {
  missingProductIds: string[];
  products: Order[];
}

export interface UpdateCartQtyRequest {
  cartItemId: string;
  qty: number;
}
