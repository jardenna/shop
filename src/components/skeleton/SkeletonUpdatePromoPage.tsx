import SkeletonAdminPage from './SkeletonAdminPage';
import SkeletonFlexInputList from './SkeletonFlexInputList';
import SkeletonFooter from './SkeletonFooter';
import SkeletonFormCard from './SkeletonFormCard';
import SkeletonInputList from './SkeletonInputList';
import SkeletonToggleButton from './SkeletonToggleButton';

const SkeletonUpdatePromoPage = () => (
  <SkeletonAdminPage variant="medium">
    <div className="skeleton-update-promo-code-page">
      <SkeletonFormCard>
        <SkeletonToggleButton />
        <div className="skeleton-column" />
      </SkeletonFormCard>
      <div className="flex">
        <SkeletonFormCard>
          <div className="skeleton-column">
            <SkeletonFlexInputList />
            <SkeletonInputList count={1} />
          </div>
        </SkeletonFormCard>
        <SkeletonFormCard>
          <div className="skeleton-column">
            <SkeletonInputList count={2} labelWidth="5" />
          </div>
        </SkeletonFormCard>
      </div>
      <SkeletonFooter />
    </div>
  </SkeletonAdminPage>
);

export default SkeletonUpdatePromoPage;
