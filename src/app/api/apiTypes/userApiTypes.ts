import { OmitChecked } from '../../../types/types';
import { Roles, SortParams } from './AdminApiTypes';
import { DefaultResponse } from './sharedApiTypes';

// --- Users ---
type EditableUserFields = {
  email: string;
  username: string;
  role?: Roles;
};

export type BaseUser = Required<EditableUserFields> & {
  id: string;
};

export interface UserResponse extends BaseUser {
  isAdmin: boolean;
}

export type UpdateUserById = Partial<EditableUserFields>;

export interface UpdateUserByIdRequest {
  id: string;
  user: UpdateUserById;
}

export interface UpdateUserRole {
  role: Roles;
}

export interface UpdateUserRoleRequest {
  user: UpdateUserRole;
  userId: string;
}

export type OmittedUserRequest = OmitChecked<AuthRequest, 'username'>;

// --- Auth ---
export type AuthRequest = EditableUserFields & {
  password: string;
};

export type AuthResponse = DefaultResponse & {
  user: UserResponse;
};

export interface UserParams extends SortParams {
  email: string;
  role: Roles;
  username: string;
}
