import apiSlice from '../../../app/api/apiSlice';
import { UserResponse } from '../../../app/api/apiTypes';
import { userEndpoints } from '../../../app/endpoints';
import { TagTypesEnum } from '../../../types/types';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse[], void>({
      query: () => userEndpoints.users,
      providesTags: [TagTypesEnum.Auth],
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApiSlice;
