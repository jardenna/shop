import { BaseAddress } from './addressApiTypes';
import { BaseOrder, Order, PaymentMethods } from './cartApiTypes';
import { DefaultResponseType, Discount, Summary } from './sharedApiTypes';

export type PaymentStatus = 'pending' | 'failed' | 'paid';

export interface CreateOrderRequest {
  billingAddressId: string;
  orderItems: BaseOrder[];
  payment: {
    method: PaymentMethods;
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
