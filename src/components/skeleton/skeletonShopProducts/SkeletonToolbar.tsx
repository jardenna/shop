import Skeleton from '../Skeleton';
import SkeletonIcon from '../skeltonIcon/SkeletonIcon';

const SkeletonToolbar = () => (
  <div className="skeleton-toolbar">
    <div className="view-toggle">
      <SkeletonIcon />
      <SkeletonIcon />
    </div>

    <Skeleton className="results-label" />
    <SkeletonIcon />
  </div>
);

export default SkeletonToolbar;
