import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import {
  AllSortedProductsResponse,
  DefaultResponse,
  Product,
  ProductMenuResponse,
  ProductRequest,
  ProductsParams,
  ScheduledResponse,
  ShopProductResponse,
  ShopProductsParams,
  UpdateProductRequest,
} from '../../app/api/apiTypes/sharedApiTypes';
import { productUrl, subCategoryMenuUrl } from '../../app/endpoints';

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<AllSortedProductsResponse, ProductsParams>({
      query: (params) => {
        const query = new URLSearchParams(
          params as unknown as Record<string, string>,
        ).toString();
        return `${productUrl}/allProducts?${query}`;
      },
      providesTags: [TagTypesEnum.Products],
    }),
    getShopProducts: builder.query<ShopProductResponse, ShopProductsParams>({
      query: (params) => {
        const query = new URLSearchParams(
          params as Record<string, string>,
        ).toString();
        return `${productUrl}?${query}`;
      },
      providesTags: [TagTypesEnum.Products],
    }),
    getShopMenu: builder.query<ProductMenuResponse, string>({
      query: (params) => `${subCategoryMenuUrl}${params}`,
      providesTags: [TagTypesEnum.Products],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `${productUrl}/${id}`,
      providesTags: [TagTypesEnum.Products],
    }),
    getHasScheduledData: builder.query<ScheduledResponse, void>({
      query: () => `${productUrl}/scheduled`,
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
    duplicateProduct: builder.mutation<Product, string>({
      query: (id) => ({
        method: 'POST',
        url: `${productUrl}/${id}/duplicate`,
      }),
      invalidatesTags: [TagTypesEnum.Products],
    }),
    deleteProduct: builder.mutation<DefaultResponse, string>({
      query: (id) => ({
        url: `${productUrl}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypesEnum.Products],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetShopProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetHasScheduledDataQuery,
  useDuplicateProductMutation,
  useGetShopMenuQuery,
} = productApiSlice;
