import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import {
  CreateOrderRequest,
  MyOrdersResponse,
  OrderResponse,
} from '../../app/api/apiTypes/orderApiTypes';
import { PayOrderRequest } from '../../app/api/apiTypes/paymentApiTypes';
import { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import { ordersUrl, userOrdersUrl } from '../../app/endpoints';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: ordersUrl,
        method: MethodsEnum.Post,
        body,
      }),
      invalidatesTags: [TagTypesEnum.Order],
    }),
    payOrder: builder.mutation<OrderResponse, PayOrderRequest>({
      query: ({ orderId, ...payment }) => ({
        url: `${ordersUrl}/${orderId}/pay`,
        method: MethodsEnum.Put,
        body: payment,
      }),
    }),
    cancelMyOrder: builder.mutation<DefaultResponse, string>({
      query: (id) => ({
        url: `${ordersUrl}/${id}/cancel`,
        method: MethodsEnum.Patch,
      }),
      invalidatesTags: [TagTypesEnum.Order],
    }),
    getUserOrder: builder.query<MyOrdersResponse[], void>({
      query: () => userOrdersUrl,
    }),
    getOrderById: builder.query<OrderResponse, string>({
      query: (id) => `${ordersUrl}/${id}`,
      extraOptions: {
        skipErrorToast: true,
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrderQuery,
  usePayOrderMutation,
  useGetOrderByIdQuery,
  useCancelMyOrderMutation,
} = orderApiSlice;
