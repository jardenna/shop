import Skeleton, { PickedSkeletonTypes } from '../Skeleton';
import SkeletonHeading from '../SkeletonHeading';
import './_skeleton-info-background.scss';

const SkeletonInfoBackground = ({ count = 2 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });

  return (
    <span className="skeleton-info-bg-list">
      {skeletons.map((_, index) => (
        <div className="skeleton-info-bg-item" key={index}>
          <SkeletonHeading />

          <Skeleton count={4} width="10" height="1.2" />
        </div>
      ))}
    </span>
  );
};

export default SkeletonInfoBackground;
