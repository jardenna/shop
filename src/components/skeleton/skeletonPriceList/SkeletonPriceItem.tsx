import '../_skeleton.scss';
import Skeleton, { PickedSkeletonTypes } from '../Skeleton';

const SkeletonPriceItem = ({ count = 5 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className="skeleton-price-item">
      {skeletons.map((_, index) => (
        <span className="skeleton-price-line" key={index}>
          <Skeleton className="skeleton-price-label" />
          <Skeleton className="skeleton-price-value" />
        </span>
      ))}
    </span>
  );
};

export default SkeletonPriceItem;
