export interface UserRequest {
  email: string;
  isAdmin: boolean;
  password: string;
  username: string;
}

export interface AuthResponse {
  message: string;
  success: boolean;
  user: UserRequest;
}
