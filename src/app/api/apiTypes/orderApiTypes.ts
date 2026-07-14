import { Size } from './sharedApiTypes';
import { BaseAddress } from './shopApiTypes';
export interface Order {
  color: string;
  product: string;
  qty: number;
  size: Size | '';
}

export type AllowedPaymentMethod = 'Credit Card' | 'PayPal' | 'MobilePay';

export interface CreateOrderRequest {
  billingAddressId: string;
  orderItems: Order[];
  paymentMethod: AllowedPaymentMethod;
  shippingAddressId: string;
}

export interface CreateOrderResponse {
  billingAddress: BaseAddress;
  orderItems: Order[];
  shippingAddress: BaseAddress;
}
