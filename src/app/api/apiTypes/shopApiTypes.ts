import type { BaseProduct, BaseProductParams, Size } from './sharedApiTypes';

export type ShopProductsParams = BaseProductParams & {
  mainCategory?: string;
  subCategoryId?: string;
};

export type ShopAllProductsResponse = {
  page: number;
  pages: number;
  productCount: number;
  products: BaseProduct[];
};

export type ReviewsResponse = {
  message: string;
  success: boolean;
};

type Reviews = {
  comment: string;
  rating: number;
};

export type ReviewsRequest = {
  productId: string;
  reviews: Reviews;
};

export type ProductMenuResponse = {
  categoryId: string;
  label: string;
};

export type ToggleFavoriteResponse = {
  isFavorite: boolean;
};

export type ProductPreview = {
  brand: string;
  colors: string[];
  countInStock: number;
  discount: number;
  id: string;
  images: string[];
  price: number;
  productName: string;
  sizes: Size[];
};
