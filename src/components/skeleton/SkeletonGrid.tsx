import Skeleton from './Skeleton';
import SkeletonList from './SkeletonList';

const SkeletonGrid = () => (
  <div className="grid three-col">
    <span className="flex column">
      <Skeleton count={6} />
      <SkeletonList count={2} width="14" variant="secondary" />
    </span>
    <span className="flex column">
      <Skeleton count={2} />
      <Skeleton height="7.6" count={2} />
    </span>
    <div className="flex column">
      <Skeleton variant="img" height="24" />
    </div>
  </div>
);

export default SkeletonGrid;
