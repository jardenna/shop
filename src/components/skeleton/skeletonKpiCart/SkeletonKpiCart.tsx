import Skeleton from '../Skeleton';
import './_skeleton-kpi-cart.scss';
import SkeletonKpiCartText from './SkeletonKpiCartText';

const SkeletonKpiCart = () => (
  <div className="cart">
    <div className="card-main">
      <SkeletonKpiCartText />
      <Skeleton className="card-chart" />
    </div>
  </div>
);

export default SkeletonKpiCart;
