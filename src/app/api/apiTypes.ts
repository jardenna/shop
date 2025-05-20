export type RoleTypes = 'Employee' | 'User';
export type Status = 'Published' | 'Inactive' | 'Scheduled';

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
  role?: RoleTypes;
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

// SubCategories
export type CreateSubCategoryRequest = {
  category: string;
  categoryStatus: Status;
  subCategoryName: string;
  scheduledDate?: Date;
};

export type MainCategory = {
  categoryName: string;
  categoryStatus: Status;
  id: string;
  scheduledDate?: Date;
};

export type SubCategory = DefaultResponseType & {
  _id: string;
  category: MainCategory;
  categoryStatus: Status;
  id: string;
  productCount: number;
  subCategoryName: string;
  scheduledDate?: Date;
};

export type SubCategoryResponse = DefaultResponseType & {
  categoryStatus: Status;
  id: string;
  mainCategory: MainCategory;
  mainCategoryName: string;
  productCount: number;
  subCategoryName: string;
  scheduledDate?: Date;
};

export type SubCategoriesResponse = DefaultResponseType & {
  subCategories: SubCategoryResponse[];
};

export type SubCategoriesWithParent = {
  categoryStatus: Status;
  label: string;
  parentCategoryName: string;
  value: string;
};

export type UpdateSubCategoryResponse = {
  category: Category;
  subCategory: SubCategoryResponse;
};

export type UpdateSubCategoryRequest = {
  id: string;
  subCategory: CreateSubCategoryRequest;
};

// Products
export type ProductSizes = 'S' | 'M' | 'L' | 'XL';

export type Product = DefaultResponseType & {
  brand: string;
  category: Category;
  colors: string[] | [];
  countInStock: number;
  description: string;
  id: string;
  images: string[];
  material: string;
  numReviews: number;
  price: number;
  productName: string;
  productStatus: Status;
  quantity: number;
  rating: number;
  sizes: ProductSizes[] | [];
  subCategory: SubCategory;
  discount?: number;
  scheduledDate?: Date;
};

export type OmittedProduct = Omit<
  Product,
  | 'createdAt'
  | 'reviews'
  | 'updatedAt'
  | 'id'
  | 'category'
  | 'countInStock'
  | 'numReviews'
  | 'rating'
  | 'subCategory'
>;

export type ProductRequest = OmittedProduct & {
  subCategory: string;
};

export type UpdateProductRequest = {
  id: string;
  product: ProductRequest;
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

export type AllPaginatedProductsResponse = {
  hasMore: boolean;
  page: number;
  pages: number;
  products: Product[];
};

export type AllSortedProductsResponse = Omit<
  AllPaginatedProductsResponse,
  'page' | 'pages' | 'hasMore'
>;

export type GetSortedProductsResponse = DefaultResponseType & {
  category: Category;
  product: Product[];
};

export type FileName = 'images';
