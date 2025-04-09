/* eslint-disable import/prefer-default-export */
import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { SubCategoryResponse } from '../../app/api/apiTypes';
import { subCategoryUrl } from '../../app/endpoints';

const subCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCategories: builder.query<SubCategoryResponse, void>({
      query: () => subCategoryUrl,
      providesTags: [TagTypesEnum.SubCategories],
    }),
  }),
});

export const { useGetAllSubCategoriesQuery } = subCategoryApiSlice;
