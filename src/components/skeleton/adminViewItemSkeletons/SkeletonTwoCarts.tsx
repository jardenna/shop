import Skeleton from '../Skeleton';
import SkeletonAdminPage from '../SkeletonAdminPage';
import SkeletonFooter from '../SkeletonFooter';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonAdminSubHeader from '../SkeletonSubHeader';

const SkeletonTwoCarts = () => (
  <SkeletonAdminPage variant="medium" showLink>
    <div className="two-col admin-cart-container">
      <article className="admin-cart ">
        <div className="admin-cart-content">
          <SkeletonAdminSubHeader />
          <SkeletonParagraph count={2} />
        </div>
      </article>
      <Skeleton className="skeleton-cart-right" />
      <SkeletonFooter />
    </div>
  </SkeletonAdminPage>
);

export default SkeletonTwoCarts;
