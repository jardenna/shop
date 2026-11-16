import SkeletonRatingDistributionList from '../skeletonRatingDistributionList/SkeletonRatingDistributionList';
import './_skeleton-admin-review-page.scss';

const SkeletonAdminReviewPage = () => (
  <div>
    <SkeletonRatingDistributionList />
    {/* <SkeletonAdminReviewCardList /> */}
  </div>
);

export default SkeletonAdminReviewPage;
