import apiSlice from '../../app/api/apiSlice';
import {
  AdminOrderParams,
  AdminOrderResponse,
} from '../../app/api/apiTypes/adminApiTypes';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { adminOrdersUrl } from '../../app/endpoints';

export const adminOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOrderById: builder.query<OrderResponse, string>({
      query: (id) => `${adminOrdersUrl}${id}`,
    }),
    getAllAdminOrders: builder.query<AdminOrderResponse, AdminOrderParams>({
      query: (params) => ({
        url: adminOrdersUrl,
        params,
      }),
    }),
  }),
});

export const { useGetAllAdminOrdersQuery, useGetAdminOrderByIdQuery } =
  adminOrderApiSlice;
