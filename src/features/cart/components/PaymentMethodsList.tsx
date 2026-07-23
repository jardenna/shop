import { PaymentMethods } from '../../../app/api/apiTypes/paymentApiTypes';
import IconContent from '../../../components/IconContent';
import { paymentMethodsList } from '../../../config/paymentConfig';

interface PaymentMethodsListProps {
  paymentMethods: PaymentMethods[];
}

const PaymentMethodsList = ({ paymentMethods }: PaymentMethodsListProps) => {
  const availablePaymentMethods = paymentMethodsList.filter((method) =>
    paymentMethods.includes(method.id),
  );

  return (
    <ul className="payment-method-list">
      {availablePaymentMethods.map((payment) => (
        <li key={payment.id}>
          <IconContent iconName={payment.icon} ariaLabel={payment.label} />
        </li>
      ))}
    </ul>
  );
};
export default PaymentMethodsList;
