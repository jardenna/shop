import Skeleton, { PickedSkeletonTypes } from '../Skeleton';
import SkeletonHeading from '../SkeletonHeading';
import './_skeleton-info-background.scss';

const SkeletonInfoBackground = ({ count = 2 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });

  return (
    <span className="skeleton-info-bg-list">
      {skeletons.map((_, index) => (
        <div className="skeleton-info-bg-box" key={index}>
          <SkeletonHeading />

          <Skeleton count={4} width="10" />
        </div>
      ))}
    </span>
  );
};

export default SkeletonInfoBackground;
