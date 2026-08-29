import Skeleton from '../Skeleton';
import SkeletonBadge from '../SkeletonBadge';
import SkeletonButton from '../SkeletonButton';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonMyOrderSummary from './SkeletonMyOrderSummary';
import './_skeleton-my-order-page.scss';

const SkeletonMyOrderPage = () => (
  <div className="skeleton-order-page my-orders-page-cart">
    <span className="skeleton-sub-header">
      <Skeleton className="skeleton-sub-header-title" />
      <SkeletonParagraph count={2} />
    </span>
    <div className="skeleton-order-cart">
      <div className="order-header">
        <div className="skeleton order-id" />
        <div className="skeleton order-price" />
      </div>
      <SkeletonBadge width="8" />
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
