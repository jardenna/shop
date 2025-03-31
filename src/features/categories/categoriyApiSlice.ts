import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  Category,
  CategoryResponse,
  CreateCategoryRequest,
} from '../../app/api/apiTypes';
import { categoryEndpoints } from '../../app/endpoints';

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => categoryEndpoints.categories,
      providesTags: [TagTypesEnum.Categories],
    }),
    createCategory: builder.mutation<CategoryResponse, CreateCategoryRequest>({
      query: (name) => ({
        url: categoryEndpoints.categories,
        method: 'POST',
        body: name,
      }),
      invalidatesTags: [TagTypesEnum.Categories],
    }),
    updateCategory: builder.mutation<
      CategoryResponse,
      { categoryData: { categoryName: string }; id: string }
    >({
      query: ({ id, categoryData }) => ({
        url: `${categoryEndpoints.categories}/${id}`,
        method: 'PUT',
        body: categoryData, // <- Now correctly passing the categoryData object
      }),
      invalidatesTags: [TagTypesEnum.Categories],
    }),
    deleteCategory: builder.mutation<Category, string>({
      query: (id) => ({
        url: `${categoryEndpoints.categories}/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: [TagTypesEnum.Categories],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
} = categoryApiSlice;
