import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  AllSortedProductsResponse,
  DefaultResponse,
  Product,
  ProductRequest,
  UpdateProductRequest,
} from '../../app/api/apiTypes';
import { productUrl } from '../../app/endpoints';

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<AllSortedProductsResponse, void>({
      query: () => `${productUrl}/allProducts`,
      providesTags: [TagTypesEnum.Products],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `${productUrl}/${id}`,
      providesTags: [TagTypesEnum.Products],
    }),
    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: ({ id, product }) => ({
        url: `${productUrl}/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: [TagTypesEnum.Products],
    }),
    createProduct: builder.mutation<Product, ProductRequest>({
      query: (product) => ({
        url: productUrl,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [TagTypesEnum.Products],
    }),
    deleteProduct: builder.mutation<DefaultResponse, string>({
      query: (id) => ({
        url: `${productUrl}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
