/* eslint-disable import/prefer-default-export */
import apiSlice from '../../app/api/apiSlice';
import { AllSortedProductsResponse } from '../../app/api/apiTypes';
import { productUrl } from '../../app/endpoints';

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<AllSortedProductsResponse, void>({
      query: () => `${productUrl}/allProducts`,
    }),
  }),
});

export const { useGetAllProductsQuery } = productApiSlice;
