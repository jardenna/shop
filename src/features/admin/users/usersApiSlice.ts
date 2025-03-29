import apiSlice from '../../../app/api/apiSlice';
import {
  OmittedAuthResponse,
  UpdateUserByIdRequest,
  UpdateUserByIdResponse,
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
    updateUser: builder.mutation<UpdateUserByIdResponse, UpdateUserByIdRequest>(
      {
        query: ({ user, id }) => ({
          url: `${endpoint}/${id}`,
          method: 'PUT',
          body: user,
        }),
        invalidatesTags: [TagTypesEnum.Auth],
      },
    ),
    deleteUser: builder.mutation<OmittedAuthResponse, string>({
      query: (id) => ({
        url: `${endpoint}/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: [TagTypesEnum.Auth],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserBydQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;
