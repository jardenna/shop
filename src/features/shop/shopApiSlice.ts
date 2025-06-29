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
    getShopMenu: builder.query<ProductMenuResponse[], string>({
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
      // Invalidate only if mutation succeeds, but we’ll optimistically update cache first
      invalidatesTags: [TagTypesEnum.Favorites],

      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        // Get current favorites cache value
        const patchResult = dispatch(
          shopApiSlice.util.updateQueryData(
            'getFavorites',
            undefined,
            (draft) => {
              // draft is the current favorites array
              // We need to toggle productId inside draft optimistically
              const index = draft.findIndex((fav) => fav.id === productId);
              if (index === -1) {
                // not in favorites, add it
                draft.push({ productId } as any); // adjust type accordingly
              } else {
                // already in favorites, remove it
                draft.splice(index, 1);
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // rollback on error
        }
      },
    }),

    getProductById: builder.query<BaseProduct, string>({
      query: (id) => `${productUrl}/${id}`,
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
