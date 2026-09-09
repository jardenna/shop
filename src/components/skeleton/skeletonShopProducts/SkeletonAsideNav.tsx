import Skeleton from '../Skeleton';
import SkeletonNavItem from '../SkeletonNavItem';

const SkeletonAsideNav = () => (
  <div className="skeleton-aside-nav">
    <div className="skeleton-aside-nav-title">
      <Skeleton className="nav-label" />
    </div>
    <SkeletonNavItem className="active" width="7" />
    <SkeletonNavItem width="4" />
    <SkeletonNavItem width="5" />
    <SkeletonNavItem width="9" />
  </div>
);

export default SkeletonAsideNav;
