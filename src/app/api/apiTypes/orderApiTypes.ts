import { BaseAddress } from './addressApiTypes';
import { BaseOrder, Order } from './cartApiTypes';
import { Payment, PaymentMethods } from './paymentApiTypes';
import { DefaultResponseType, Discount, Summary } from './sharedApiTypes';

export interface CreateOrderRequest {
  billingAddressId: string;
  orderItems: BaseOrder[];
  payment: {
    method: PaymentMethods;
  };
  shippingAddressId: string;
}

export type DeliveryStatus = 'created' | 'processing' | 'shipped' | 'delivered';
export interface User {
  id: string;
  username: string;
}

export interface OrderResponse extends DefaultResponseType {
  billingAddress: BaseAddress;
  discount: Discount;
  id: string;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: Order[];
  payment: Payment;
  shippingAddress: BaseAddress;
  summary: Summary;
  user: User;
}
