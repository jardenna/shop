import type {
  BaseProduct,
  BaseProductParams,
  ProductSizes,
} from './sharedApiTypes';

export type ShopProductsParams = BaseProductParams & {
  mainCategory?: string;
  subCategoryId?: string;
};

export type ShopProductResponse = {
  page: number;
  pages: number;
  productCount: number;
  products: BaseProduct[];
  success: boolean;
};

type ProductMenu = {
  categoryId: string;
  label: string;
};

export type ProductMenuResponse = {
  data: ProductMenu[];
  success: boolean;
};

export type PostFavoritesResponse = {
  isFavorite: boolean;
};

export type Favorites = {
  colors: string[];
  discount: number;
  id: string;
  images: string[];
  price: number;
  productName: string;
  sizes: ProductSizes[];
};

export type GetFavoritesResponse = {
  favorites: Favorites[];
};
