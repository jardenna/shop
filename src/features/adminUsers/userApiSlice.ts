import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import { UserParams } from '../../app/api/apiTypes/adminApiTypes';
import type { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import {
  BaseUser,
  UpdateUserByIdRequest,
  UserResponse,
} from '../../app/api/apiTypes/userApiTypes';
import { userUrl } from '../../app/endpoints';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse[], UserParams>({
      query: (params) => ({
        url: userUrl,
        params,
      }),
      providesTags: [TagTypesEnum.Auth],
    }),
    updateUser: builder.mutation<BaseUser, UpdateUserByIdRequest>({
      query: ({ user, id }) => ({
        url: `${userUrl}/${id}`,
        method: MethodsEnum.Put,
        body: user,
      }),
      invalidatesTags: [TagTypesEnum.Auth],
    }),
    deleteUser: builder.mutation<DefaultResponse, string>({
      query: (id) => ({
        url: `${userUrl}/${id}`,
        method: MethodsEnum.Delete,
      }),
      invalidatesTags: [TagTypesEnum.Auth],
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
} = userApiSlice;
