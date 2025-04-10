import apiSlice, { TagTypeIdEnum, TagTypesEnum } from '../../app/api/apiSlice';
import {
  CategoryResponse,
  CreateCategoryRequest,
} from '../../app/api/apiTypes';
import { categoryUrl } from '../../app/endpoints';

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryResponse, void>({
      query: () => categoryUrl,
      providesTags: [TagTypesEnum.Categories],
    }),
    getScheduledCategories: builder.query<CategoryResponse, void>({
      query: () => `${categoryUrl}/scheduled`,
      providesTags: [
        { type: TagTypesEnum.Categories, id: TagTypeIdEnum.Scheduled },
      ],
    }),
    getCategoryById: builder.query<any, string>({
      query: (id) => `${categoryUrl}/${id}`,
    }),
    createCategory: builder.mutation<CategoryResponse, CreateCategoryRequest>({
      query: (name) => ({
        url: categoryUrl,
        method: 'POST',
        body: name,
      }),
      invalidatesTags: [TagTypesEnum.Categories],
    }),
    updateCategory: builder.mutation<CategoryResponse, any>({
      query: ({ user, id }) => ({
        url: `${categoryUrl}/${id}`,
        method: 'PUT',
        body: user,
      }),
      // query: ({ category, id }) => ({
      //   url: `${categoryUrl}/${id}`,
      //   method: 'PUT',
      //   body: category,
      // }),
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
