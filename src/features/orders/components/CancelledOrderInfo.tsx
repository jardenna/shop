import { DeliveryStatus } from '../../../app/api/apiTypes/orderApiTypes';
import Badge from '../../../components/badge/Badge';

interface CancelledOrderInfoProps {
  language: Record<string, string>;
  status: DeliveryStatus;
}

const CancelledOrderInfo = ({ status, language }: CancelledOrderInfoProps) => (
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

export default CancelledOrderInfo;
