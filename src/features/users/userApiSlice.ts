import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type {
  UpdateUserByIdRequest,
  UpdateUserByIdResponse,
} from '../../app/api/apiTypes/adminApiTypes';
import type { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import { userUrl } from '../../app/endpoints';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useDeleteUserMutation, useUpdateUserMutation } = userApiSlice;
