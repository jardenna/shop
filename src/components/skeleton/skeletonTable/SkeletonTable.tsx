import { SkeletonProps } from '../Skeleton';
import './_skeleton-table.scss';
import SkeletonCell from './SkeletonCell';

interface SkeletonTableProps extends SkeletonProps {
  count?: number;
  skeletonHeight?: string;
}

const SkeletonTable = ({ count = 10, skeletonHeight }: SkeletonTableProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="skeleton-table">
      {skeletons.map((_, index) => (
        <div
          className="skeleton-row"
          key={index}
          style={{ height: `${skeletonHeight}rem` }}
        >
          <SkeletonCell />
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
