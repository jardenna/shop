import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import { ScheduledResponse } from '../../app/api/apiTypes/AdminApiTypes';
import {
  Product,
  ProductRequest,
  ProductsParams,
  ProductsResponse,
  UpdateProductRequest,
} from '../../app/api/apiTypes/adminProductApiTypes';
import type { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import { productUrl } from '../../app/endpoints';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, ProductsParams>({
      query: (params) => ({
        url: `${productUrl}/allProducts`,
        params,
      }),
      providesTags: [TagTypesEnum.Products],
    }),
    getProductById: builder.query<Product, string>({
      query: (productId) => `${productUrl}/${productId}`,
      providesTags: [TagTypesEnum.Products],
      extraOptions: {
        skipErrorToast: true,
      },
    }),
    getHasScheduledData: builder.query<ScheduledResponse, void>({
      query: () => `${productUrl}/scheduled`,
      providesTags: [TagTypesEnum.Products],
    }),
    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: ({ id, product }) => ({
        url: `${productUrl}/${id}`,
        method: MethodsEnum.Put,
        body: product,
      }),
      invalidatesTags: [TagTypesEnum.Products],
    }),
    createProduct: builder.mutation<Product, ProductRequest>({
      query: (product) => ({
        url: productUrl,
        method: MethodsEnum.Post,
        body: product,
      }),
      invalidatesTags: [TagTypesEnum.Products],
    }),
    duplicateProduct: builder.mutation<Product, string>({
      query: (id) => ({
        method: MethodsEnum.Post,
        url: `${productUrl}/${id}/duplicate`,
      }),
      invalidatesTags: [TagTypesEnum.Products],
    }),
    deleteProduct: builder.mutation<DefaultResponse, string>({
      query: (id) => ({
        url: `${productUrl}/${id}`,
        method: MethodsEnum.Delete,
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
  useGetHasScheduledDataQuery,
  useDuplicateProductMutation,
} = productApiSlice;
