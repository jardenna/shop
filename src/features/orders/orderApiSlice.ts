import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  CreateOrderRequest,
  MyOrdersResponse,
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
    payOrder: builder.mutation({
      query: ({ orderId, ...payment }) => ({
        url: `${ordersUrl}/${orderId}/pay`,
        method: 'PUT',
        body: payment,
      }),
    }),
    getUserOrder: builder.query<MyOrdersResponse[], void>({
      query: () => userOrdersUrl,
    }),
    getOrderById: builder.query<OrderResponse, string>({
      query: (id) => `${ordersUrl}/${id}`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrderQuery,
  usePayOrderMutation,
  useGetOrderByIdQuery,
} = orderApiSlice;
