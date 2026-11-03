import Skeleton from '../Skeleton';
import './_skeleton-progress-bar.scss';

const SkeletonProgressBar = () => (
  <div className="skeleton-progress">
    <div className="progress-labels">
      <Skeleton className="progress-label" />
      <Skeleton className="progress-value" />
    </div>
    <Skeleton className="progress-bar" />
  </div>
);

export default SkeletonProgressBar;
