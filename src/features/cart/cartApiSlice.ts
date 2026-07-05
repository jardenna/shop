import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  AddToCartRequest,
  CartListRequest,
  CartListResponse,
} from '../../app/api/apiTypes/cartApiTypes';
import { cartUrl } from '../../app/endpoints';

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<CartListResponse, AddToCartRequest>({
      query: (cartItem) => ({
        url: cartUrl,
        method: 'POST',
        body: {
          cartItems: Array.isArray(cartItem) ? cartItem : [cartItem],
        },
      }),
      invalidatesTags: [TagTypesEnum.Carts],
    }),
    mergeCartList: builder.mutation<CartListResponse, CartListRequest>({
      query: (cartItem) => ({
        url: `${cartUrl}/merge`,
        method: 'POST',
        body: cartItem,
      }),
      invalidatesTags: [TagTypesEnum.Carts],
    }),
    getCarts: builder.query<CartListResponse, void>({
      query: () => cartUrl,
      providesTags: [TagTypesEnum.Carts],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useMergeCartListMutation,
  useGetCartsQuery,
} = cartApiSlice;
