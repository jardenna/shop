export type RoleTypes = 'Admin' | 'Employee' | 'User';

export interface UserResponse {
  createdAt: Date;
  email: string;
  id: string;
  isAdmin: boolean;
  role: RoleTypes;
  updatedAt: Date;
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

export type FileUploadNameType = 'cover';
