import Skeleton from '../Skeleton';
import './_skeleton-kpi-cart.scss';

const SkeletonKpiCart = () => (
  <div className="cart">
    <div className="card-main">
      <Skeleton className="card-icon" />
      <div className="card-text">
        <Skeleton className="card-label" />
        <Skeleton className="card-value" />
        <Skeleton className="card-sub" />
      </div>
      <Skeleton className="card-chart" />
    </div>
  </div>
);

export default SkeletonKpiCart;
