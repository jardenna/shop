import type { PickedSkeletonTypes } from './Skeleton';
import SkeletonBreadCrumbs from './SkeletonBreadCrumbs';
import SkeletonHeader from './SkeletonHeader';
import SkeletonInputList from './SkeletonInputList';
import SkeletonList from './SkeletonList';

const SkeletonForm = ({ count = 2 }: PickedSkeletonTypes) => (
  <div className="skeleton-column page-small">
    <SkeletonBreadCrumbs />
    <SkeletonHeader hideLink />
    <div className="page-card">
      <div className="skeleton-page skeleton-column">
        <SkeletonInputList count={count} />
        <SkeletonList />
      </div>
    </div>
  </div>
);

export default SkeletonForm;
