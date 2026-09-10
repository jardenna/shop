import type { PickedSkeletonTypes } from './Skeleton';
import SkeletonBreadCrumbs from './SkeletonBreadCrumbs';
import SkeletonFooter from './SkeletonFooter';
import SkeletonHeader from './SkeletonHeader';
import SkeletonInputList from './SkeletonInputList';

const SkeletonForm = ({ count = 2 }: PickedSkeletonTypes) => (
  <div className="skeleton-column page-small">
    <SkeletonBreadCrumbs />
    <SkeletonHeader hideLink />
    <div className="page-cart">
      <div className="skeleton-page skeleton-column">
        <SkeletonInputList count={count} />
        <SkeletonFooter />
      </div>
    </div>
  </div>
);

export default SkeletonForm;
