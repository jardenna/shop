import { SkeletonProps } from '../Skeleton';
import SkeletonKpiCart from './SkeletonKpiCart';
import SkeletonPeriodKpiCart from './SkeletonPeriodKpiCart';

const SkeltonKpiList = ({ count = 6 }: SkeletonProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="kpi-cart-list">
      {skeletons.map((_, index) =>
        index < 3 ? (
          <SkeletonKpiCart key={index} />
        ) : (
          <SkeletonPeriodKpiCart key={index} />
        ),
      )}
    </div>
  );
};

export default SkeltonKpiList;
