import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type {
  CategoriesResponse,
  CategoryItemResponse,
  CreateCategoryRequest,
  ScheduledResponse,
  UpdateCategoryRequest,
} from '../../app/api/apiTypes/adminApiTypes';
import { categoryUrl } from '../../app/endpoints';

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoriesResponse, void>({
      query: () => categoryUrl,
      providesTags: [TagTypesEnum.Categories],
    }),
    getHasCategoriesScheduled: builder.query<ScheduledResponse, void>({
      query: () => `${categoryUrl}/scheduled`,
      providesTags: [TagTypesEnum.Categories],
    }),
    getCategoryById: builder.query<UpdateCategoryRequest, string>({
      query: (id) => `${categoryUrl}/${id}`,
      providesTags: [TagTypesEnum.Categories],
    }),
    createCategory: builder.mutation<CategoriesResponse, CreateCategoryRequest>(
      {
        query: (name) => ({
          url: categoryUrl,
          method: 'POST',
          body: name,
        }),
        invalidatesTags: [TagTypesEnum.Categories],
      },
    ),
    updateCategory: builder.mutation<
      CategoryItemResponse,
      UpdateCategoryRequest
    >({
      query: ({ category, id }) => ({
        url: `${categoryUrl}/${id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: [TagTypesEnum.Categories],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useGetHasCategoriesScheduledQuery,
} = categoryApiSlice;
