import Skeleton from '../Skeleton';
import SkeletonAdminPage from '../SkeletonAdminPage';
import SkeletonFooter from '../SkeletonFooter';
import SkeletomProductCardCenter from './SkeletomProductCardCenter';
import SkeletomProductCardLeft from './SkeletomProductCardLeft';

const SkeletonThreeCards = () => (
  <SkeletonAdminPage variant="large" showLink>
    <div className="three-col">
      <SkeletomProductCardLeft />
      <SkeletomProductCardCenter />
      <Skeleton className="skeleton-card-right" />
      <SkeletonFooter />
    </div>
  </SkeletonAdminPage>
);

export default SkeletonThreeCards;
