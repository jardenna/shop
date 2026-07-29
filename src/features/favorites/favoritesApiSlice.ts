import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { BaseProduct } from '../../app/api/apiTypes/sharedApiTypes';
import type { ToggleFavoriteResponse } from '../../app/api/apiTypes/shopApiTypes';
import { favoritesUrl } from '../../app/endpoints';

export const favoritesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<BaseProduct[], void>({
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
          favoritesApiSlice.util.updateQueryData(
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

export const { useGetFavoritesQuery, useToggleFavoriteMutation } =
  favoritesApiSlice;
