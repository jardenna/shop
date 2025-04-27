import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  AllSortedProductsResponse,
  Product,
  ProductRequest,
  UpdateProductRequest,
} from '../../app/api/apiTypes';
import { productUrl } from '../../app/endpoints';

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<AllSortedProductsResponse, void>({
      query: () => `${productUrl}/allProducts`,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `${productUrl}/${id}`,
    }),
    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: ({ id, product }) => ({
        url: `${productUrl}/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: [TagTypesEnum.SubCategories],
    }),
    createProduct: builder.mutation<Product, ProductRequest>({
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
