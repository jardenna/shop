import Skeleton from '../Skeleton';
import SkeletonBadge from '../SkeletonBadge';
import SkeletonHeading from '../SkeletonHeading';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonRatingList from '../SkeletonRatingList';

const SkeletonAdminReviewCard = () => (
  <div className="admin-review-card">
    <div className="review-product-content">
      <Skeleton className="review-product-img" />
      <div className="review-product-info">
        <SkeletonHeading />
        <SkeletonParagraph count={1} width="14" height="1" />
      </div>
    </div>

    <div className="review-info-content">
      <div className="review-info">
        <SkeletonRatingList variant="small" />
        <Skeleton height="1" width="7" />
      </div>
      <SkeletonParagraph />
      <div className="admin-review-footer">
        <Skeleton width="10" height="2" />
        <SkeletonBadge width="3.2" height="1.4" />
      </div>
    </div>
  </div>
);

export default SkeletonAdminReviewCard;
