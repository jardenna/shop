import Skeleton from '../Skeleton';
import SkeletonHeader from '../SkeletonHeader';
import SkeletonRatingDistributionList from '../skeletonRatingDistributionList/SkeletonRatingList';
import SkeletonRatingList from '../SkeletonRatingList';
import SkeletonIcon from '../skeltonIcon/SkeletonIcon';
import './_skeleton-admin-review-page.scss';
import SkeletonAdminReviewCardList from './SkeletonAdminReviewCardList';
import SkeletonAdminReviewStats from './SkeletonAdminReviewStats';

const SkeletonAdminReviewPage = () => (
  <div className="admin-page page-medium">
    <SkeletonHeader showLink />
    <div className="page-cart">
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
  </div>
);

export default SkeletonAdminReviewPage;
