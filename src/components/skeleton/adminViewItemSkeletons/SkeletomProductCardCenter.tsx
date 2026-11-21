import SkeletonControlList from '../SkeletonControlList';
import SkeletonGrid from '../SkeletonGrid';

const SkeletomProductCardCenter = () => (
  <div className="skeleton-view-card">
    <SkeletonGrid count={4} />
    <SkeletonControlList count={4} />
    <SkeletonControlList count={4} variant="medium" />
  </div>
);

export default SkeletomProductCardCenter;
