import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  CategoryResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '../../app/api/apiTypes';
import { categoryUrl } from '../../app/endpoints';

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryResponse, void>({
      query: () => categoryUrl,
      providesTags: [TagTypesEnum.Categories],
    }),
    createCategory: builder.mutation<CategoryResponse, CreateCategoryRequest>({
      query: (name) => ({
        url: categoryUrl,
        method: 'POST',
        body: name,
      }),
      invalidatesTags: [TagTypesEnum.Categories],
    }),
    updateCategory: builder.mutation<CategoryResponse, UpdateCategoryRequest>({
      query: ({ id, categoryName }) => ({
        url: `${categoryUrl}/${id}`,
        method: 'PUT',
        body: { categoryName },
      }),
      invalidatesTags: [TagTypesEnum.Categories],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
} = categoryApiSlice;
