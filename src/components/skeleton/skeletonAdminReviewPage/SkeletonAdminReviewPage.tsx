import Skeleton from '../Skeleton';
import SkeletonHeading from '../SkeletonHeading';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonRatingList from '../SkeletonRatingList';
import './_skeleton-admin-review-page.scss';

const SkeletonAdminReviewPage = () => (
  <>
    <div className="skeleton-review-page">
      <Skeleton className="product-thumb" />
      <div>
        <SkeletonHeading />
        <SkeletonParagraph count={1} width="14" height="1" />
      </div>

      <SkeletonRatingList variant="medium" />
    </div>
    <Skeleton className="skeleton-divider" />
  </>
);

export default SkeletonAdminReviewPage;
