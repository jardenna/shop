import Skeleton from '../Skeleton';
import SkeletonHeading from '../SkeletonHeading';

const SkeletonSummeryItem = () => (
  <div className="items-col">
    <SkeletonHeading />

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
