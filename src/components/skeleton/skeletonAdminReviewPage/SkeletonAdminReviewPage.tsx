import Skeleton from '../Skeleton';
import SkeletonHeading from '../SkeletonHeading';
import SkeletonRatingDistributionList from '../skeletonRatingDistributionList/SkeletonRatingList';
import './_skeleton-admin-review-page.scss';

const SkeletonAdminReviewPage = () => (
  <div>
    <div className="review-stats-list">
      <div className="review-stats-card">
        <SkeletonHeading />
        <div className="review-stats-info">
          <Skeleton width="2" height="1.5" />
          <Skeleton width="8" height="0.7" />
        </div>
      </div>
      <div className="review-stats-card">
        <SkeletonHeading />
        <div className="review-stats-info">
          <Skeleton width="2" height="1.5" />
          <Skeleton width="8" height="0.7" />
        </div>
      </div>
      <div className="rating-distribution-container">
        <SkeletonRatingDistributionList />
      </div>
    </div>

    {/* <SkeletonAdminReviewCardList /> */}
  </div>
);

export default SkeletonAdminReviewPage;
