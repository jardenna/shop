import Skeleton from '../Skeleton';
import './_skeleton-number-step.scss';

const SkeletonNumberStep = () => (
  <div className="skeleton-number-step">
    <Skeleton className="qty-title" />
    <div className="qty-selector">
      <Skeleton />
      <Skeleton className="qty-value" />
      <Skeleton />
    </div>
  </div>
);

export default SkeletonNumberStep;
