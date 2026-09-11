import Skeleton from '../Skeleton';
import SkeletonAdminPage from '../SkeletonAdminPage';
import SkeletonFooter from '../SkeletonFooter';
import SkeletomProductCartCenter from './SkeletomProductCartCenter';
import SkeletomProductCartLeft from './SkeletomProductCartLeft';

const SkeletonThreeCarts = () => (
  <SkeletonAdminPage variant="large" showLink>
    <div className="three-col">
      <SkeletomProductCartLeft />
      <SkeletomProductCartCenter />
      <Skeleton className="skeleton-cart-right" />
      <SkeletonFooter />
    </div>
  </SkeletonAdminPage>
);

export default SkeletonThreeCarts;
