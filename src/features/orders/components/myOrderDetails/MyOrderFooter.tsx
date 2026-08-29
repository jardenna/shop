import { addBusinessDays } from 'date-fns';
import {
  Delivery,
  DeliveryStatus,
} from '../../../../app/api/apiTypes/orderApiTypes';
import Button from '../../../../components/Button';
import DateDisplay from '../../../../components/datePicker/DateDisplay';

interface MyOrderFooterProps {
  delivery: Delivery;
  estimatedDelivery: Date;
  language: Record<string, string>;
  orderStatus: DeliveryStatus;
  shippedAt?: Date;
  onViewDetails: () => void;
}

const MyOrderFooter = ({
  language,
  estimatedDelivery,
  shippedAt,
  onViewDetails,
  orderStatus,
  delivery,
}: MyOrderFooterProps) => {
  const currentDate = new Date();
  const deliveryDate = addBusinessDays(currentDate, 3);

  const latestHistory = delivery.statusHistory.at(-1);
  console.log(latestHistory);

  return (
    <footer className="my-order-footer">
      {orderStatus === 'created' && (
        <div>
          {language.estimatedDelivery}:<DateDisplay date={deliveryDate} />
        </div>
      )}
      {orderStatus === 'cancelled' && (
        <div>
          {language.cancelled}: <DateDisplay date={estimatedDelivery} />
        </div>
      )}
      {shippedAt && (
        <div>
          {language.estimatedDelivery}: <DateDisplay date={shippedAt} />
        </div>
      )}

      <Button onClick={onViewDetails}>{language.showDetails}</Button>
    </footer>
  );
};

export default MyOrderFooter;
