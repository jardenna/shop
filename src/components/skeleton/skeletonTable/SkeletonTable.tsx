import { SkeletonProps } from '../Skeleton';
import './_skeleton-table.scss';
import SkeletonCell from './SkeletonCell';

interface SkeletonTableProps extends SkeletonProps {
  cellCount?: number;
  rowCount?: number;
}

const SkeletonTable = ({
  rowCount = 10,
  cellCount,
  height,
}: SkeletonTableProps) => {
  const skeletons = Array.from({ length: rowCount });

  return (
    <div className="skeleton-table">
      {skeletons.map((_, index) => (
        <div
          className="skeleton-row"
          key={index}
          style={{ height: `${height}rem` }}
        >
          <SkeletonCell count={cellCount} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
