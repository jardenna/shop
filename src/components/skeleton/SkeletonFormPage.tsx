import type { PickedSkeletonTypes } from './Skeleton';
import SkeletonAdminPage from './SkeletonAdminPage';
import SkeletonFooter from './SkeletonFooter';
import SkeletonInputList from './SkeletonInputList';

const SkeletonFormPage = ({ count = 2 }: PickedSkeletonTypes) => (
  <SkeletonAdminPage>
    <SkeletonInputList count={count} />
    <SkeletonFooter />
  </SkeletonAdminPage>
);

export default SkeletonFormPage;
