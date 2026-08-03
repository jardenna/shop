import Skeleton, { PickedSkeletonTypes } from '../Skeleton';

const SkeletonOverviewGroup = ({ count = 3 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });

  return (
    <span className="overview-col">
      <Skeleton className="overview-title" />
      <span className="overview-group">
        {skeletons.map((_, index) => (
          <span key={index} className="overview-items">
            <Skeleton className="overview-label" />
            <Skeleton className="overview-value" />
          </span>
        ))}
      </span>
    </span>
  );
};

export default SkeletonOverviewGroup;
