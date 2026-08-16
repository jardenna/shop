import {
  deliveryStatusFilterValues,
  paymentMethodFilterValues,
  paymentStatusFilterValues,
} from '../apiConstants';
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

export type DeliveryStatus =
  'created' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type DeliveryStatusFilterValues =
  (typeof deliveryStatusFilterValues)[number];

export type PaymentStatusFilterValues =
  (typeof paymentStatusFilterValues)[number];

export type PaymentMethodFilterValues =
  (typeof paymentMethodFilterValues)[number];

export interface User {
  id: string;
  username: string;
}

export interface StatusHistory {
  changedAt: Date;
  changedBy: string;
  status: DeliveryStatus;
}

export interface Delivery {
  deliveredAt: Date;
  shippedAt: Date;
  status: DeliveryStatus;
  statusHistory: StatusHistory[];
}

export interface OrderResponse extends DefaultResponseType {
  billingAddress: BaseAddress;
  delivery: Delivery;
  discount: Discount;
  id: string;
  orderItems: Order[];
  payment: Payment;
  shippingAddress: BaseAddress;
  summary: Summary;
  user: User;
}

export interface SummaryK {
  totalPrice: number;
}

export interface MyOrdersResponse {
  createdAt: Date;
  delivery: Delivery;
  id: string;
  orderItems: Order[];
  payment: Payment;
  summary: Summary;
}
