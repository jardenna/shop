export type RoleTypes = 'Employee' | 'User';

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

export interface AuthResponse {
  message: string;
  success: boolean;
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

interface Category {
  createdAt: Date;
  id: string;
  name: string;
}
export interface CreateCategoryResponse {
  category: Category;
  message: string;
  success: boolean;
}

export interface CreateCategoryRequest {
  name: string;
}

export type FileUploadNameType = 'cover';
