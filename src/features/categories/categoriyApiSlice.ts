import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  CategoriesResponse,
  CategoryItemResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '../../app/api/apiTypes';
import { categoryUrl } from '../../app/endpoints';

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoriesResponse, void>({
      query: () => categoryUrl,
      providesTags: [TagTypesEnum.Categories],
    }),
    getScheduledCategories: builder.query<CategoriesResponse, void>({
      query: () => `${categoryUrl}/scheduled`,
      providesTags: [
        { type: TagTypesEnum.Categories, id: 'TagTypeIdEnum.Scheduled' },
      ],
    }),
    getCategoryById: builder.query<UpdateCategoryRequest, string>({
      query: (id) => `${categoryUrl}/${id}`,
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
  useGetScheduledCategoriesQuery,
  useGetCategoryByIdQuery,
} = categoryApiSlice;
