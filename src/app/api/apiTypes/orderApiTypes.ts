import { BaseOrder, Order } from './cartApiTypes';
import { BaseAddress, DefaultResponseType, Summary } from './sharedApiTypes';

export type AllowedPaymentMethod = 'Credit Card' | 'PayPal' | 'MobilePay';
export type PaymentStatus = 'pending' | 'failed' | 'paid';

export interface CreateOrderRequest {
  billingAddressId: string;
  orderItems: BaseOrder[];
  paymentMethod: AllowedPaymentMethod;
  shippingAddressId: string;
}

export interface OrderResponse extends DefaultResponseType {
  billingAddress: BaseAddress;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: Order[];
  paymentStatus: PaymentStatus;
  shippingAddress: BaseAddress;
  summary: Summary;
}
