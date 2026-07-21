import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { CheckoutResponse } from '../../app/api/apiTypes/cartApiTypes';
import { checkoutUrl } from '../../app/endpoints';

export const checkoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCheckout: builder.query<CheckoutResponse, void>({
      query: () => checkoutUrl,
      providesTags: [
        TagTypesEnum.Checkout,
        TagTypesEnum.Carts,
        TagTypesEnum.Profile,
      ],
    }),
  }),
});

export const { useGetCheckoutQuery } = checkoutApiSlice;
