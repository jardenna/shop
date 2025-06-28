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

  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    favorites,
    (state: Favorites[], postId: string) =>
      state.map((post) => {
        if (post.id === String(postId)) {
          return {
            ...post,
            isLiked: !post.id,
          };
        }
        return post;
      }),
  );

  const handleToggle = (productId: string) => {
    try {
      startTransition(async () => {
        addOptimisticPost(productId);
        await toggleFavorite(productId).unwrap();
      });

      setAnimate(!animate);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return {
    favorites: optimisticPosts,
    isFavorite,
    toggleFavorite: handleToggle,
    isLoading,
    isTogglingLoading,
    isError,
    animate,
  };
};

export default useFavorites;
