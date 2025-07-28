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
export type KidsShoesSizes =
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31'
  | '32'
  | '33'
  | '34'
  | 'Onesize';

export type MenShoesSizes =
  | '40'
  | '41'
  | '42'
  | '43'
  | '44'
  | '45'
  | '46'
  | 'Onesize';

export type WomenShoesSizes =
  | '36'
  | '37'
  | '38'
  | '39'
  | '40'
  | '41'
  | '42'
  | 'Onesize';

export type Size =
  | KidsShoesSizes
  | MenShoesSizes
  | WomenShoesSizes
  | ClothingSizes;

export type ClothingSizes = 'S' | 'M' | 'L' | 'XL';
export type MainKey = 'Men' | 'Women' | 'Kids';
export type SubKey = 'Shoes' | 'Accessories' | 'Clothing';

export type BaseProduct = DefaultResponseType & {
  brand: string;
  categoryName: MainKey;
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
  sizes: Size[];
  subCategoryName: SubKey;
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
