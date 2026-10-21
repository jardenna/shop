import SkeletonInput from './SkeletonInput';
import SkeletonTable from './skeletonTable/SkeletonTable';

const SkeletonPromoCodeTable = () => (
  <div>
    <SkeletonInput
      className="promo-code-select"
      inputHeight="2.5"
      labelWidth="7"
    />
    <SkeletonTable rowCount={4} cellCount={4} height="4" />
  </div>
);

export default SkeletonPromoCodeTable;
