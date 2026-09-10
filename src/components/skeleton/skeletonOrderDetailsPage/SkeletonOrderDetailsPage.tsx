import Skeleton from '../Skeleton';
import SkeletonProgress from '../skeletonProgress/SkeletonProgress';
import './_skeleton-order-page.scss';
import SkeletonAddressList from './SkeletonAddressList';
import SkeletonOverviewGroup from './SkeletonOverviewGroup';
import SkeletonPriceCol from './SkeletonPriceCol';
import SkeletonSummeryItem from './SkeletonSummeryItem';

const SkeletonOrderDetailsPage = () => (
  <div className="skeleton-order-page">
    <span className="skeleton-sub-header">
      <Skeleton className="skeleton-sub-header-title" />
      <Skeleton />
    </span>
    <SkeletonProgress />

    <div className="skeleton-content-row">
      <SkeletonSummeryItem />
      <SkeletonPriceCol />
    </div>

    <div className="order-bottom-row">
      <SkeletonOverviewGroup />

      <SkeletonAddressList />
    </div>
  </div>
);

export default SkeletonOrderDetailsPage;
