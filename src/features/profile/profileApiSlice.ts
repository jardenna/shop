import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type {
  UserProfileRequest,
  UserProfileResponse,
} from '../../app/api/apiTypes/sharedApiTypes';
import { profileUrl } from '../../app/endpoints';

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileResponse, void>({
      query: () => profileUrl,
      providesTags: [TagTypesEnum.Profile],
    }),
    updateUserProfile: builder.mutation<
      UserProfileResponse,
      UserProfileRequest
    >({
      query: (params) => ({
        url: profileUrl,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: [TagTypesEnum.Profile],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } =
  profileApiSlice;
