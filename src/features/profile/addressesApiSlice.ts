import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  AddAddressRequest,
  DeleteAddressRequest,
  UpdateAddressRequest,
  UserProfileResponse,
} from '../../app/api/apiTypes/shopApiTypes';
import { addressUrl } from '../../app/endpoints';

export const addressesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query<any, void>({
      query: () => addressUrl,
      providesTags: [TagTypesEnum.Address],
    }),
    addAddress: builder.mutation<UserProfileResponse, AddAddressRequest>({
      query: (address) => ({
        url: addressUrl,
        method: 'POST',
        body: address,
      }),
      invalidatesTags: [TagTypesEnum.Address],
    }),
    updateAddress: builder.mutation<UserProfileResponse, UpdateAddressRequest>({
      query: (address) => ({
        url: addressUrl,
        method: 'PATCH',
        body: address,
      }),
      invalidatesTags: [TagTypesEnum.Address],
    }),
    deleteAddress: builder.mutation<UserProfileResponse, DeleteAddressRequest>({
      query: (id) => ({
        url: addressUrl,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: [TagTypesEnum.Address],
    }),
  }),
});

export const {
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useAddAddressMutation,
  useGetAddressesQuery,
} = addressesApiSlice;
