import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  CategoriesResponse,
  CreateSubCategoryRequest,
  DefaultResponse,
  SubCategory,
  SubCategoryResponse,
  UpdateSubCategoryRequest,
  UpdateSubCategoryResponse,
} from '../../app/api/apiTypes';
import { subCategoryUrl } from '../../app/endpoints';

const subCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCategories: builder.query<SubCategoryResponse, void>({
      query: () => subCategoryUrl,
      providesTags: [TagTypesEnum.SubCategories],
    }),
    getSubCategoryById: builder.query<SubCategory, string>({
      query: (id) => `${subCategoryUrl}/${id}`,
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
    }),
    createSubCategory: builder.mutation<
      CategoriesResponse,
      CreateSubCategoryRequest
    >({
      query: (subCategory) => ({
        url: subCategoryUrl,
        method: 'POST',
        body: subCategory,
      }),
    }),
  }),
});

export const {
  useGetAllSubCategoriesQuery,
  useGetSubCategoryByIdQuery,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useCreateSubCategoryMutation,
} = subCategoryApiSlice;
