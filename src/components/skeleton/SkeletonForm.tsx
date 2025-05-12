import { PickedSkeletonTypes } from './Skeleton';
import SkeletonHeader from './SkeletonHeader';
import SkeletonInput from './SkeletonInput';
import SkeletonList from './SkeletonList';

const SkeletonForm = ({ count = 2 }: PickedSkeletonTypes) => (
  <div className="skeleton-column">
    <SkeletonHeader hideLink />
    <div className="page-card">
      <div className="skeleton-page skeleton-column">
        <SkeletonInput count={count} />
        <SkeletonList />
      </div>
    </div>
  </div>
);
export default SkeletonForm;
