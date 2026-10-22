import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import {
  AdminOrderParams,
  AdminOrderResponse,
} from '../../app/api/apiTypes/adminOrderApiTypes';
import {
  OrderResponse,
  UpdateOrderRequest,
} from '../../app/api/apiTypes/orderApiTypes';
import { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import { adminOrdersUrl } from '../../app/endpoints';

export const adminOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdminOrders: builder.query<AdminOrderResponse, AdminOrderParams>({
      query: (params) => ({
        url: adminOrdersUrl,
        params,
      }),
    }),
    getAdminOrderById: builder.query<OrderResponse, string>({
      query: (orderId) => `${adminOrdersUrl}/${orderId}`,
      providesTags: (_result, _error, orderId) => [
        { type: TagTypesEnum.Order, id: orderId },
      ],
      extraOptions: {
        skipErrorToast: true,
      },
    }),
    updateOrder: builder.mutation<DefaultResponse, UpdateOrderRequest>({
      query: ({ orderId, status }) => ({
        url: `${adminOrdersUrl}/${orderId}/status`,
        method: MethodsEnum.Patch,
        body: { status },
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: TagTypesEnum.Order, id: orderId },
      ],
    }),
    cancelOrder: builder.mutation<DefaultResponse, string>({
      query: (orderId) => ({
        url: `${adminOrdersUrl}/${orderId}/cancel`,
        method: MethodsEnum.Patch,
      }),
      invalidatesTags: (_result, _error, orderId) => [
        { type: TagTypesEnum.Order, id: orderId },
      ],
    }),
    shipOrder: builder.mutation<DefaultResponse, string>({
      query: (orderId) => ({
        url: `${adminOrdersUrl}/${orderId}/send-order`,
        method: MethodsEnum.Patch,
      }),
      invalidatesTags: (_result, _error, orderId) => [
        { type: TagTypesEnum.Order, id: orderId },
      ],
    }),
  }),
});

export const {
  useGetAllAdminOrdersQuery,
  useGetAdminOrderByIdQuery,
  useShipOrderMutation,
  useUpdateOrderMutation,
  useCancelOrderMutation,
} = adminOrderApiSlice;
