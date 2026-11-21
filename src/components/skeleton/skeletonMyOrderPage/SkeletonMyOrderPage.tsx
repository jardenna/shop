import Skeleton from '../Skeleton';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonOrderCard from './SkeletonOrderCard';
import './_skeleton-my-order-page.scss';

const SkeletonMyOrderPage = () => (
  <div className="skeleton-order-page ">
    <span className="skeleton-sub-header">
      <Skeleton className="skeleton-sub-header-title" />
      <SkeletonParagraph count={2} />
    </span>
    <SkeletonOrderCard />
  </div>
);

export default SkeletonMyOrderPage;
