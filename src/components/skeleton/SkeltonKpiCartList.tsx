import { Fragment } from 'react/jsx-runtime';
import { SkeletonProps } from './Skeleton';
import SkeletonKpiCart from './skeletonKpiCart/SkeletonKpiCart';
import SkeletonPeriodKpiCart from './skeletonKpiCart/SkeletonPeriodKpiCart';

const SkeltonKpiCartList = ({ count = 3 }: SkeletonProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className="kpi-cart-list">
      {skeletons.map((_, index) => (
        <Fragment key={index}>
          <SkeletonKpiCart />
          <SkeletonPeriodKpiCart />
        </Fragment>
      ))}
    </span>
  );
};

export default SkeltonKpiCartList;
