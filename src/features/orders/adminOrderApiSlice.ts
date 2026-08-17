import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  AdminOrderParams,
  AdminOrderResponse,
} from '../../app/api/apiTypes/adminApiTypes';
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
      query: (orderId) => `${adminOrdersUrl}${orderId}`,
      providesTags: (_result, _error, orderId) => [
        { type: TagTypesEnum.Order, id: orderId },
      ],
    }),
    updateOrder: builder.mutation<DefaultResponse, UpdateOrderRequest>({
      query: ({ orderId, status }) => ({
        url: `${adminOrdersUrl}${orderId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: TagTypesEnum.Order, id: orderId },
      ],
    }),
    shipOrder: builder.mutation<DefaultResponse, string>({
      query: (orderId) => ({
        url: `${adminOrdersUrl}${orderId}/send-order`,
        method: 'PATCH',
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
} = adminOrderApiSlice;
