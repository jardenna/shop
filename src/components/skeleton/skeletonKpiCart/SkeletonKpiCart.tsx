import Skeleton from '../Skeleton';
import SkeletonKpiCartText from './SkeletonKpiCartText';

const SkeletonKpiCart = () => (
  <div className="cart skeleton-kpi-cart">
    <SkeletonKpiCartText />
    <Skeleton className="skeleton-icon" />
  </div>
);

export default SkeletonKpiCart;
