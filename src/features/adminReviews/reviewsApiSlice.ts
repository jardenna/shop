import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  AdminReviewsResponse,
  ReviewParams,
  ReviewsCountResponse,
} from '../../app/api/apiTypes/adminReviewApiTypes';
import { adminReviewsUrl } from '../../app/endpoints';

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsCount: builder.query<ReviewsCountResponse, void>({
      query: () => `${adminReviewsUrl}/unread`,
      providesTags: [TagTypesEnum.Reviews],
    }),
    getReviews: builder.query<AdminReviewsResponse[], ReviewParams>({
      query: (params) => ({
        url: adminReviewsUrl,
        params,
      }),
      providesTags: [TagTypesEnum.Reviews],
    }),
  }),
});

export const { useGetReviewsCountQuery, useGetReviewsQuery } = reviewsApiSlice;
