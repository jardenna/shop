import Skeleton from '../Skeleton';
import './_skeleton-number-step.scss';

const SkeletonNumberStep = () => (
  <div className="skeleton-number-step">
    <Skeleton className="skeleton-number-title" />
    <div className="skeleton-number-selector">
      <Skeleton />
      <Skeleton className="skeleton-number-value" />
      <Skeleton />
    </div>
  </div>
);

export default SkeletonNumberStep;
