import Skeleton from '../Skeleton';

const SkeletonMyOrderSummary = () => (
  <div className="items-col">
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
