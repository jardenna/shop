import { DeliveryStatus } from '../../../../app/api/apiTypes/orderApiTypes';
import Button from '../../../../components/Button';
import Cart from '../../../../components/carts/Cart';
import ProgressTracker from '../../../../components/progressTracker/ProgressTracker';
import { useLanguage } from '../../../language/useLanguage';
import { orderTrackingList } from '../../utils/createTrackingList';
import CancelledOrderInfo from '../CancelledOrderInfo';
import './_order-status-actions.scss';

interface OrderStatusProps {
  status: DeliveryStatus;
}

interface OrderStatusActionsProps {
  orderStatus: OrderStatusProps;
  onShipOrder: () => void;
  onUpdateOrder: (status: DeliveryStatus) => void;
}

const OrderStatusActions = ({
  orderStatus,
  onShipOrder,
  onUpdateOrder,
}: OrderStatusActionsProps) => {
  const { language } = useLanguage();

  const isCancelled = orderStatus.status === 'cancelled';
  const isDelivered = orderStatus.status === 'delivered';

  const handleStatusAction = () => {
    if (orderStatus.status === 'created') {
      onUpdateOrder('processing');
      return;
    }

    if (orderStatus.status === 'shipped') {
      onUpdateOrder('processing');
      return;
    }

    onShipOrder();
  };

  const getActionLabel = () => {
    if (orderStatus.status === 'created') {
      return language.processOrder;
    }

    if (orderStatus.status === 'shipped') {
      return language.reopenOrder;
    }

    return language.sendOrder;
  };

  return (
    <Cart className="order-status-actions">
      <ProgressTracker steps={orderTrackingList} status={orderStatus} />

      {isCancelled && (
        <CancelledOrderInfo language={language} status={orderStatus.status} />
      )}

      {!isCancelled && !isDelivered && (
        <footer className="footer">
          <Button onClick={handleStatusAction}>{getActionLabel()}</Button>
        </footer>
      )}
    </Cart>
  );
};

export default OrderStatusActions;
