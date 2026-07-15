import apiSlice from '../../app/api/apiSlice';
import {
  CreateOrderResponse,
  CreateOrderRequest,
} from '../../app/api/apiTypes/orderApiTypes';
import { ordersUrl } from '../../app/endpoints';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: ordersUrl,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
