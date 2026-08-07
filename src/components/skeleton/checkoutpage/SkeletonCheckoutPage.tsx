import SkeletonFormShop from '../skelefonForms/SkeletonFormShop';
import SkeletonAddressList from '../skeletonAddressList/SkeletonAddressList';
import SkeletonHeading from '../SkeletonHeading';
import SkeletonPriceList from '../skeletonPriceList/SkeletonPriceList';
import SkeletonProductRow from './productRow/SkeletonProductRow';
import SkeletonPaymentMethods from './skeletonPaymentMethods/SkeletonPaymentMethods';

const SkeletonCheckoutPage = () => (
  <div className="checkout-page order-flow">
    <div className="order-flow-list">
      <span>
        <SkeletonHeading />
        <SkeletonAddressList />
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
