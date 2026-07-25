import SkeletonFormShop from '../skelefonForms/SkeletonFormShop';
import SkeletonAddressList from '../skeletonAddressList/SkeletonAddressList';
import PaymentMethods from './PaymentMethods';
import SummeryLine from './SummeryLine';

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
      <SummeryLine />

      <div className="summary-total">
        <div className="skeleton label-skeleton" />
        <div className="skeleton value-skeleton" />
      </div>
    </div>
  </div>
);

export default Page;
