import { Address } from './addressApiTypes';
import type {
  BasePagination,
  BaseProductParams,
  BaseShopProduct,
  DefaultResponseType,
  MainCategoryNames,
  Size,
} from './sharedApiTypes';

export type BaseShopProductsParams = {
  brand?: string[];
  colors?: string[];
  sizes?: string[];
};

export type ShopProductsParams = BaseProductParams &
  BaseShopProductsParams & {
    mainCategory?: string;
    maxPrice?: string;
    minPrice?: string;
    subCategoryId?: string;
  };

export type ShopAllProductsResponse = BasePagination & {
  availableBrands: string[];
  availableSizes: Size[];
  products: BaseShopProduct[];
  totalCount: number;
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
  discountedPrice: number;
  id: string;
  image: string;
  price: number;
  productName: string;
  sizes: Size[];
};

export interface BaseProductFormData {
  categoryName: MainCategoryNames;
  colors: string[];
  sizes: Size[];
  countInStock?: number;
}

export interface ProductFormData extends BaseProductFormData {
  countInStock: number;
  id: string;
}

export type GetFavoritesResponse = ProductPreview & {
  categoryName: MainCategoryNames;
};

// Profile
export type PreferredFashion =
  'mensFashion' | 'womensFashion' | 'kidsFashion' | 'noPreference';

export type UserProfileResponse = DefaultResponseType &
  BaseProfile & {
    addresses: Address[];
    favorites: string[];
    id: string;
  };

export type BaseProfile = {
  dateOfBirth: string;
  email: string;
  phoneNo: string;
  preferredFashion: PreferredFashion;
  username: string;
};

export type UserProfileRequest = BaseProfile & {
  addresses?: Address[];
};
