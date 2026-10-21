import { DeliveryStatus } from '../../../../app/api/apiTypes/orderApiTypes';
import Button from '../../../../components/Button';
import { useToast } from '../../../../components/toast/hooks/useToast';
import { BtnVariant } from '../../../../types/enums';
import { useLanguage } from '../../../language/useLanguage';
import { useCancelMyOrderMutation } from '../../orderApiSlice';

interface CancelOrderButtonProps {
  id: string;
  status: DeliveryStatus;
}

const CancelOrderButton = ({ id, status }: CancelOrderButtonProps) => {
  const { language } = useLanguage();
  const { onAddToast } = useToast();

  const [cancelOrder] = useCancelMyOrderMutation();

  const handleCancelOrder = async () => {
    const result = await cancelOrder(id).unwrap();

    if (result.success) {
      onAddToast({
        message: result.message,
      });
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
