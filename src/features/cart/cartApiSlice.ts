import apiSlice from '../../app/api/apiSlice';
import {
  CreateCartRequest,
  CreateCartResponse,
} from '../../app/api/apiTypes/cartApiTypes';
import { cartUrl } from '../../app/endpoints';

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<CreateCartResponse, CreateCartRequest>({
      query: (cartItem) => ({
        url: cartUrl,
        method: 'POST',
        body: cartItem,
      }),
    }),
  }),
});

export const { useAddToCartMutation } = cartApiSlice;
