import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import type {
  CurrentPromoResponse,
  PromoCode,
  PromoCodeResponse,
  UpdatePromoCodeRequest,
} from '../../app/api/apiTypes/promoCodeApiTypes';
import {
  adminPromoCodeUrl,
  currentPromoCodeurl,
  promoCodeYearurl,
} from '../../app/endpoints';

export const promoCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPromoCode: builder.mutation<PromoCodeResponse, PromoCode>({
      query: (body) => ({
        url: adminPromoCodeUrl,
        method: MethodsEnum.Post,
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
        method: MethodsEnum.Patch,
        body,
      }),
      invalidatesTags: [TagTypesEnum.PromoCode],
    }),
    getPromoCodes: builder.query<PromoCodeResponse[], void>({
      query: () => adminPromoCodeUrl,
      providesTags: [TagTypesEnum.PromoCode],
    }),
    getCurrentPromoCode: builder.query<CurrentPromoResponse, void>({
      query: () => currentPromoCodeurl,
      providesTags: [TagTypesEnum.PromoCode],
    }),
    getpromoCodeYears: builder.query<string[], void>({
      query: () => promoCodeYearurl,
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
  useGetCurrentPromoCodeQuery,
  useGetPromoCodeByIdQuery,
  useGetpromoCodeYearsQuery,
} = promoCodeApiSlice;
