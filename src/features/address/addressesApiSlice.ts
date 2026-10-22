import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import {
  AddAddressRequest,
  Address,
  BaseAddress,
  UpdateAddressRequest,
} from '../../app/api/apiTypes/addressApiTypes';

import { addressUrl } from '../../app/endpoints';

export const addressesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query<Address[], void>({
      query: () => addressUrl,
      providesTags: [TagTypesEnum.Address],
    }),
    addAddress: builder.mutation<BaseAddress, AddAddressRequest>({
      query: (address) => ({
        url: addressUrl,
        method: MethodsEnum.Post,
        body: address,
      }),
      invalidatesTags: [TagTypesEnum.Address],
    }),
    updateAddress: builder.mutation<BaseAddress, UpdateAddressRequest>({
      query: ({ address, id }) => ({
        url: `${addressUrl}/${id}`,
        method: MethodsEnum.Patch,
        body: { address },
      }),
      invalidatesTags: [TagTypesEnum.Address],
    }),
    deleteAddress: builder.mutation<BaseAddress, string>({
      query: (id) => ({
        url: `${addressUrl}/${id}`,
        method: MethodsEnum.Delete,
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
