import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  AddToCartRequest,
  BaseOrder,
  CartListResponse,
  GuestCardResponse,
  UpdateCartQtyRequest,
  UpdateCartRequest,
} from '../../app/api/apiTypes/cartApiTypes';
import { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import { QtyResponse } from '../../app/api/apiTypes/shopApiTypes';
import {
  cartUrl,
  guestCartUrl,
  promoCodeurl,
  qtyCartUrl,
} from '../../app/endpoints';

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
    deleteCartItem: builder.mutation<DefaultResponse, string>({
      query: (cartItemId) => ({
        url: `${cartUrl}/${cartItemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypesEnum.Carts],
    }),
    deleteCart: builder.mutation<DefaultResponse, void>({
      query: () => ({
        url: cartUrl,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypesEnum.Carts],
    }),
    getCart: builder.query<CartListResponse, void>({
      query: () => cartUrl,
      providesTags: [TagTypesEnum.Carts],
    }),
    getGuestCart: builder.query<GuestCardResponse, BaseOrder[]>({
      query: (body) => ({
        url: guestCartUrl,
        method: 'POST',
        body,
      }),
      providesTags: [TagTypesEnum.Carts],
    }),
    updateQty: builder.mutation<DefaultResponse, UpdateCartQtyRequest>({
      query: ({ cartItemId, qty }) => ({
        url: `${cartUrl}/${cartItemId}/quantity`,
        method: 'PATCH',
        body: { qty },
      }),
      invalidatesTags: [TagTypesEnum.Carts],
    }),
    applyPromoCode: builder.mutation<CartListResponse, string>({
      query: (promoCode) => ({
        url: promoCodeurl,
        method: 'PATCH',
        body: { promoCode },
      }),
      invalidatesTags: [TagTypesEnum.Carts],
    }),
    getTotalQty: builder.query<QtyResponse, void>({
      query: () => qtyCartUrl,
      providesTags: [TagTypesEnum.Carts],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useReplaceCartMutation,
  useGetGuestCartQuery,
  useDeleteCartItemMutation,
  useUpdateQtyMutation,
  useApplyPromoCodeMutation,
  useDeleteCartMutation,
  useGetTotalQtyQuery,
} = cartApiSlice;
