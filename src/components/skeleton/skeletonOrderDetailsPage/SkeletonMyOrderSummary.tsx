import Skeleton from '../Skeleton';
import SkeletonBadge from '../SkeletonBadge';

const SkeletonMyOrderSummary = () => (
  <div className="items-col">
    <Skeleton />
    <SkeletonBadge />

    <div className="item-row">
      <Skeleton className="item-thumb" />
      <div className="item-info">
        <Skeleton className="item-name" />
        <Skeleton className="item-price" />
        <div className="item-meta-lines">
          <Skeleton count={3} />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonMyOrderSummary;
