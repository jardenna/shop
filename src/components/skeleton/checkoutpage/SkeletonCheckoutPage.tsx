import SkeletonFormShop from '../skelefonForms/SkeletonFormShop';
import SkeletonHeading from '../SkeletonHeading';
import SkeletonInfoBackground from '../skeletonInfoBackground/SkeletonInfoBackground';
import SkeletonPriceList from '../skeletonPriceList/SkeletonPriceList';
import SkeletonProductRow from './productRow/SkeletonProductRow';
import SkeletonPaymentMethods from './skeletonPaymentMethods/SkeletonPaymentMethods';

const SkeletonCheckoutPage = () => (
  <div className="checkout-page order-flow">
    <SkeletonInfoBackground />
    <div className="order-flow-list">
      <span>
        <SkeletonHeading />
        <SkeletonInfoBackground />
        <SkeletonPaymentMethods />
        <SkeletonFormShop />
      </span>
    </div>
    <div className="order-flow-aside">
      <SkeletonProductRow />
      <SkeletonPriceList />
    </div>
  </div>
);

export default SkeletonCheckoutPage;
