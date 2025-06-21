import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type {
  ProductMenuResponse,
  ShopProductResponse,
  ShopProductsParams,
} from '../../app/api/apiTypes/shopApiTypes';
import { productUrl, subCategoryMenuUrl } from '../../app/endpoints';

const shopApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ShopProductResponse, ShopProductsParams>({
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
  }),
});

export const { useGetProductsQuery, useGetShopMenuQuery } = shopApiSlice;
