import { useEffect, useState } from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} from '../../features/shop/shopApiSlice';

export const useFavorites = ({ id }: { id?: string }) => {
  const { currentUser } = useAuth();

  const {
    data: favorites,
    isLoading,
    isError,
    refetch,
  } = useGetFavoritesQuery(undefined, {
    skip: !currentUser,
  });

  const [toggleFavorite, { isLoading: isTogglingLoading }] =
    useToggleFavoriteMutation();

  const isFavorite = (productId: string): boolean =>
    favorites?.some((product) => product.id === productId) ?? false;

  const favorite = isFavorite(id ?? '');

  const [animate, setAnimate] = useState(favorite);

  useEffect(() => {
    setAnimate(favorite);
  }, [favorite]);

  const handleToggle = async (productId: string) => {
    setAnimate((current) => !current);

    try {
      await toggleFavorite(productId).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      setAnimate((current) => !current);
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite: handleToggle,
    isLoading,
    isTogglingLoading,
    isError,
    animate,
    onReset: () => refetch(),
  };
};
