import PaymentMethodIcons from '../checkoutpage/paymentMethods/PaymentMethodIcons';
import SkeletonButton from '../SkeletonButton';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonPriceList from '../skeletonPriceList/SkeletonPriceList';
import './_skeleton-cart-page.scss';
import SkeletonProductCart from './SkeletonProductCart';

const SkeletonCartPage = () => (
  <span className="order-flow">
    <SkeletonProductCart />
    <span className="flex flex-column">
      <SkeletonPriceList />
      <SkeletonButton />
      <PaymentMethodIcons />
      <SkeletonParagraph />
    </span>
  </span>
);

export default SkeletonCartPage;
