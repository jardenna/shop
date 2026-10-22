import { roleValues, statusValues } from '../apiConstants';
import { DeliveryStatus, PaymentStatusFilterValues } from './orderApiTypes';
import { PaymentMethods } from './paymentApiTypes';
import type { DefaultResponse, SortOrder } from './sharedApiTypes';

export type Roles = (typeof roleValues)[number];

export type Status = (typeof statusValues)[number];

export type ScheduledResponse = {
  hasScheduled: boolean;
};

export type UploadResponse = DefaultResponse & {
  images: string[];
};

export type SortParams = {
  sortField: string;
  sortOrder: SortOrder;
};

export type FileName = 'images';

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
