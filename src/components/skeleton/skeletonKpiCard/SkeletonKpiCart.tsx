import SkeletonIcon from '../skeltonIcon/SkeletonIcon';
import SkeletonKpiCartText from './SkeletonKpiCartText';

const SkeletonKpiCart = () => (
  <div className="cart skeleton-kpi-cart">
    <SkeletonKpiCartText />
    <SkeletonIcon />
  </div>
);

export default SkeletonKpiCart;
