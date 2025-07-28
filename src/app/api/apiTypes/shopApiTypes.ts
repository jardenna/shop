import type { BaseProduct, BaseProductParams } from './sharedApiTypes';

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

export type ProductMenuResponse = {
  categoryId: string;
  label: string;
};

export type ToggleFavoriteResponse = {
  isFavorite: boolean;
};

export type Favorites = {
  colors: string[];
  discount: number;
  id: string;
  images: string[];
  price: number;
  productName: string;
  sizes: string[];
};
