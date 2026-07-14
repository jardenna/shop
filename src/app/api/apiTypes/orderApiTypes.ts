import { Summary } from './cartApiTypes';
import { DefaultResponseType, Size } from './sharedApiTypes';
import { BaseAddress } from './shopApiTypes';
export interface Order {
  color: string;
  product: string;
  qty: number;
  size: Size | '';
}

export type AllowedPaymentMethod = 'Credit Card' | 'PayPal' | 'MobilePay';
export type PaymentStatus = 'pending' | 'failed' | 'paid';

export interface CreateOrderRequest {
  billingAddressId: string;
  orderItems: Order[];
  paymentMethod: AllowedPaymentMethod;
  shippingAddressId: string;
}

export interface CreateOrderResponse extends DefaultResponseType {
  billingAddress: BaseAddress;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: Order[];
  paymentStatus: PaymentStatus;
  shippingAddress: BaseAddress;
  summary: Summary;
}
