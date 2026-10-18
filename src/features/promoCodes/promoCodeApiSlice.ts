import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  PromoCode,
  PromoCodeResponse,
  UpdatePromoCodeRequest,
} from '../../app/api/apiTypes/promoCodeApiTypes';
import { adminPromoCodeUrl } from '../../app/endpoints';

export const promoCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPromoCode: builder.mutation<PromoCodeResponse, PromoCode>({
      query: (body) => ({
        url: adminPromoCodeUrl,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TagTypesEnum.PromoCode],
    }),
    updatePromoCode: builder.mutation<
      PromoCodeResponse,
      UpdatePromoCodeRequest
    >({
      query: ({ body, id }) => ({
        url: `${adminPromoCodeUrl}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TagTypesEnum.PromoCode],
    }),
    getPromoCodes: builder.query<PromoCodeResponse[], void>({
      query: () => adminPromoCodeUrl,
      providesTags: [TagTypesEnum.PromoCode],
    }),
    getPromoCodeById: builder.query<PromoCodeResponse, string>({
      query: (id) => `${adminPromoCodeUrl}/${id}`,
      providesTags: [TagTypesEnum.PromoCode],
      extraOptions: {
        skipErrorToast: true,
      },
    }),
  }),
});

export const {
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
  useGetPromoCodesQuery,
  useGetPromoCodeByIdQuery,
} = promoCodeApiSlice;
