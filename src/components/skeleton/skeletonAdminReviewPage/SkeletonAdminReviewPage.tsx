import Skeleton from '../Skeleton';
import SkeletonRatingDistributionList from '../skeletonRatingDistributionList/SkeletonRatingList';
import SkeletonRatingList from '../SkeletonRatingList';
import SkeletonIcon from '../skeltonIcon/SkeletonIcon';
import './_skeleton-admin-review-page.scss';
import SkeletonAdminReviewCardList from './SkeletonAdminReviewCardList';
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

      <SkeletonRatingDistributionList />
    </div>

    <div className="admin-review-toolbar">
      <Skeleton width="8" height="1.4" />
      <SkeletonIcon />
    </div>
    <SkeletonAdminReviewCardList />
  </div>
);

export default SkeletonAdminReviewPage;
