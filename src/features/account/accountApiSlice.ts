import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import type {
  MyAccountRequest,
  MyAccountResponse,
} from '../../app/api/apiTypes/shopApiTypes';
import { profileUrl } from '../../app/endpoints';

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyAccount: builder.query<MyAccountResponse, void>({
      query: () => profileUrl,
      providesTags: [TagTypesEnum.Account],
    }),
    updateMyAccount: builder.mutation<MyAccountResponse, MyAccountRequest>({
      query: (address) => ({
        url: profileUrl,
        method: MethodsEnum.Put,
        body: address,
      }),
      invalidatesTags: [TagTypesEnum.Account],
    }),
  }),
});

export const { useGetMyAccountQuery, useUpdateMyAccountMutation } =
  accountApiSlice;
