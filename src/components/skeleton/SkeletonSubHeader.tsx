import Skeleton from './Skeleton';
import SkeletonBadge from './SkeletonBadge';

const SkeletonAdminSubHeader = () => (
  <div className="admin-cart-heading">
    <Skeleton width="12" height="1.8" />
    <SkeletonBadge />
  </div>
);

export default SkeletonAdminSubHeader;
