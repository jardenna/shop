import { BaseOrder, Order } from './cartApiTypes';
import {
  BaseAddress,
  DefaultResponseType,
  Discount,
  Summary,
} from './sharedApiTypes';

export type AllowedPaymentMethod =
  'Visa' | 'Mastercard' | 'PayPal' | 'MobilePay';

export type PaymentStatus = 'pending' | 'failed' | 'paid';

export interface CreateOrderRequest {
  billingAddressId: string;
  orderItems: BaseOrder[];
  payment: {
    method: AllowedPaymentMethod;
  };
  shippingAddressId: string;
}

export interface OrderResponse extends DefaultResponseType {
  billingAddress: BaseAddress;
  discount: Discount;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: Order[];
  paymentStatus: PaymentStatus;
  shippingAddress: BaseAddress;
  summary: Summary;
}
