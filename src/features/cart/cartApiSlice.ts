import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  AddToCartRequest,
  BaseCartItem,
  CartListResponse,
  GuestCardResponse,
  UpdateCartRequest,
} from '../../app/api/apiTypes/cartApiTypes';
import { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
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
    deleteCart: builder.mutation<DefaultResponse, string>({
      query: (cartItemId) => ({
        url: `${cartUrl}/${cartItemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypesEnum.Carts],
    }),
    getCart: builder.query<CartListResponse, void>({
      query: () => cartUrl,
      providesTags: [TagTypesEnum.Carts],
    }),
    getGuestCart: builder.query<GuestCardResponse, BaseCartItem[]>({
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
  useGetCartQuery,
  useReplaceCartMutation,
  useGetGuestCartQuery,
  useDeleteCartMutation,
} = cartApiSlice;
