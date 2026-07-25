import Skeleton from '../Skeleton';
import SkeletonHeading from '../SkeletonHeading';
import SkeletonList from '../SkeletonList';
import './_skeleton-address-list.scss';

const SkeletonAddressList = () => (
  <div className="flex flex-column">
    <SkeletonHeading />
    <div className="address-lines">
      <Skeleton className="line-name" />
      <Skeleton className="line-street" />
      <Skeleton className="line-city" />
      <Skeleton className="line-country" />
    </div>
    <div className="address-actions">
      <SkeletonList height="1.5" width="1.5" />
    </div>
    <div className="add-address-row">
      <Skeleton />
    </div>
  </div>
);

export default SkeletonAddressList;
