import SkeletonFormShop from '../skelefonForms/SkeletonFormShop';
import SkeletonAddressList from '../skeletonAddressList/SkeletonAddressList';
import SkeletonPriceList from '../skeletonPriceList/SkeletonPriceList';
import PaymentMethods from './PaymentMethods';

const Page = () => (
  <div className="layout">
    {/* <!-- LEFT COLUMN --> */}
    <div className="left-col">
      <SkeletonAddressList />
      <PaymentMethods />

      <SkeletonFormShop />
    </div>

    {/* <!-- RIGHT COLUMN --> */}
    <div className="right-col">
      <div className="summary-heading skeleton" />

      <div className="product-row">
        <div className="product-thumb skeleton" />
        <div className="product-info">
          <div className="skeleton product-title" />
          <div className="skeleton product-meta" />
        </div>
      </div>
      <SkeletonPriceList />
    </div>
  </div>
);

export default Page;
