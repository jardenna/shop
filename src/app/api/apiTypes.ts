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

// --- Base user fields shared across types ---
type EditableUserFields = {
  email: string;
  username: string;
  role?: RoleTypes;
};

type BaseUser = Required<EditableUserFields> & {
  id: string;
};

// --- Users ---
export type UserResponse = BaseUser & {
  isAdmin: boolean;
};

export type UpdateUserByIdResponse = BaseUser;

export type UpdateUserById = Partial<EditableUserFields>;

export type UpdateUserByIdRequest = {
  id: string;
  user: UpdateUserById;
};

export type UpdateUserRole = {
  role: RoleTypes;
};

export type UpdateUserRoleRequest = {
  user: UpdateUserRole;
  userId: string;
};

export type OmittedUserRequest = Omit<AuthRequest, 'username'>;

// --- Auth ---
export type AuthRequest = EditableUserFields & {
  password: string;
};

export type AuthResponse = DefaultResponse & {
  user: UserResponse;
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
  categoryId: string;
  categoryStatus: Status;
  label: string;
  parentCategoryName: string;
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
export type ProductSizes = 'S' | 'M' | 'L' | 'XL' | 'Onesize';

export type BaseProduct = {
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
  sizes: ProductSizes[];
  discount?: number;
};

export type Product = BaseProduct &
  DefaultResponseType & {
    category: Category;
    quantity: number;
    subCategory: SubCategory;
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

export type ProductBaseParams = {
  maxPrice?: string;
  maxStock?: string;
  minPrice?: string;
  minStock?: string;
  page?: string;
  pageSize?: string;
  productName?: string;
};

export type ProductsParams = ProductBaseParams & {
  productStatus?: Status;
  subCategory?: string;
};

export type ShopProductsParams = ProductBaseParams & {
  subCategoryId: string;
  mainCategory?: string;
};

export type ShopProductResponse = BaseProduct &
  DefaultResponseType & {
    categoryData: Category;
    createdAt: string;
    reviews: ReviewResponse[];
    subCategory: {
      category: string;
      id: string;
      name: string;
    };
  };

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
