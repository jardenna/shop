import { paymentMethodLabels } from '../../../../app/api/apiConstants';
import { PaymentMethods } from '../../../../app/api/apiTypes/paymentApiTypes';
import { formatOrderNumber } from '../../../../utils/formatOrderNo';
import { useLanguage } from '../../../language/useLanguage';
import OrderHeading from '../orderHeading/OrderHeading';
import ConfirmationDetailItem from './ConfirmationDetailItem';
import './_confirmation-details.scss';

interface ConfirmationDetailsProp {
  createdAt: Date;
  id: string;
  method: PaymentMethods;
}

const ConfirmationDetails = ({
  createdAt,
  method,
  id,
}: ConfirmationDetailsProp) => {
  const { language } = useLanguage();

  return (
    <article className="confirmation-info">
      <OrderHeading variant="underline" heading={language.orderSummary} />

      <ul className="confirmation-detail-list">
        <ConfirmationDetailItem
          text={formatOrderNumber(id)}
          label={language.orderNumber}
        />
        <ConfirmationDetailItem date={createdAt} label={language.orderPlaced} />
        <ConfirmationDetailItem
          text={paymentMethodLabels[method]}
          label={language.paymentMethod}
        />
      </ul>
    </article>
  );
};

export default ConfirmationDetails;
