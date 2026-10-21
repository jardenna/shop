import { Delivery } from '../../../../app/api/apiTypes/orderApiTypes';
import Button from '../../../../components/Button';
import DateDisplay from '../../../../components/datePicker/DateDisplay';
import { createDeliveryDateText } from '../../utils/createDeliveryDateText';

interface MyOrderFooterProps {
  delivery: Delivery;
  language: Record<string, string>;
  onViewDetails: () => void;
}

const MyOrderFooter = ({
  language,
  onViewDetails,
  delivery,
}: MyOrderFooterProps) => {
  const footerText = createDeliveryDateText(delivery);

  return (
    <footer className="my-order-footer">
      {footerText.date && (
        <div>
          <span>{language[footerText.text]}: </span>
          <DateDisplay date={footerText.date} />
        </div>
      )}

      <div className="my-order-footer-actions">
        <Button onClick={onViewDetails}>{language.showDetails}</Button>
      </div>
    </footer>
  );
};

export default MyOrderFooter;
