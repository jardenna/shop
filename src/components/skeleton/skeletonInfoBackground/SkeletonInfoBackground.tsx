import Skeleton, { PickedSkeletonTypes } from '../Skeleton';
import './_skeleton-info-background.scss';

const SkeletonInfoBackground = ({ count = 2 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });

  return (
    <span className="skeleton-info-bg-list">
      {skeletons.map((_, index) => (
        <div className="skeleton-info-bg-box" key={index}>
          <Skeleton width="12" height="1.2" />
          <div className="address-lines">
            <Skeleton count={4} width="10" />
          </div>
        </div>
      ))}
    </span>
  );
};

export default SkeletonInfoBackground;
