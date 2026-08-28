import { DeliveryStatus } from '../../../../app/api/apiTypes/orderApiTypes';
import Button from '../../../../components/Button';
import DateDisplay from '../../../../components/datePicker/DateDisplay';

interface MyOrderFooterProps {
  estimatedDelivery: Date;
  language: Record<string, string>;
  orderStatus: DeliveryStatus;
  onViewDetails: () => void;
}

const MyOrderFooter = ({
  language,
  estimatedDelivery,
  onViewDetails,
  orderStatus,
}: MyOrderFooterProps) => (
  <footer className="my-order-footer">
    {orderStatus !== 'cancelled' ? (
      <div>
        {language.estimatedDelivery}: <DateDisplay date={estimatedDelivery} />
      </div>
    ) : (
      <div>
        {language.cancelled}: <DateDisplay date={estimatedDelivery} />
      </div>
    )}

    <Button onClick={onViewDetails}>{language.showDetails}</Button>
  </footer>
);

export default MyOrderFooter;
