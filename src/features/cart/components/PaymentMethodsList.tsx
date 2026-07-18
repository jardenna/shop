import { PaymentMethods } from '../../../app/api/apiTypes/cartApiTypes';
import IconContent from '../../../components/IconContent';
import { IconName } from '../../../types/enums';

interface PaymentMethodsListProps {
  paymentMethods: PaymentMethods[];
}

const PaymentMethodsList = ({ paymentMethods }: PaymentMethodsListProps) => (
  <ul className="payment-method-list">
    {paymentMethods.map((payment) => (
      <li key={payment}>
        <IconContent iconName={IconName[payment]} ariaLabel={payment} />
      </li>
    ))}
  </ul>
);

export default PaymentMethodsList;
