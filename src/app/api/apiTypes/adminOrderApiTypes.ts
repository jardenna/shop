import { SortParams } from './adminApiTypesNew';
import { DeliveryStatus, PaymentStatusFilterValues } from './orderApiTypes';
import { PaymentMethods } from './paymentApiTypes';

export interface AdminOrderParams extends SortParams {
  ordersPerPage: number;
  page: string;
  paymentMethod: string;
  createdAt?: string;
  customer?: string;
  deliveryStatus?: string;
  id?: string;
  maxTotalPrice?: string;
  minTotalPrice?: string;
  paymentStatus?: string;
}

export interface Order {
  createdAt: Date;
  customer: string;
  deliveryStatus: DeliveryStatus;
  id: string;
  orderId: string;
  paymentMethod: PaymentMethods;
  paymentStatus: PaymentStatusFilterValues;
  totalPrice: number;
}

export interface AdminOrderResponse {
  orderCount: number;
  orders: Order[];
  page: number;
  pages: number;
  success: boolean;
}
