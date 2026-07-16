import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { CheckoutResponse } from '../../app/api/apiTypes/cartApiTypes';
import { checkoutUrl } from '../../app/endpoints';

export const checkoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCheckout: builder.query<CheckoutResponse, string | undefined>({
      query: (promoCode) => ({
        url: checkoutUrl,
        params: promoCode ? { promoCode } : undefined,
      }),
      providesTags: [TagTypesEnum.Checkout, TagTypesEnum.Carts],
    }),
  }),
});

export const { useGetCheckoutQuery } = checkoutApiSlice;
