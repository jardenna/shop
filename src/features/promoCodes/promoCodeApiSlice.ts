import apiSlice from '../../app/api/apiSlice';
import {
  PromoCode,
  UpdatePromoCodeRequest,
} from '../../app/api/apiTypes/promoCodeApiTypes';
import { adminPromoCodeUrl } from '../../app/endpoints';

export const promoCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPromoCode: builder.mutation<PromoCode, PromoCode>({
      query: (body) => ({
        url: adminPromoCodeUrl,
        method: 'POST',
        body,
      }),
    }),
    updatePromoCode: builder.mutation<PromoCode, UpdatePromoCodeRequest>({
      query: ({ body, id }) => ({
        url: `${adminPromoCodeUrl}/${id}`,
        method: 'Patch',
        body,
      }),
    }),
    getPromoCodes: builder.query<PromoCode[], void>({
      query: () => adminPromoCodeUrl,
    }),
  }),
});

export const {
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
  useGetPromoCodesQuery,
} = promoCodeApiSlice;
