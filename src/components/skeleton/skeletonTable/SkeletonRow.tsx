import Skeleton from '../Skeleton';
import './_skeleton-table.scss';

const SkeletonRow = () => (
  <div className="table">
    <div className="row">
      <Skeleton className="cell" />
      <Skeleton className="cell" />
      <Skeleton className="cell" />
      <Skeleton className="cell" />
    </div>
  </div>
);

export default SkeletonRow;
