import Skeleton, { PickedSkeletonTypes } from './Skeleton';

const SkeletonGrid = ({ count = 5 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });
  return (
    <div className="skeleton-column">
      {skeletons.map((_, index) => (
        <div key={index} className="grid grid-two-col">
          <Skeleton height="1" width="5" />
          <Skeleton height="1" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
