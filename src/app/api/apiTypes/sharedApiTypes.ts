import { Status } from './adminApiTypes';

export type CurrencyResponse = {
  data: Record<string, { value: number }>;
};

export type DefaultResponse = {
  message: string;
  success: boolean;
};

export type DefaultResponseType = {
  createdAt: Date;
  reviews: ReviewResponse[];
  updatedAt: Date;
  message?: string;
  success?: boolean;
};

// Products
export type ProductSizes = 'S' | 'M' | 'L' | 'XL' | 'Onesize';

export type BaseProduct = DefaultResponseType & {
  brand: string;
  colors: string[];
  countInStock: number;
  description: string;
  discount: number;
  id: string;
  images: string[];
  material: string;
  numReviews: number;
  price: number;
  productName: string;
  productStatus: Status;
  rating: number;
  reviews: ReviewResponse[];
  sizes: ProductSizes[];
};

export type BaseProductParams = {
  maxPrice?: string;
  maxStock?: string;
  minPrice?: string;
  minStock?: string;
  page?: string;
  pageSize?: string;
  productName?: string;
};

export type ReviewResponse = DefaultResponseType & {
  comment: string;
  id: string;
  name: string;
  rating: number;
  user: string;
};

export type ReviewRequest = {
  comment: string;
  rating: number;
};

export type BasePagination = {
  page: number;
  pages: number;
};
