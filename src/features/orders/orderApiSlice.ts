import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  CreateOrderRequest,
  CreateOrderResponse,
} from '../../app/api/apiTypes/orderApiTypes';
import { ordersUrl, userOrdersUrl } from '../../app/endpoints';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: ordersUrl,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TagTypesEnum.Order],
    }),
    getUserOrder: builder.query<any, void>({
      query: () => userOrdersUrl,
    }),
  }),
});

export const { useCreateOrderMutation, useGetUserOrderQuery } = orderApiSlice;
