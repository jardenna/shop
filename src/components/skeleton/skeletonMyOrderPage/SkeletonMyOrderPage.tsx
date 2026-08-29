import Skeleton from '../Skeleton';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonMyOrderSummary from './SkeletonMyOrderSummary';

const SkeletonMyOrderPage = () => (
  <div className="skeleton-order-page">
    <span className="skeleton-sub-header">
      <Skeleton className="skeleton-sub-header-title" />
      <SkeletonParagraph count={2} />
    </span>

    <div className="content-row">
      <SkeletonMyOrderSummary />
    </div>
  </div>
);

export default SkeletonMyOrderPage;
