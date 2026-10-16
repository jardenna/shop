import apiSlice from '../../app/api/apiSlice';
import { PromoCode } from '../../app/api/apiTypes/promoCodeApiTypes';

export const promoCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPromoCode: builder.mutation<PromoCode, PromoCode>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    updatePromoCode: builder.mutation<PromoCode, PromoCode>({
      query: (body) => ({
        url: '',
        method: 'Patch',
        body,
      }),
    }),
    getPromoCodes: builder.query<PromoCode[], void>({
      query: () => '',
    }),
  }),
});

export const {
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
  useGetPromoCodesQuery,
} = promoCodeApiSlice;
