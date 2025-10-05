import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type {
  UpdateAddressRequest,
  UserProfileRequest,
  UserProfileResponse,
} from '../../app/api/apiTypes/shopApiTypes';
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
      query: (address) => ({
        url: profileUrl,
        method: 'PUT',
        body: address,
      }),
      invalidatesTags: [TagTypesEnum.Profile],
    }),
    addAddress: builder.mutation<UserProfileResponse, any>({
      query: (address) => ({
        url: profileUrl,
        method: 'put',
        body: address,
      }),
      invalidatesTags: [TagTypesEnum.Profile],
    }),
    updateAddress: builder.mutation<UserProfileResponse, UpdateAddressRequest>({
      query: (address) => ({
        url: profileUrl,
        method: 'PUT',
        body: address,
      }),
      invalidatesTags: [TagTypesEnum.Profile],
    }),
    deleteAddress: builder.mutation<any, any>({
      query: (id) => ({
        url: profileUrl,
        method: 'PUT',
        body: id,
      }),
      invalidatesTags: [TagTypesEnum.Profile],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useAddAddressMutation,
} = profileApiSlice;
