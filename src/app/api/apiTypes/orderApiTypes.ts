import { BaseAddress } from './addressApiTypes';
import { BaseOrder, Order } from './cartApiTypes';
import { OrderItems } from './orderApiTypes';
import { Payment, PaymentMethods } from './paymentApiTypes';
import { DefaultResponseType, Discount, Size, Summary } from './sharedApiTypes';

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

export interface OrderItems {
  color: string;
  id: string;
  image: string;
  price: number;
  productId: string;
  productName: string;
  qty: number;
  size: Size;
}

type PaymentStatus = 'PENDING' | 'COMPLETED';

export interface Summary {
  totalPrice: number;
}

export interface Payment {
  status: PaymentStatus;
}

export interface MyOrdersResponse {
  createdAt: Date;
  id: string;
  orderItems: OrderItems;
  payment: Payment;
  summary: Summary;
}
