import type {
  BaseProduct,
  BaseProductParams,
  DefaultResponseType,
  Size,
} from './sharedApiTypes';

export type ShopProductsParams = BaseProductParams & {
  brand?: string;
  colors?: string;
  mainCategory?: string;
  maxPrice?: string;
  minPrice?: string;
  sizes?: string;
  subCategoryId?: string;
};

export type ShopAllProductsResponse = {
  availableBrands: string[];
  availableSizes: Size[];
  page: number;
  pages: number;
  productCount: number;
  products: BaseProduct[];
};

export type ReviewsResponse = {
  message: string;
  success: boolean;
};

export type Reviews = {
  comment: string;
  rating: number;
};

export type DisplyReviews = DefaultResponseType & {
  comment: string;
  createdAt: Date;
  name: string;
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
