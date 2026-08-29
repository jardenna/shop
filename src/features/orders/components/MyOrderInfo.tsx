import { DeliveryStatus } from '../../../app/api/apiTypes/orderApiTypes';
import OrderCancelledBadge from './OrderCancelledBadge';

interface MyOrderInfoProps {
  language: Record<string, string>;
  status: DeliveryStatus;
}

const MyOrderInfo = ({ status, language }: MyOrderInfoProps) => (
  <div>
    {status === 'cancelled' ? (
      <OrderCancelledBadge language={language} />
    ) : (
      <h2>{language.orderStatusMessage}</h2>
    )}
  </div>
);

export default MyOrderInfo;
