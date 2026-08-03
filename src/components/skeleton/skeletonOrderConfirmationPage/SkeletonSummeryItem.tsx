import Skeleton from '../Skeleton';

const SkeletonSummeryItem = () => (
  <div className="items-col">
    <Skeleton className="section-title" />

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

export default SkeletonSummeryItem;
