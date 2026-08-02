import { PaymentMethods } from '../../../app/api/apiTypes/paymentApiTypes';
import { useLanguage } from '../../language/useLanguage';
import ConfirmationDetailItem from './ConfirmationDetailItem';

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
    <article>
      <h2 className="order-flow-title">{language.orderSummary}</h2>
      <ul className="confirmation-detail-list">
        <ConfirmationDetailItem text={`# ${id}`} label={language.orderNumber} />
        <ConfirmationDetailItem date={createdAt} label={language.orderPlaced} />
        <ConfirmationDetailItem text={method} label={language.paymentMethod} />
      </ul>
    </article>
  );
};

export default ConfirmationDetails;
