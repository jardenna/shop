import Skeleton from '../Skeleton';
import SkeletonKpiCartText from './SkeletonKpiCartText';

const SkeletonPeriodKpiCart = () => (
  <div className="cart position-relative">
    <Skeleton className="card-info" />

    <div className="card-main">
      <SkeletonKpiCartText />
    </div>

    <div className="skeleton-progress">
      <div className="progress-labels">
        <Skeleton className="progress-label" />
        <Skeleton className="progress-value" />
      </div>
      <Skeleton className="progress-bar" />
    </div>
  </div>
);

export default SkeletonPeriodKpiCart;
