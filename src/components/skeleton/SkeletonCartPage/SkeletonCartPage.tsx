import SkeletonPaymentMethodIcons from '../checkoutpage/skeletonPaymentMethods/SkeletonPaymentMethodIcons';
import SkeletonButton from '../SkeletonButton';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonPriceList from '../skeletonPriceList/SkeletonPriceList';
import './_skeleton-cart-page.scss';
import SkeletonProductCart from './SkeletonProductCart';

const SkeletonCartPage = () => (
  <span className="order-flow">
    <div>
      <SkeletonProductCart />
    </div>
    <span className="flex flex-column">
      <SkeletonPriceList />
      <SkeletonButton />
      <SkeletonPaymentMethodIcons />
      <SkeletonParagraph />
    </span>
  </span>
);

export default SkeletonCartPage;
