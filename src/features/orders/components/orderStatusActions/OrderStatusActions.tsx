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

  return (
    <Cart className="order-status-actions">
      <ProgressTracker steps={orderTrackingList} status={orderStatus} />
      {orderStatus.status === 'cancelled' ? (
        <CancelledOrderInfo language={language} status={orderStatus.status} />
      ) : (
        <footer className="footer">
          <Button
            onClick={() => {
              onUpdateOrder('processing');
            }}
          >
            {orderStatus.status === 'shipped'
              ? language.reopenOrder
              : language.processOrder}
          </Button>
          <Button onClick={onShipOrder}>{language.sendOrder}</Button>
        </footer>
      )}
    </Cart>
  );
};

export default OrderStatusActions;
