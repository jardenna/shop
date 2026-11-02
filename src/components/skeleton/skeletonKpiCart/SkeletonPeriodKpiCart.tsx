import Skeleton from '../Skeleton';

const SkeletonPeriodKpiCart = () => (
  <div className="cart position-relative">
    <div className="card-info skeleton" />

    <div className="card-main">
      <Skeleton className="card-icon" />
      <div className="card-text">
        <Skeleton className="card-label" />
        <Skeleton className="card-value" />
        <Skeleton className="card-sub" />
      </div>
    </div>

    <div className="skeleton-progress">
      <div className="progress-labels">
        <div className="progress-label skeleton" />
        <div className="progress-value skeleton" />
      </div>
      <div className="progress-bar skeleton" />
    </div>
  </div>
);

export default SkeletonPeriodKpiCart;
