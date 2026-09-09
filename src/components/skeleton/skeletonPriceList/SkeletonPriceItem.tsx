import '../_skeleton.scss';
import Skeleton, { PickedSkeletonTypes } from '../Skeleton';

const SkeletonPriceItem = ({ count = 5 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className="flex flex-column">
      {skeletons.map((_, index) => (
        <span className="summary-line" key={index}>
          <Skeleton className="label-skeleton" />
          <Skeleton className="value-skeleton" />
        </span>
      ))}
    </span>
  );
};

export default SkeletonPriceItem;
