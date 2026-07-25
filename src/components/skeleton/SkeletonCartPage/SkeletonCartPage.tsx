import PaymentMethodIcons from '../checkoutpage/paymentMethods/PaymentMethodIcons';
import SkeletonButton from '../SkeletonButton';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonPriceList from '../skeletonPriceList/SkeletonPriceList';

const SkeletonCartPage = () => (
  <span className="order-flow">
    <span>cart</span>
    <span className="flex flex-column">
      <SkeletonPriceList />
      <SkeletonButton />
      <PaymentMethodIcons />
      <SkeletonParagraph />
    </span>
  </span>
);

export default SkeletonCartPage;
