import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  CreateSubCategoryRequest,
  DefaultResponse,
  SubCategoriesResponse,
  SubCategoryResponse,
  UpdateSubCategoryRequest,
  UpdateSubCategoryResponse,
} from '../../app/api/apiTypes';
import { subCategoryUrl } from '../../app/endpoints';

const subCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCategories: builder.query<SubCategoriesResponse, void>({
      query: () => subCategoryUrl,
      providesTags: [TagTypesEnum.SubCategories],
    }),
    getScheduled: builder.query<any, void>({
      query: () => `${subCategoryUrl}/scheduled`,
      providesTags: [TagTypesEnum.SubCategories],
    }),
    getSubCategoryById: builder.query<SubCategoryResponse, string>({
      query: (id) => `${subCategoryUrl}/${id}`,
      providesTags: [TagTypesEnum.SubCategories],
    }),
    deleteSubCategory: builder.mutation<DefaultResponse, string>({
      query: (id) => ({
        url: `${subCategoryUrl}/${id}`,
        method: 'Delete',
        body: id,
      }),
      invalidatesTags: [TagTypesEnum.SubCategories],
    }),
    updateSubCategory: builder.mutation<
      UpdateSubCategoryResponse,
      UpdateSubCategoryRequest
    >({
      query: ({ subCategory, id }) => ({
        url: `${subCategoryUrl}/${id}`,
        method: 'PUT',
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
        method: 'POST',
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
  useGetScheduledQuery,
} = subCategoryApiSlice;
