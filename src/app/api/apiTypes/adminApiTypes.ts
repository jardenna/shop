import {
  BasePagination,
  BaseProduct,
  BaseProductParams,
  DefaultResponse,
  DefaultResponseType,
} from './sharedApiTypes';

export type RoleTypes = 'Employee' | 'User';
export type Status = 'Published' | 'Inactive' | 'Scheduled';

// --- Users ---
type EditableUserFields = {
  email: string;
  username: string;
  role?: RoleTypes;
};

type BaseUser = Required<EditableUserFields> & {
  id: string;
};

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
  translationKey: string;
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
  translationKey: string;
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
export type Product = BaseProduct & {
  category: Category;
  quantity: number;
  subCategory: SubCategory;
  scheduledDate?: Date;
};

type OmittedAdminProduct = Omit<
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

export type ProductsParams = BaseProductParams & {
  productStatus?: Status;
  subCategory?: string;
};

export type ShopProductsParams = BaseProductParams & {
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

export type ProductRequest = OmittedAdminProduct & {
  subCategory: string;
};

export type UpdateProductRequest = {
  id: string;
  product: ProductRequest;
};

export type AllPaginatedProductsResponse = BasePagination & {
  hasMore: boolean;
  products: Product[];
};

export type AllSortedProductsResponse = { products: Product[] };

export type GetSortedProductsResponse = DefaultResponseType & {
  category: Category;
  product: Product[];
};

export type FileName = 'images';
