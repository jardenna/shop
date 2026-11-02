import Skeleton from '../Skeleton';
import './_skeleton-kpi-cart.scss';
import SkeletonKpiCartText from './SkeletonKpiCartText';

const SkeletonKpiCart = () => (
  <div className="cart">
    <div className="skeleton-kpi-cart">
      <SkeletonKpiCartText />
      <Skeleton className="card-chart" />
    </div>
  </div>
);

export default SkeletonKpiCart;
