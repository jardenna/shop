import SkeletonFlexInputList from '../SkeletonFlexInputList';
import SkeletonFormCard from '../SkeletonFormCard';
import SkeletonImageUpload from '../SkeletonImageUpload';
import SkeletonInputList from '../SkeletonInputList';

const SkeletonUpdateProductLeft = () => (
  <div className="product-form-left-column">
    <SkeletonFormCard>
      <SkeletonInputList count={1} />
    </SkeletonFormCard>
    <SkeletonFormCard>
      <SkeletonImageUpload />
    </SkeletonFormCard>
    <SkeletonFormCard>
      <SkeletonInputList count={2} />
      <SkeletonFlexInputList className="skeleton-flex-input-list" />
    </SkeletonFormCard>
  </div>
);

export default SkeletonUpdateProductLeft;
