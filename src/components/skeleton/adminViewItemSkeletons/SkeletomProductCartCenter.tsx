import SkeletonControlList from '../SkeletonControlList';
import SkeletonGrid from '../SkeletonGrid';

const SkeletomProductCartCenter = () => (
  <div className="skeleton-view-cart">
    <SkeletonGrid count={4} />
    <SkeletonControlList count={4} />
    <SkeletonControlList count={4} variant="medium" />
  </div>
);

export default SkeletomProductCartCenter;
