import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import { profileUrl } from '../../app/endpoints';

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUserProfile: builder.query<UserResponse[], void>({
      query: () => profileUrl,
      providesTags: [TagTypesEnum.Profile],
    }),
  }),
});

export const { useGetCurrentUserProfileQuery } = profileApiSlice;
