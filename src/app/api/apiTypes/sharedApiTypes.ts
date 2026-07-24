import { mainCategoryValues, subCategoryValues } from '../apiConstants';
import type { Status } from './adminApiTypes';

export type CurrencyResponse = {
  data: Record<string, { value: number }>;
};

export type DefaultResponse = {
  message: string;
  success: boolean;
};

export type DefaultResponseType = {
  createdAt: Date;
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
  '40' | '41' | '42' | '43' | '44' | '45' | '46' | 'Onesize';

export type WomenShoesSizes =
  '36' | '37' | '38' | '39' | '40' | '41' | '42' | 'Onesize';

export type ClothingSizes = 'S' | 'M' | 'L' | 'XL';

export type Size =
  KidsShoesSizes | MenShoesSizes | WomenShoesSizes | ClothingSizes;

export type MainCategoryNames = (typeof mainCategoryValues)[number];

export type SubCategoryNames = (typeof subCategoryValues)[number];

export type SortOrder = 'asc' | 'desc';

export type BaseShopProduct = DefaultResponseType & {
  brand: string;
  categoryName: MainCategoryNames;
  colors: string[];
  countInStock: number;
  description: string;
  discount: number;
  discountedPrice: number;
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
  subCategoryName: SubCategoryNames;
};

export type BaseProductParams = {
  page?: string;
  productName?: string;
  productsPerPage?: number;
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
  productCount: number;
};

export interface Summary {
  discountPrice: number;
  promoDiscount: number;
  shippingPrice: number;
  subTotal: number;
  taxPrice: number;
  totalPrice: number;
}

export interface Discount {
  code: string;
  label: string;
  percent: number;
}
