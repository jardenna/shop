import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  CreateOrderRequest,
  OrderResponse,
} from '../../app/api/apiTypes/orderApiTypes';
import { ordersUrl, userOrdersUrl } from '../../app/endpoints';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: ordersUrl,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TagTypesEnum.Order],
    }),
    getUserOrder: builder.query<OrderResponse, void>({
      query: () => userOrdersUrl,
    }),
  }),
});

export const { useCreateOrderMutation, useGetUserOrderQuery } = orderApiSlice;
