import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type {
  GetFavoritesResponse,
  PostFavoritesResponse,
  ProductMenuResponse,
  ShopProductResponse,
  ShopProductsParams,
} from '../../app/api/apiTypes/shopApiTypes';
import {
  favoritesUrl,
  productUrl,
  subCategoryMenuUrl,
} from '../../app/endpoints';

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
    getFavorites: builder.query<GetFavoritesResponse, void>({
      query: () => favoritesUrl,
      providesTags: [TagTypesEnum.Favorites],
    }),
    updateFavorites: builder.mutation<PostFavoritesResponse, string>({
      query: (id) => ({
        url: `${favoritesUrl}/${id}`,
        method: 'POST',
      }),
      invalidatesTags: [TagTypesEnum.Favorites],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetShopMenuQuery,
  useGetFavoritesQuery,
  useUpdateFavoritesMutation,
} = shopApiSlice;
