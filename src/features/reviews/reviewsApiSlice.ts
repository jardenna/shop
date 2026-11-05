import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  ReviewParams,
  ReviewsCountResponse,
  ReviewsResponse,
} from '../../app/api/apiTypes/adminReviewApiTypes';
import { adminReviewsUrl } from '../../app/endpoints';

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsCount: builder.query<ReviewsCountResponse, void>({
      query: () => `${adminReviewsUrl}/unread`,
      providesTags: [TagTypesEnum.Reviews],
    }),
    getReviews: builder.mutation<ReviewsResponse, ReviewParams>({
      query: (params) => ({
        url: adminReviewsUrl,
        params,
      }),
      invalidatesTags: [TagTypesEnum.Reviews],
    }),
  }),
});

export const { useGetReviewsCountQuery, useGetReviewsMutation } =
  reviewsApiSlice;
