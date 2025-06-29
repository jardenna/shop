import { startTransition, useOptimistic, useState } from 'react';
import { Favorites } from '../../app/api/apiTypes/shopApiTypes';
import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} from '../../features/shop/shopApiSlice';

export const useFavorites = ({ id }: { id?: string }) => {
  const { data: favorites = [], isLoading, isError } = useGetFavoritesQuery();

  const [toggleFavorite, { isLoading: isTogglingLoading }] =
    useToggleFavoriteMutation();

  const isFavorite = (productId: string) =>
    favorites.some((product) => product.id === productId);

  const [animate, setAnimate] = useState(isFavorite(id || ''));

  const [optimisticFavorites, setOptimisticFavorites] = useOptimistic(
    favorites,
    (favorites: Favorites[], productId: string) =>
      favorites.map((favorite) => {
        if (favorite.id === productId) {
          return {
            ...favorite,
            isFavorite: !favorite.id,
          };
        }
        return favorite;
      }),
  );

  const handleToggle = (productId: string) => {
    try {
      startTransition(async () => {
        setOptimisticFavorites(productId);
        await toggleFavorite(productId).unwrap();
      });

      setAnimate(!animate);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    favorites: optimisticFavorites,
    isFavorite,
    toggleFavorite: handleToggle,
    isLoading,
    isTogglingLoading,
    isError,
    animate,
  };
};

export default useFavorites;
