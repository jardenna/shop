import { BaseProduct, Product, Summary } from './cartApiTypes';
import { DefaultResponseType } from './sharedApiTypes';
import { BaseAddress } from './shopApiTypes';

export type AllowedPaymentMethod = 'Credit Card' | 'PayPal' | 'MobilePay';
export type PaymentStatus = 'pending' | 'failed' | 'paid';

export interface CreateOrderRequest {
  billingAddressId: string;
  orderItems: BaseProduct[];
  paymentMethod: AllowedPaymentMethod;
  shippingAddressId: string;
}

export interface CreateOrderResponse extends DefaultResponseType {
  billingAddress: BaseAddress;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: Product[];
  paymentStatus: PaymentStatus;
  shippingAddress: BaseAddress;
  summary: Summary;
}
