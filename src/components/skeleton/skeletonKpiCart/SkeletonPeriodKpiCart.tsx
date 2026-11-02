import Skeleton from '../Skeleton';
import SkeletonProgressBar from '../skeletonProgressBar/SkeletonProgressBar';
import SkeletonKpiCartText from './SkeletonKpiCartText';

const SkeletonPeriodKpiCart = () => (
  <div className="cart position-relative">
    <Skeleton className="card-info" />

    <div className="skeleton-kpi-cart">
      <SkeletonKpiCartText />
    </div>

    <SkeletonProgressBar />
  </div>
);

export default SkeletonPeriodKpiCart;
