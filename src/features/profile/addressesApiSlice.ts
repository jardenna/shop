import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { BaseAddress } from '../../app/api/apiTypes/sharedApiTypes';
import {
  AddAddressRequest,
  UpdateAddressRequest,
} from '../../app/api/apiTypes/shopApiTypes';
import { addressUrl } from '../../app/endpoints';

export const addressesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query<any, void>({
      query: () => addressUrl,
      providesTags: [TagTypesEnum.Address],
    }),
    addAddress: builder.mutation<BaseAddress, AddAddressRequest>({
      query: (address) => ({
        url: addressUrl,
        method: 'POST',
        body: address,
      }),
      invalidatesTags: [TagTypesEnum.Address],
    }),
    updateAddress: builder.mutation<BaseAddress, UpdateAddressRequest>({
      query: ({ address, id }) => ({
        url: `${addressUrl}/${id}`,
        method: 'PATCH',
        body: { address },
      }),
      invalidatesTags: [TagTypesEnum.Address],
    }),
    deleteAddress: builder.mutation<BaseAddress, string>({
      query: (id) => ({
        url: `${addressUrl}/${id}`,
        method: 'DELETE',
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
