import SkeletonFormShop from '../skelefonForms/SkeletonFormShop';
import SkeletonAddressList from '../skeletonAddressList/SkeletonAddressList';
import SkeletonPriceList from '../skeletonPriceList/SkeletonPriceList';
import PaymentMethods from './paymentMethods/PaymentMethods';
import ProductRow from './productRow/ProductRow';

const SkeletonCheckoutPage = () => (
  <div className="checkout-page order-flow">
    <div className="order-flow-list">
      <SkeletonAddressList />
      <PaymentMethods />
      <SkeletonFormShop />
    </div>
    <div className="order-flow-aside">
      <ProductRow />
      <SkeletonPriceList />
    </div>
  </div>
);

export default SkeletonCheckoutPage;
