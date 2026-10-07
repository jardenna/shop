import { StandardAddressIds } from '../../../utils/addressUtils';
import {
  deliveryStatusFilterValues,
  paymentMethodFilterValues,
  paymentStatusFilterValues,
} from '../apiConstants';
import { BaseAddress } from './addressApiTypes';
import { BaseOrder, Order } from './cartApiTypes';
import { Payment, PaymentMethods } from './paymentApiTypes';
import { DefaultResponseType, Discount, Summary } from './sharedApiTypes';

export interface CreateOrderRequest extends StandardAddressIds {
  orderItems: BaseOrder[];
  payment: {
    method: PaymentMethods;
  };
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
  email: string;
  id: string;
  phoneNo: string;
  username: string;
}

interface ChangedBy {
  username: string;
}

type ActorType = 'customer' | 'employee' | 'system';

export interface StatusHistory {
  actorType: ActorType;
  changedAt: Date;
  changedBy: ChangedBy;
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

export interface MyOrdersResponse {
  createdAt: Date;
  delivery: Delivery;
  id: string;
  orderItems: Order[];
  payment: Payment;
  summary: Summary;
}

export type UpdateOrderRequest = {
  orderId: string;
  status: DeliveryStatus;
};
