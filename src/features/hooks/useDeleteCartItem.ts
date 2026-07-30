import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import { handleApiError } from '../../utils/handleApiError';
import { useDeleteCartItemMutation } from '../cart/cartApiSlice';
import { useLanguage } from '../language/useLanguage';

export const useDeleteCartItem = () => {
  const { language } = useLanguage();
  const [deleteCartItemMutation] = useDeleteCartItemMutation();
  const { onAddMessagePopup } = useMessagePopup();

  const deleteCartItem = async (cartItemId: string) => {
    try {
      const result = await deleteCartItemMutation(cartItemId).unwrap();

      if (result.success) {
        onAddMessagePopup({
          message: result.message,
        });

        return;
      }

      onAddMessagePopup({
        messagePopupType: 'error',
        message: language.productNotFound,
        componentType: 'notification',
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };

  return {
    deleteCartItem,
  };
};
