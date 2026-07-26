import Skeleton, { PickedSkeletonTypes } from './Skeleton';

const SkeletonBreadCrumbs = ({ width = '24' }: PickedSkeletonTypes) => (
  <Skeleton count={1} width={width} height="1" />
);

export default SkeletonBreadCrumbs;
