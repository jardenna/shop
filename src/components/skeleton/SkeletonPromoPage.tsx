import SkeletonAdminPage from './SkeletonAdminPage';
import SkeletonFlexInputList from './SkeletonFlexInputList';
import SkeletonFooter from './SkeletonFooter';
import SkeletonFormCart from './SkeletonFormCart';
import SkeletonInputList from './SkeletonInputList';
import SkeletonToggleButton from './SkeletonToggleButton';

const SkeletonPromoPage = () => (
  <SkeletonAdminPage variant="medium">
    <div className="skeleton-promo-code-page">
      <SkeletonFormCart>
        <SkeletonToggleButton />
        <div className="skeleton-column" />
      </SkeletonFormCart>
      <div className="flex">
        <SkeletonFormCart>
          <div className="skeleton-column">
            <SkeletonFlexInputList />
            <SkeletonInputList count={1} />
          </div>
        </SkeletonFormCart>
        <SkeletonFormCart>
          <div className="skeleton-column">
            <SkeletonInputList count={2} labelWidth="5" />
          </div>
        </SkeletonFormCart>
      </div>
      <SkeletonFooter />
    </div>
  </SkeletonAdminPage>
);

export default SkeletonPromoPage;
