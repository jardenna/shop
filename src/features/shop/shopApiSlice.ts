import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type {
  Favorites,
  ProductMenuResponse,
  ShopAllProductsResponse,
  ShopProductsParams,
  SingleProduct,
  ToggleFavoriteResponse,
} from '../../app/api/apiTypes/shopApiTypes';
import {
  favoritesUrl,
  productUrl,
  subCategoryMenuUrl,
} from '../../app/endpoints';

const shopApiSlice = apiSlice.injectEndpoints({
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
    getSingleProduct: builder.query<SingleProduct, string>({
      query: (id) => `${productUrl}/shop/${id}`,
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
              const partialDraft = draft as unknown as Array<{ id: string }>;
              const index = partialDraft.findIndex(
                (fav) => fav.id === productId,
              );
              if (index === -1) {
                partialDraft.push({ id: productId });
              } else {
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
  }),
});

export const {
  useGetProductsQuery,
  useGetShopMenuQuery,
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
  useGetSingleProductQuery,
} = shopApiSlice;
