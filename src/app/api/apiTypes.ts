export type RoleTypes = 'Employee' | 'User';

export type DefaultResponseType = {
  createdAt: Date;
  reviews: ReviewResponse[];
  updatedAt: Date;
  message?: string;
  success?: boolean;
};

export type DefaultResponse = {
  message: string;
  success: boolean;
};

export type UserResponse = {
  email: string;
  id: string;
  isAdmin: boolean;
  role: RoleTypes;
  username: string;
};

export type UpdateUserRoleRequest = {
  role: RoleTypes;
  userId: string;
};

export type AuthRequest = {
  email: string;
  password: string;
  username: string;
};

export type OmittedUserRequest = Omit<AuthRequest, 'username'>;

export type AuthResponse = DefaultResponse & {
  user: UserResponse;
};

export type CurrencyResponse = {
  data: Record<string, { value: number }>;
};

export type UpdateUserByIdResponse = {
  email: string;
  id: string;
  role: RoleTypes;
  username: string;
};

export type UpdateUserById = {
  email?: string;
  role?: RoleTypes;
  username?: string;
};

export type UpdateUserByIdRequest = {
  id: string;
  user: UpdateUserById;
};

// Category
export type CategoryStatus = 'Published' | 'Inactive' | 'Scheduled';

export type Category = DefaultResponseType & {
  categoryName: string;
  categoryStatus: CategoryStatus;
  id: string;
  scheduledDate?: Date;
};

export type CategoriesResponse = DefaultResponse & {
  categories: Category[];
};

export type CreateCategoryRequest = {
  categoryName: string;
  categoryStatus: CategoryStatus;
  scheduledDate?: Date;
};

export type CategoryItemResponse = DefaultResponseType & {
  category: Category;
};

export type UpdateCategoryRequest = {
  category: CreateCategoryRequest;
  id: string;
};

// SubCategories
export type CreateSubCategoryRequest = {
  category: string;
  categoryStatus: CategoryStatus;
  subCategoryName: string;
  scheduledDate?: Date;
};

export type MainCategory = {
  categoryName: string;
  categoryStatus: CategoryStatus;
  id: string;
  scheduledDate?: Date;
};

export type SubCategory = DefaultResponseType & {
  categoryStatus: CategoryStatus;
  id: string;
  mainCategory: MainCategory;
  productCount: number;
  subCategoryName: string;
  scheduledDate?: Date;
};

export type Test = {
  id: string;
  subCategory: CreateSubCategoryRequest;
};

export type SubCategoryResponse = DefaultResponseType & {
  subCategories: SubCategory[];
};

export type UpdateSubCategoryResponse = {
  category: Category;
  subCategory: SubCategory;
};

// Products
export type ProductSizes = 'S' | 'M' | 'L' | 'XL';

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

export type FileUploadNameType = 'image';
