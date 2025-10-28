import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type { BaseProduct } from '../../app/api/apiTypes/sharedApiTypes';
import type {
  ProductMenuResponse,
  ProductPreview,
  ReviewsRequest,
  ReviewsResponse,
  ShopAllProductsResponse,
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
    getProducts: builder.query<ShopAllProductsResponse, ShopProductsParams>({
      query: (params) => {
        const query = new URLSearchParams(
          params as Record<string, string>,
        ).toString();
        return `${productUrl}?${query}`;
      },
      providesTags: [TagTypesEnum.Products],
    }),
    getSingleProduct: builder.query<BaseProduct, string>({
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
    getFavorites: builder.query<ProductPreview[], void>({
      query: () => favoritesUrl,
      providesTags: [TagTypesEnum.Favorites],
    }),
    toggleFavorite: builder.mutation<ToggleFavoriteResponse, string>({
      query: (id) => ({
        url: `${favoritesUrl}/${id}`,
        method: 'POST',
      }),
      invalidatesTags: [TagTypesEnum.Favorites],
      // Favorites cach value
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
  usePostReviewsMutation,
  useCheckReviewedQuery,
} = shopApiSlice;

export default shopApiSlice;
