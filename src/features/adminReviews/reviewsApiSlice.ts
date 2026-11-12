import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import {
  AdminReviewsResponse,
  ReviewsCountResponse,
  ReviewStatsResponse,
} from '../../app/api/apiTypes/adminReviewApiTypes';
import { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import { adminReviewsUrl } from '../../app/endpoints';

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsCount: builder.query<ReviewsCountResponse, void>({
      query: () => `${adminReviewsUrl}/unread`,
      providesTags: [TagTypesEnum.Reviews],
    }),
    getReviews: builder.query<AdminReviewsResponse[], any>({
      query: (params) => ({
        url: adminReviewsUrl,
        params,
      }),
      providesTags: [TagTypesEnum.Reviews],
    }),
    getReviewStats: builder.query<ReviewStatsResponse, void>({
      query: () => `${adminReviewsUrl}/stats`,
    }),
    markAllAsread: builder.mutation<DefaultResponse, void>({
      query: () => ({
        url: `${adminReviewsUrl}/read-all`,
        method: MethodsEnum.Patch,
      }),
      invalidatesTags: [TagTypesEnum.Reviews],
    }),
    markOneAsread: builder.mutation<DefaultResponse, string>({
      query: (reviewId) => ({
        url: `${adminReviewsUrl}/${reviewId}/read`,
        method: MethodsEnum.Patch,
      }),
      invalidatesTags: [TagTypesEnum.Reviews],
    }),
  }),
});

export const {
  useGetReviewsCountQuery,
  useGetReviewsQuery,
  useMarkAllAsreadMutation,
  useMarkOneAsreadMutation,
  useGetReviewStatsQuery,
} = reviewsApiSlice;
