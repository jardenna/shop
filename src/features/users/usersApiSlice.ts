import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  UpdateUserByIdRequest,
  UpdateUserByIdResponse,
  UserResponse,
} from '../../app/api/apiTypes/adminApiTypes';
import { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import { userUrl } from '../../app/endpoints';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse[], void>({
      query: () => userUrl,
      providesTags: [TagTypesEnum.Auth],
    }),
    getUserByd: builder.query<UserResponse, number>({
      query: (id) => `${userUrl}/${id}`,
    }),
    updateUser: builder.mutation<UpdateUserByIdResponse, UpdateUserByIdRequest>(
      {
        query: ({ user, id }) => ({
          url: `${userUrl}/${id}`,
          method: 'PUT',
          body: user,
        }),
        invalidatesTags: [TagTypesEnum.Auth],
      },
    ),
    deleteUser: builder.mutation<DefaultResponse, string>({
      query: (id) => ({
        url: `${userUrl}/${id}`,
        method: 'DELETE',
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
