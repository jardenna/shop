import type { SkeletonProps } from '../Skeleton';
import SkeletonKpiCard from './SkeletonKpiCard';
import SkeletonPeriodKpiCard from './SkeletonPeriodKpiCard';
import './_skeleton-kpi-list.scss';

const SkeltonKpiList = ({ count = 6 }: SkeletonProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="kpi-card-list">
      {skeletons.map((_, index) =>
        index < 3 ? (
          <SkeletonKpiCard key={index} />
        ) : (
          <SkeletonPeriodKpiCard key={index} />
        ),
      )}
    </div>
  );
};

export default SkeltonKpiList;
