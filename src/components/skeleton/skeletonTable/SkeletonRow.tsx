import { SkeletonProps } from '../Skeleton';
import './_skeleton-table.scss';
import SkeletonCell from './SkeletonCell';

interface SkeletonRowProps extends SkeletonProps {
  skeletonHeight: string;
}

const SkeletonRow = ({ count = 12, skeletonHeight }: SkeletonRowProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="table">
      {skeletons.map((_, index) => (
        <div
          className="row"
          key={index}
          style={{ height: `${skeletonHeight}rem` }}
        >
          <SkeletonCell />
        </div>
      ))}
    </div>
  );
};

export default SkeletonRow;
