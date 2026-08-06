import Skeleton from '../../Skeleton';
import './_payment-method.scss';
import SkeletonPaymentMethodIcons from './SkeletonPaymentMethodIcons';

const PaymentMethods = () => (
  <span className="skeleton-column">
    <span className="payment-methods">
      <span className="payment-method">
        <Skeleton className="radio-skeleton" />
        <Skeleton className="label-skeleton" />
      </span>
      <SkeletonPaymentMethodIcons />
    </span>
  </span>
);

export default PaymentMethods;
