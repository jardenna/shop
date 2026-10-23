import SkeletonHeader from './SkeletonHeader';
import SkeletonTable from './skeletonTable/SkeletonTable';

const SkeletonPromoCodeTable = () => (
  <div className="skeleton-promo-code-table">
    <SkeletonHeader showLink />
    <SkeletonTable rowCount={4} cellCount={4} height="4" />
  </div>
);

export default SkeletonPromoCodeTable;
