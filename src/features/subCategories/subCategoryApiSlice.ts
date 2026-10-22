import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import type {
  CreateSubCategoryRequest,
  ScheduledResponse,
  SubCategoriesResponse,
  SubCategoryParams,
  SubCategoryResponse,
} from '../../app/api/apiTypes/adminApiTypes';
import type { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import {
  SubCategoriesWithParent,
  UpdateSubCategoryRequest,
  UpdateSubCategoryResponse,
} from '../../app/api/apiTypes/subCategoryApiTypes';
import { subCategoryUrl } from '../../app/endpoints';

const subCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCategories: builder.query<
      SubCategoriesResponse,
      SubCategoryParams
    >({
      query: (params) => ({
        url: subCategoryUrl,
        params,
      }),
      providesTags: [TagTypesEnum.SubCategories],
    }),
    getSubCategoriesWithParent: builder.query<SubCategoriesWithParent[], void>({
      query: () => `${subCategoryUrl}/with-parent`,
      providesTags: [TagTypesEnum.SubCategories],
    }),
    getHasSubCatScheduled: builder.query<ScheduledResponse, void>({
      query: () => `${subCategoryUrl}/scheduled`,
      providesTags: [TagTypesEnum.SubCategories],
    }),
    getSubCategoryById: builder.query<SubCategoryResponse, string>({
      query: (id) => `${subCategoryUrl}/${id}`,
      extraOptions: {
        skipErrorToast: true,
      },
      providesTags: [TagTypesEnum.SubCategories],
    }),
    deleteSubCategory: builder.mutation<DefaultResponse, string>({
      query: (id) => ({
        url: `${subCategoryUrl}/${id}`,
        method: MethodsEnum.Delete,
      }),
    }),
    updateSubCategory: builder.mutation<
      UpdateSubCategoryResponse,
      UpdateSubCategoryRequest
    >({
      query: ({ subCategory, id }) => ({
        url: `${subCategoryUrl}/${id}`,
        method: MethodsEnum.Put,
        body: subCategory,
      }),
      invalidatesTags: [TagTypesEnum.SubCategories],
    }),
    createSubCategory: builder.mutation<
      SubCategoryResponse,
      CreateSubCategoryRequest
    >({
      query: (subCategory) => ({
        url: subCategoryUrl,
        method: MethodsEnum.Post,
        body: subCategory,
      }),
      invalidatesTags: [TagTypesEnum.SubCategories],
    }),
  }),
});

export const {
  useGetAllSubCategoriesQuery,
  useGetSubCategoryByIdQuery,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useCreateSubCategoryMutation,
  useGetHasSubCatScheduledQuery,
  useGetSubCategoriesWithParentQuery,
} = subCategoryApiSlice;
