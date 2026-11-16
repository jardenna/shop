import Skeleton from '../Skeleton';
import SkeletonRatingDistributionList from '../skeletonRatingDistributionList/SkeletonRatingList';
import SkeletonRatingList from '../SkeletonRatingList';
import './_skeleton-admin-review-page.scss';
import SkeletonAdminReviewStats from './SkeletonAdminReviewStats';

const SkeletonAdminReviewPage = () => (
  <div>
    <div className="review-stats-list">
      <SkeletonAdminReviewStats>
        <Skeleton width="8" height="0.7" />
      </SkeletonAdminReviewStats>
      <SkeletonAdminReviewStats>
        <SkeletonRatingList />
      </SkeletonAdminReviewStats>

      <div className="rating-distribution-container">
        <SkeletonRatingDistributionList />
      </div>
    </div>

    {/* <SkeletonAdminReviewCardList /> */}
  </div>
);

export default SkeletonAdminReviewPage;
