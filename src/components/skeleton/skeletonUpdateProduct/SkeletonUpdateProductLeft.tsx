import SkeletonFlexInputList from '../SkeletonFlexInputList';
import SkeletonFormCart from '../SkeletonFormCart';
import SkeletonImageUpload from '../SkeletonImageUpload';
import SkeletonInputList from '../SkeletonInputList';

const SkeletonUpdateProductLeft = () => (
  <div className="product-form-left-column">
    <SkeletonFormCart>
      <SkeletonInputList count={1} />
    </SkeletonFormCart>
    <SkeletonFormCart>
      <SkeletonImageUpload />
    </SkeletonFormCart>
    <SkeletonFormCart>
      <SkeletonInputList count={2} />
      <SkeletonFlexInputList className="skeleton-flex-input-list" />
    </SkeletonFormCart>
  </div>
);

export default SkeletonUpdateProductLeft;
