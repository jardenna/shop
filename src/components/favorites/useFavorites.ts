import { useNavigate } from 'react-router';
import { useAuth } from '../../features/auth/hooks/useAuth';
import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} from '../../features/favorites/favoritesApiSlice';
import { ShopPath } from '../../layout/nav/navConstants';

export const useFavorites = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
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

  const handleToggle = async (productId: string) => {
    if (!currentUser) {
      navigate(`/${ShopPath.Login}`);
      return;
    }

    try {
      await toggleFavorite(productId).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite: handleToggle,
    isLoading,
    isTogglingLoading,
    isError,
    animate: favorite,
    onReset: () => refetch(),
  };
};
