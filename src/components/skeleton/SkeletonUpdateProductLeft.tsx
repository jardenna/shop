import SkeletonFlexInputList from './SkeletonFlexInputList';
import SkeletonFormCart from './SkeletonFormCart';
import SkeletonImageUpload from './SkeletonImageUpload';
import SkeletonInputList from './SkeletonInputList';

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
      <SkeletonFlexInputList />
    </SkeletonFormCart>
  </div>
);

export default SkeletonUpdateProductLeft;
