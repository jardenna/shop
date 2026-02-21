import type { PickedSkeletonTypes } from './Skeleton';
import Skeleton from './Skeleton';

const SkeletonGrid = ({
  count = 5,
  height = '1',
  width = '5',
}: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });
  return (
    <div className="skeleton-column">
      {skeletons.map((_, index) => (
        <div key={index} className="skeleton-2-col">
          <Skeleton height={height} width={width} />
          <Skeleton height={height} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
