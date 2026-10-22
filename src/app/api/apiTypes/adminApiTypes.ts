import { roleValues, statusValues } from '../apiConstants';
import { DeliveryStatus, PaymentStatusFilterValues } from './orderApiTypes';
import { PaymentMethods } from './paymentApiTypes';
import type {
  DefaultResponse,
  DefaultResponseType,
  SortOrder,
} from './sharedApiTypes';

export type Roles = (typeof roleValues)[number];

export type Status = (typeof statusValues)[number];

// // --- Auth ---

// Category
export type ScheduledResponse = {
  hasScheduled: boolean;
};

export type Category = DefaultResponseType & {
  categoryName: string;
  categoryStatus: Status;
  id: string;
  scheduledDate?: Date;
};

export type CategoriesResponse = DefaultResponse & {
  categories: Category[];
};

export type UploadResponse = DefaultResponse & {
  images: string[];
};

export type CreateCategoryRequest = {
  categoryName: string;
  categoryStatus: Status;
  scheduledDate?: Date;
};

export type CategoryItemResponse = DefaultResponseType & {
  category: Category;
};

export type UpdateCategoryRequest = {
  category: CreateCategoryRequest;
  id: string;
};

// MainCategories
export type MainCategory = DefaultResponseType & {
  _id: string;
  categoryName: string;
  categoryStatus: Status;
  id: string;
  scheduledDate?: Date;
};

export type SortParams = {
  sortField: string;
  sortOrder: SortOrder;
};

export type CategoryParams = SortParams & {
  categoryName: string;
  categoryStatus: Status;
  createdAt: string;
};

export type UserParams = SortParams & {
  email: string;
  role: Roles;
  username: string;
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

export interface OrderItems {
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
  orders: OrderItems[];
  page: number;
  pages: number;
  success: boolean;
}
