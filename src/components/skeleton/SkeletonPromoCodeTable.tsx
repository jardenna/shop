import SkeletonInput from './SkeletonInput';
import SkeletonTable from './skeletonTable/SkeletonTable';

const SkeletonPromoCodeTable = () => (
  <div>
    <SkeletonInput className="promo-code-select" />
    <SkeletonTable rowCount={4} cellCount={4} height="4" />
  </div>
);

export default SkeletonPromoCodeTable;
