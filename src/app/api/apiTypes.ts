export type RoleTypes = 'Employee' | 'User';

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
export interface Category {
  categoryName: string;
  createdAt: Date;
  id: string;
  updatedAt: Date;
}

export interface CategoryResponse extends DefaultResponse {
  category: Category;
}

export interface CreateCategoryRequest {
  categoryName: string;
}

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}

export type FileUploadNameType = 'cover';
