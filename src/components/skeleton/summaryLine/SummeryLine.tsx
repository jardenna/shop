import '../_skeleton.scss';
import { PickedSkeletonTypes } from '../Skeleton';
import './_summary-line.scss';

const SummeryLine = ({ count = 5 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className="skeleton-column">
      {skeletons.map((_, index) => (
        <span className="summary-line" key={index}>
          <span className="skeleton label-skeleton" />
          <span className="skeleton value-skeleton" />
        </span>
      ))}
    </span>
  );
};

export default SummeryLine;
