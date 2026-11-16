import SkeletonRatingDistributionList from '../skeletonRatingDistributionList/SkeletonRatingList';
import './_skeleton-admin-review-page.scss';

const SkeletonAdminReviewPage = () => (
  <div>
    <SkeletonRatingDistributionList />
    {/* <SkeletonAdminReviewCardList /> */}
  </div>
);

export default SkeletonAdminReviewPage;
