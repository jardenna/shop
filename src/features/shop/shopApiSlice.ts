import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type { BaseShopProduct } from '../../app/api/apiTypes/sharedApiTypes';
import type {
  ProductMenuResponse,
  ReviewsRequest,
  ReviewsResponse,
  SaleProductResponse,
  ShopAllProductsResponse,
  ShopProductsParams,
} from '../../app/api/apiTypes/shopApiTypes';
import { productUrl, subCategoryMenuUrl } from '../../app/endpoints';

export const shopApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ShopAllProductsResponse, ShopProductsParams>({
      query: (params) => {
        const query = new URLSearchParams(
          params as Record<string, string>,
        ).toString();
        return `${productUrl}?${query}`;
      },
      providesTags: [TagTypesEnum.Products],
    }),
    getSaleProducts: builder.query<SaleProductResponse[], void>({
      query: () => `${productUrl}/sale`,
      providesTags: [TagTypesEnum.Products],
    }),
    getSingleProduct: builder.query<BaseShopProduct, string>({
      query: (id) => `${productUrl}/shop/${id}`,
      providesTags: [TagTypesEnum.Products],
    }),
    getShopMenu: builder.query<ProductMenuResponse[], string>({
      query: (params) => `${subCategoryMenuUrl}${params}`,
      providesTags: [TagTypesEnum.Products],
    }),
    postReviews: builder.mutation<ReviewsResponse, ReviewsRequest>({
      query: ({ productId, reviews }) => ({
        url: `${productUrl}/${productId}/reviews`,
        method: 'POST',
        body: reviews,
      }),
      invalidatesTags: [TagTypesEnum.Products],
    }),
    checkReviewed: builder.query<{ reviewed: boolean }, string>({
      query: (productId) => `${productUrl}/${productId}/reviewed`,
      providesTags: [TagTypesEnum.Products],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetShopMenuQuery,
  useGetSingleProductQuery,
  usePostReviewsMutation,
  useCheckReviewedQuery,
  useGetSaleProductsQuery,
} = shopApiSlice;
