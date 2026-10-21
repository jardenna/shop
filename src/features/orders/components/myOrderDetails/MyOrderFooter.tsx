import { Delivery } from '../../../../app/api/apiTypes/orderApiTypes';
import Button from '../../../../components/Button';
import DateDisplay from '../../../../components/datePicker/DateDisplay';
import { BtnVariant } from '../../../../types/enums';
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
    <div className="my-order-footer">
      {footerText.date && (
        <div>
          <span>{language[footerText.text]}: </span>
          <DateDisplay date={footerText.date} />
        </div>
      )}

      <div className="my-order-footer-actions">
        <Button
          disabled={
            delivery.status !== 'created' && delivery.status !== 'processing'
          }
          variant={BtnVariant.Danger}
        >
          {language.cancelOrder}
        </Button>
        <Button onClick={onViewDetails}>{language.showDetails}</Button>
      </div>
    </div>
  );
};

export default MyOrderFooter;
