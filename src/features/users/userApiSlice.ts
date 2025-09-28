import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type {
  UpdateUserByIdRequest,
  UpdateUserByIdResponse,
  UserResponse,
} from '../../app/api/apiTypes/adminApiTypes';
import type { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import { userUrl } from '../../app/endpoints';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse[], void>({
      query: () => userUrl,
      providesTags: [TagTypesEnum.Auth],
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
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
