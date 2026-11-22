import Skeleton, { type PickedSkeletonTypes } from './Skeleton';
import SkeletonBadge from './SkeletonBadge';

const SkeletonAdminSubHeader = ({ width }: PickedSkeletonTypes) => (
  <div className="admin-card-heading">
    <Skeleton width={width} height="1.8" />
    <SkeletonBadge />
  </div>
);

export default SkeletonAdminSubHeader;
