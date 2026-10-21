import { useNavigate } from 'react-router';
import { DeliveryStatus } from '../../../../app/api/apiTypes/orderApiTypes';
import Button from '../../../../components/Button';
import { useToast } from '../../../../components/toast/hooks/useToast';
import { ShopPath } from '../../../../layout/nav/enums';
import { BtnVariant } from '../../../../types/enums';
import { useLanguage } from '../../../language/useLanguage';
import { useCancelMyOrderMutation } from '../../orderApiSlice';

interface CancelOrderButtonProps {
  id: string;
  status: DeliveryStatus;
}

const CancelOrderButton = ({ id, status }: CancelOrderButtonProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { onAddToast } = useToast();

  const [cancelOrder] = useCancelMyOrderMutation();

  const handleCancelOrder = async () => {
    const result = await cancelOrder(id).unwrap();

    const to = `/${ShopPath.MyOrders}`;

    if (result.success) {
      navigate(ShopPath.MyOrders);
      onAddToast({
        message: result.message,
      });
      navigate(to);
    }
  };

  return (
    <Button
      onClick={handleCancelOrder}
      disabled={status !== 'created' && status !== 'processing'}
      variant={BtnVariant.Danger}
    >
      {language.cancelOrder}
    </Button>
  );
};

export default CancelOrderButton;
