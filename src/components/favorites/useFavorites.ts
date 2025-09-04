import { useState } from 'react';
import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} from '../../features/shop/shopApiSlice';

const useFavorites = ({ id }: { id?: string }) => {
  const {
    data: favorites,
    isLoading,
    isError,
    refetch,
  } = useGetFavoritesQuery();
  const [toggleFavorite, { isLoading: isTogglingLoading }] =
    useToggleFavoriteMutation();

  const isFavorite = (productId: string) =>
    favorites?.some((product) => product.id === productId);

  const [animate, setAnimate] = useState(isFavorite(id || ''));

  const handleToggle = async (productId: string) => {
    setAnimate(!animate);
    try {
      await toggleFavorite(productId).unwrap();
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
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

export default useFavorites;
