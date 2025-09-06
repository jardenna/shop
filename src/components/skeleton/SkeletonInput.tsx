import type { PickedSkeletonTypes } from './Skeleton';
import Skeleton from './Skeleton';

const SkeletonInput = ({ count = 3 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className="skeleton-input-container skeleton-column">
      {skeletons.map((_, index) => (
        <div key={index} className="skeleton-input skeleton-column">
          <Skeleton height="1.3" width="14" />
          <Skeleton height="4" />
        </div>
      ))}
    </span>
  );
};

export default SkeletonInput;
