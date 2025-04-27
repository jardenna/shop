import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
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
    updateProduct: builder.mutation<any, any>({
      query: ({ id, product }) => ({
        url: `${productUrl}/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: [TagTypesEnum.SubCategories],
    }),
    createProduct: builder.mutation<any, any>({
      query: (product) => ({
        url: productUrl,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [TagTypesEnum.SubCategories],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} = productApiSlice;
