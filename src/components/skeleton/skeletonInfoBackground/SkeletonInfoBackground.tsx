import Skeleton, { SkeletonProps } from '../Skeleton';
import SkeletonHeading from '../SkeletonHeading';
import './_skeleton-info-background.scss';

interface SkeletonInfoBackgroundProps extends SkeletonProps {
  infoItemCount?: number;
}

const SkeletonInfoBackground = ({
  count = 2,
  infoItemCount = 4,
}: SkeletonInfoBackgroundProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <span className="skeleton-info-bg-list">
      {skeletons.map((_, index) => (
        <div className="skeleton-info-bg-item" key={index}>
          <SkeletonHeading />

          <Skeleton count={infoItemCount} height="1.2" />
        </div>
      ))}
    </span>
  );
};

export default SkeletonInfoBackground;
