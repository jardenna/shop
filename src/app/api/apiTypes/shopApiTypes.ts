import type {
  BaseProduct,
  BaseProductParams,
  DefaultResponseType,
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

export type ShopAllProductsResponse = {
  availableBrands: string[];
  availableSizes: Size[];
  page: number;
  pages: number;
  productCount: number;
  products: BaseProduct[];
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
  id: string;
  images: string[];
  price: number;
  productName: string;
  sizes: Size[];
};

// Profile
export type PreferredFashion =
  | 'mensFashion'
  | 'womensFashion'
  | 'kidsFashion'
  | 'noPreference';

type BaseAddress = {
  city: string;
  street: string;
  zipCode: string;
  country?: string;
  name?: string;
};

export type Address = BaseAddress & {
  id: string;
};

export type AddressInput = BaseAddress & {
  id: string | null;
};

export type AddAddressRequest = {
  address: AddressInput;
};

export type DeleteAddressRequest = {
  address: string;
};

export type UpdateAddressRequest = { address: AddressInput };

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
