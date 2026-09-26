import { useToast } from '../../components/toast/hooks/useToast';
import { useDeleteCartItemMutation } from '../cart/cartApiSlice';
import { useLanguage } from '../language/useLanguage';

export const useDeleteCartItem = () => {
  const { language } = useLanguage();
  const [deleteCartItemMutation] = useDeleteCartItemMutation();
  const { onAddToast } = useToast();

  const deleteCartItem = async (cartItemId: string) => {
    const result = await deleteCartItemMutation(cartItemId).unwrap();

    if (result.success) {
      onAddToast({
        message: result.message,
      });

      return;
    }

    onAddToast({
      message: language.productNotFound,
      type: 'error',
    });
  };

  return {
    deleteCartItem,
  };
};
