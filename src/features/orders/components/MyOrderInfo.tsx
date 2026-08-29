import { DeliveryStatus } from '../../../app/api/apiTypes/orderApiTypes';
import Badge from '../../../components/badge/Badge';

interface MyOrderInfoProps {
  language: Record<string, string>;
  status: DeliveryStatus;
}

const MyOrderInfo = ({ status, language }: MyOrderInfoProps) => (
  <div>
    {status === 'cancelled' ? (
      <Badge
        className="cancelled"
        variant="large"
        badgeText={language.orderCancelled}
      />
    ) : (
      <h2>{language.orderStatusMessage}</h2>
    )}
  </div>
);

export default MyOrderInfo;
