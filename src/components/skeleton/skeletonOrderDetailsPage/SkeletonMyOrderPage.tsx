import Skeleton from '../Skeleton';
import SkeletonParagraph from '../SkeletonParagraph';
import './_skeleton-order-page.scss';
import SkeletonSummeryItem from './SkeletonSummeryItem';

const SkeletonMyOrderPage = () => (
  <div className="skeleton-order-page">
    <span className="skeleton-sub-header">
      <Skeleton className="skeleton-sub-header-title" />
      <SkeletonParagraph count={2} />
    </span>

    <SkeletonSummeryItem />
  </div>
);

export default SkeletonMyOrderPage;
