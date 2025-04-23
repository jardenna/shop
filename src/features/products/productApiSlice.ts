import apiSlice from '../../app/api/apiSlice';
import {
  AllSortedProductsResponse,
  ProductResponse,
} from '../../app/api/apiTypes';
import { productUrl } from '../../app/endpoints';

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<AllSortedProductsResponse, void>({
      query: () => `${productUrl}/allProducts`,
    }),
    getProductById: builder.query<ProductResponse, string>({
      query: (id) => `${productUrl}/${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } =
  productApiSlice;
