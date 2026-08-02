import { PaymentMethods } from '../../../app/api/apiTypes/paymentApiTypes';
import { useLanguage } from '../../language/useLanguage';
import ConfirmationDetailItem from './ConfirmationDetailItem';

interface OrderConfirmationDetailsProp {
  createdAt: Date;
  id: string;
  method: PaymentMethods;
}

const OrderConfirmationDetails = ({
  createdAt,
  method,
  id,
}: OrderConfirmationDetailsProp) => {
  const { language } = useLanguage();
  return (
    <section>
      <h2>{language.orderSummary}</h2>

      <ul>
        <ConfirmationDetailItem text={`# ${id}`} label={language.orderNumber} />
        <ConfirmationDetailItem date={createdAt} label={language.orderPlaced} />
        <ConfirmationDetailItem text={method} label={language.paymentMethod} />
      </ul>
    </section>
  );
};

export default OrderConfirmationDetails;
