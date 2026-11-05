import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { ReviewsCountResponse } from '../../app/api/apiTypes/adminReviewApiTypes';
import { adminReviewsUrl } from '../../app/endpoints';

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsCount: builder.query<ReviewsCountResponse, void>({
      query: () => `${adminReviewsUrl}/unread`,
      providesTags: [TagTypesEnum.Reviews],
    }),
  }),
});

export const { useGetReviewsCountQuery } = reviewsApiSlice;
