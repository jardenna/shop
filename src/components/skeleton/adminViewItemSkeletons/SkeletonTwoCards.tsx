import Skeleton from '../Skeleton';
import SkeletonAdminPage from '../SkeletonAdminPage';
import SkeletonFooter from '../SkeletonFooter';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonAdminSubHeader from '../SkeletonSubHeader';

const SkeletonTwoCards = () => (
  <SkeletonAdminPage variant="medium" showLink>
    <div className="two-col admin-card-container">
      <article className="admin-card">
        <div className="admin-card-content">
          <SkeletonAdminSubHeader />
          <SkeletonParagraph count={2} />
        </div>
      </article>
      <Skeleton className="skeleton-cart-right" />
      <SkeletonFooter />
    </div>
  </SkeletonAdminPage>
);

export default SkeletonTwoCards;
