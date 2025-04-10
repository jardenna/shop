export type RoleTypes = 'Employee' | 'User';

export type DefaultResponseType = {
  createdAt: Date;
  reviews: ReviewResponse[];
  updatedAt: Date;
  message?: string;
  success?: boolean;
};

interface DefaultResponse {
  message: string;
  success: boolean;
}

export interface UserResponse {
  email: string;
  id: string;
  isAdmin: boolean;
  role: RoleTypes;
  username: string;
}

export interface UpdateUserRoleRequest {
  role: string;
  userId: string;
}

export interface AuthRequest {
  email: string;
  password: string;
  username: string;
}

export type OmittedUserRequest = Omit<AuthRequest, 'username'>;

export interface AuthResponse extends DefaultResponse {
  user: UserResponse;
}

export type OmittedAuthResponse = Omit<AuthRequest, 'user'>;

export interface CurrencyResponse {
  data: Record<string, { value: number }>;
}

export interface UpdateUserByIdResponse {
  email: string;
  id: string;
  role: RoleTypes;
  username: string;
}

export interface UpdateUserById {
  email?: string;
  role?: RoleTypes;
  username?: string;
}

export interface UpdateUserByIdRequest {
  id: string;
  user: UpdateUserById;
}

// Category
export type CategoryStatus = 'Published' | 'Inactive' | 'Scheduled';

export type Category = DefaultResponseType & {
  categoryName: string;
  categoryStatus: CategoryStatus;
  id: string;
  scheduledDate?: Date;
};

export interface CategoryResponse extends DefaultResponse {
  categories: Category[];
}

export type CategoryRequest = {
  categoryName: string;
  categoryStatus: CategoryStatus;
  scheduledDate?: Date;
};

export type UpdateCategoryResponse = DefaultResponseType & {
  category: Category;
};

export type UpdateCategoryRequest = {
  category: CategoryRequest;
  id: string;
};
// Products
export type ProductSizes = 'S' | 'M' | 'L' | 'XL';

export type SubCategory = DefaultResponseType & {
  category: string;
  categoryStatus: CategoryStatus;
  id: string;
  subCategoryName: string;
  scheduledDate?: Date;
};

export type SubCategoryResponse = DefaultResponseType & {
  subCategories: SubCategory[];
};

export type ProductResponse = DefaultResponseType & {
  brand: string;
  category: Category;
  colors: string[];
  countInStock: number;
  description: string;
  id: string;
  image: string;
  material: string;
  price: number;
  productName: string;
  quantity: number;
  sizes: ProductSizes;
  subCategory: SubCategory;
  discount?: number;
};

export type ProductRequest = Omit<ProductResponse, 'id'>;

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

export type AllPaginatedProductsResponse = {
  hasMore: boolean;
  page: number;
  pages: number;
  products: ProductResponse[];
};

export type AllSortedProductsResponse = Omit<
  AllPaginatedProductsResponse,
  'page' | 'pages' | 'hasMore'
>;

export type GetSortedProductsResponse = DefaultResponseType & {
  category: Category;
  product: ProductResponse[];
};

export type CreateSubCategoriesRequest = {
  category: string;
  subCategoryName: string;
};

export type CreateSubCategoriesResponse = DefaultResponseType & {
  _id: string;
  category: string;
  subCategoryName: string;
};

export type GetSubCategoriesResponse = DefaultResponseType & {
  _id: string;
  category: Category;
  subCategoryName: string;
};

export type FileUploadNameType = 'image';
