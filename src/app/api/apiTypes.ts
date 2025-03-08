export interface UserResponse {
  email: string;
  id: string;
  isAdmin: boolean;
  username: string;
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
export interface LogoutResponse {
  message: string;
  success: boolean;
}

export type FileUploadNameType = 'cover';
