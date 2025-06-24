import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} from '../../features/shop/shopApiSlice';

export const useFavorites = () => {
  const { data: favorites = [], isLoading, isError } = useGetFavoritesQuery();
  const [toggleFavorite, { isLoading: isTogglingLoading }] =
    useToggleFavoriteMutation();

  const isFavorite = (productId: string) =>
    favorites.some((product) => product.id === productId);

  const handleToggle = async (productId: string) => {
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
  };
};

export default useFavorites;
