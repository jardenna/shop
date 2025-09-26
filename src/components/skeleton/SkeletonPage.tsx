import type { PickedSkeletonTypes } from './Skeleton';
import Skeleton from './Skeleton';
import SkeletonBreadCrumbs from './SkeletonBreadCrumbs';
import SkeletonHeader from './SkeletonHeader';

const SkeletonPage = ({ count = 2, height = '' }: PickedSkeletonTypes) => (
  <div className="skeleton-column">
    <SkeletonBreadCrumbs />
    <SkeletonHeader hideLink />
    <div className="page-card">
      <div className="skeleton-page skeleton-column">
        <Skeleton count={count} height={height} />
      </div>
    </div>
  </div>
);
export default SkeletonPage;
