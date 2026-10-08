import SkeletonButton from './SkeletonButton';
import SkeletonGrid from './SkeletonGrid';

const SkeletonAccountPage = () => (
  <div className="skeleton-account-page">
    <SkeletonGrid width="8" height="2" />
    <SkeletonButton />
  </div>
);

export default SkeletonAccountPage;
