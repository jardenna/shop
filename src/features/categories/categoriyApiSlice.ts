import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import type { ScheduledResponse } from '../../app/api/apiTypes/adminOrderApiTypes';
import {
  CategoriesResponse,
  CategoryItemResponse,
  CategoryParams,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '../../app/api/apiTypes/categoryApiTypes';
import { categoryUrl } from '../../app/endpoints';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategoriesWithParams: builder.query<
      CategoriesResponse,
      CategoryParams
    >({
      query: (params) => ({ url: categoryUrl, params }),
      providesTags: [TagTypesEnum.Categories],
    }),
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
      extraOptions: {
        skipErrorToast: true,
      },
    }),
    getPublishedCategories: builder.query<string[], void>({
      query: () => `${categoryUrl}/published`,
      providesTags: [TagTypesEnum.Categories],
    }),
    createCategory: builder.mutation<CategoriesResponse, CreateCategoryRequest>(
      {
        query: (name) => ({
          url: categoryUrl,
          method: MethodsEnum.Post,
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
        method: MethodsEnum.Put,
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
  useGetPublishedCategoriesQuery,
  useGetAllCategoriesWithParamsQuery,
} = categoryApiSlice;
