export type RoleTypes = 'Employee' | 'User';
export type Status = 'Published' | 'Inactive' | 'Scheduled';

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

// Products
export type ProductSizes = 'S' | 'M' | 'L' | 'XL' | 'Onesize';

export type BaseProduct = DefaultResponseType & {
  brand: string;
  colors: string[];
  countInStock: number;
  description: string;
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
  discount?: number;
};

export type ProductBaseParams = {
  maxPrice?: string;
  maxStock?: string;
  minPrice?: string;
  minStock?: string;
  page?: string;
  pageSize?: string;
  productName?: string;
};

export type ProductMenu = {
  categoryId: string;
  label: string;
};

export type ProductMenuResponse = {
  data: ProductMenu[];
  success: boolean;
};

export type ProductsParams = ProductBaseParams & {
  productStatus?: Status;
  subCategory?: string;
};

export type ShopProductsParams = ProductBaseParams & {
  mainCategory?: string;
  subCategoryId?: string;
};

export type ShopProductResponse = BaseProduct & {
  categoryData: Category;

  subCategory: {
    category: string;
    id: string;
    name: string;
  };
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
