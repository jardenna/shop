export interface UserRequest {
  email: string;
  password: string;
  username: string;
}

export interface AuthResponse {
  message: string;
  success: boolean;
  user: UserRequest;
}
