import Skeleton, { SkeletonProps } from '../Skeleton';
import SkeletonBadge from '../SkeletonBadge';
import SkeletonButton from '../SkeletonButton';
import SkeletonMyOrderSummary from './SkeletonMyOrderSummary';

const SkeletonOrderCart = ({ count = 3 }: SkeletonProps) => {
  const skeletons = Array.from({ length: count });

  return skeletons.map((_, index) => (
    <div className="my-orders-page-cart skeleton-order-cart" key={index}>
      <div className="order-header">
        <div>
          <Skeleton className="order-id" />
          <SkeletonBadge width="8" />
        </div>
        <Skeleton className="order-price" />
      </div>
      <SkeletonMyOrderSummary />
      <Skeleton className="skeleton-divider" />
      <div className="footer-row">
        <Skeleton className="delivery-date" />
        <SkeletonButton width="10" />
      </div>
    </div>
  ));
};

export default SkeletonOrderCart;
