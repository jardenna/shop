import Skeleton from '../Skeleton';
import SkeletonBadge from '../SkeletonBadge';
import SkeletonButton from '../SkeletonButton';
import SkeletonMyOrderSummary from './SkeletonMyOrderSummary';

const SkeletonOrderCart = () => (
  <div className="skeleton-order-cart">
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
);

export default SkeletonOrderCart;
