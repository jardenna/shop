import apiSlice from '../../app/api/apiSlice';
import { ordersUrl } from '../../app/endpoints';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, any>({
      query: (body) => ({
        url: ordersUrl,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
