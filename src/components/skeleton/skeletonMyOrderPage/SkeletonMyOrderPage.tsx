import Skeleton from '../Skeleton';
import SkeletonBadge from '../SkeletonBadge';
import SkeletonButton from '../SkeletonButton';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonMyOrderSummary from './SkeletonMyOrderSummary';
import './_skeleton-my-order-page.scss';

const SkeletonMyOrderPage = () => (
  <div className="skeleton-order-page ">
    <span className="skeleton-sub-header">
      <Skeleton className="skeleton-sub-header-title" />
      <SkeletonParagraph count={2} />
    </span>
    <div className="my-orders-page-cart skeleton-order-cart">
      <div className="order-header">
        <div>
          <div className="skeleton order-id" />
          <SkeletonBadge width="8" />
        </div>
        <div className="skeleton order-price" />
      </div>

      <div className="skeleton-content-row">
        <SkeletonMyOrderSummary />
      </div>
      <Skeleton className="skeleton-divider" />

      <div className="footer-row">
        <div className="skeleton delivery-date" />
        <SkeletonButton width="10" />
      </div>
    </div>
  </div>
);

export default SkeletonMyOrderPage;
