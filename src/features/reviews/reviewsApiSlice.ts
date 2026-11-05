import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { ReviewsCountResponse } from '../../app/api/apiTypes/adminReviewApiTypes';

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsCount: builder.query<ReviewsCountResponse, void>({
      query: () => `reviews/unread`,
      providesTags: [TagTypesEnum.Reviews],
    }),
  }),
});

export const { useGetReviewsCountQuery } = reviewsApiSlice;
