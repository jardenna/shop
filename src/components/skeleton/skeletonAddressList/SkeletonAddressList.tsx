import Skeleton from '../Skeleton';
import SkeletonActions from '../SkeletonActions';
import './_skeleton-address-list.scss';

const SkeletonAddressList = () => (
  <div className="skeleton-address">
    <div className="address-lines">
      <Skeleton className="line-name" />
      <Skeleton className="line-street" />
      <Skeleton className="line-city" />
      <Skeleton className="line-country" />
    </div>

    <SkeletonActions />
    <div className="add-address-row">
      <Skeleton />
    </div>
  </div>
);

export default SkeletonAddressList;
