import '../_skeleton.scss';
import Skeleton from '../Skeleton';
import './_style.scss';
import PaymentMethodIcons from './PaymentMethodIcons';

const PaymentMethods = () => (
  <span className="skeleton-column">
    <span className="payment-methods">
      <span className="payment-method">
        <Skeleton className="radio-skeleton" />
        <Skeleton className="label-skeleton" />
      </span>

      <span className="card-icons">
        <PaymentMethodIcons />
      </span>
    </span>
  </span>
);

export default PaymentMethods;
