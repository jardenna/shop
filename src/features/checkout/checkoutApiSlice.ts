import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { CartListResponse } from '../../app/api/apiTypes/cartApiTypes';
import { checkoutUrl } from '../../app/endpoints';

export const checkoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCheckout: builder.query<CartListResponse, void>({
      query: () => checkoutUrl,
      providesTags: [TagTypesEnum.Checkout, TagTypesEnum.Carts],
    }),
  }),
});

export const { useGetCheckoutQuery } = checkoutApiSlice;
