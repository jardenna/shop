import apiSlice from '../../../app/api/apiSlice';
import {
  OmittedAuthResponse,
  UpdateUserRoleRequest,
  UserResponse,
} from '../../../app/api/apiTypes';
import { userEndpoints } from '../../../app/endpoints';
import { TagTypesEnum } from '../../../types/enums';

const endpoint = userEndpoints.users;

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse[], void>({
      query: () => endpoint,
      providesTags: [TagTypesEnum.Auth],
    }),
    getUserByd: builder.query<UserResponse, number>({
      query: (id) => `${endpoint}/${id}`,
    }),
    deleteUser: builder.mutation<OmittedAuthResponse, string>({
      query: (id) => ({
        url: `${endpoint}/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: [TagTypesEnum.Auth],
    }),
    updateUserRole: builder.mutation<UserResponse, UpdateUserRoleRequest>({
      query: (data) => ({
        url: `${endpoint}/${data.userId}`,
        method: 'PUT',
        body: data.role,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserBydQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = usersApiSlice;
