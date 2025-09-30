import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import { userUrl } from '../../app/endpoints';

export const adminUserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse[], void>({
      query: () => userUrl,
      providesTags: [TagTypesEnum.Auth],
    }),
  }),
});

export const { useGetAllUsersQuery } = adminUserApiSlice;
