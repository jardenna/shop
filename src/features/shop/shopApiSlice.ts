import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { BaseProduct } from '../../app/api/apiTypes/sharedApiTypes';
import type {
  Favorites,
  ProductMenuResponse,
  ShopProductResponse,
  ShopProductsParams,
  ToggleFavoriteResponse,
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
    getFavorites: builder.query<Favorites[], void>({
      query: () => favoritesUrl,
      providesTags: [TagTypesEnum.Favorites],
    }),
    toggleFavorite: builder.mutation<ToggleFavoriteResponse, string>({
      query: (id) => ({
        url: `${favoritesUrl}/${id}`,
        method: 'POST',
      }),
      invalidatesTags: [TagTypesEnum.Favorites],
    }),
    getProductById: builder.query<BaseProduct, string>({
      query: (id) => `${productUrl}${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetShopMenuQuery,
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
  useGetProductByIdQuery,
} = shopApiSlice;
