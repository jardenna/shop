import { paymentMethodLabels } from '../../../../app/api/apiConstants';
import { PaymentMethods } from '../../../../app/api/apiTypes/paymentApiTypes';
import { useLanguage } from '../../../language/useLanguage';
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
      <h2 className="order-flow-title confirmation-detail-list-title">
        {language.orderSummary}
      </h2>
      <ul className="confirmation-detail-list">
        <ConfirmationDetailItem text={`# ${id}`} label={language.orderNumber} />
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
