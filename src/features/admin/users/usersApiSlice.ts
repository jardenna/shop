import apiSlice from '../../../app/api/apiSlice';
import { UpdateUserRoleRequest, UserResponse } from '../../../app/api/apiTypes';
import { userEndpoints } from '../../../app/endpoints';
import { TagTypesEnum } from '../../../types/enums';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse[], void>({
      query: () => userEndpoints.users,
      providesTags: [TagTypesEnum.Auth],
    }),
    getUserByd: builder.query<UserResponse, number>({
      query: (id) => `${userEndpoints.users}/${id}`,
    }),
    updateUserRole: builder.mutation<UserResponse, UpdateUserRoleRequest>({
      query: (data) => ({
        url: `${userEndpoints.users}/${data.userId}`,
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
} = usersApiSlice;
