import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  AddToCartRequest,
  CartListResponse,
  GuestCardResponse,
  UpdateCartRequest,
} from '../../app/api/apiTypes/cartApiTypes';
import { cartUrl, guestCartUrl } from '../../app/endpoints';

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
    replaceCart: builder.mutation<CartListResponse, UpdateCartRequest>({
      query: ({ cartItemId, cartItem }) => ({
        url: `${cartUrl}/${cartItemId}`,
        method: 'PATCH',
        body: cartItem,
      }),
      invalidatesTags: [TagTypesEnum.Carts],
    }),
    getCarts: builder.query<CartListResponse, void>({
      query: () => cartUrl,
      providesTags: [TagTypesEnum.Carts],
    }),
    getGuestCart: builder.query<GuestCardResponse, string[]>({
      query: (body) => ({
        url: guestCartUrl,
        method: 'POST',
        body,
      }),
      providesTags: [TagTypesEnum.Carts],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartsQuery,
  useReplaceCartMutation,
  useGetGuestCartQuery,
} = cartApiSlice;
