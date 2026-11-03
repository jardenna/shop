import { DeliveryStatus } from '../../../app/api/apiTypes/orderApiTypes';
import { Language } from '../../../types/types';
import OrderCancelledBadge from './OrderCancelledBadge';

interface MyOrderInfoProps {
  language: Language;
  status: DeliveryStatus;
}

const MyOrderInfo = ({ status, language }: MyOrderInfoProps) =>
  status === 'cancelled' ? (
    <OrderCancelledBadge language={language} />
  ) : (
    <h2>{language.orderStatusMessage}</h2>
  );

export default MyOrderInfo;
