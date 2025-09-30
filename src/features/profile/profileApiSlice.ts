import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { UserProfileResponse } from '../../app/api/apiTypes/sharedApiTypes';
import { profileUrl } from '../../app/endpoints';

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileResponse, void>({
      query: () => profileUrl,
      providesTags: [TagTypesEnum.Profile],
    }),
  }),
});

export const { useGetUserProfileQuery } = profileApiSlice;
