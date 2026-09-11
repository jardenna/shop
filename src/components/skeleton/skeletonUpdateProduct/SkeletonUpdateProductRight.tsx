import SkeletonFlexInputList from '../SkeletonFlexInputList';
import SkeletonFormCart from '../SkeletonFormCart';
import SkeletonInputList from '../SkeletonInputList';

const SkeletonUpdateProductRight = () => (
  <div className="product-form-right-column">
    <SkeletonFormCart>
      <SkeletonInputList count={1} />
    </SkeletonFormCart>

    <SkeletonFormCart>
      <SkeletonFlexInputList />
    </SkeletonFormCart>

    <SkeletonFormCart>
      <SkeletonInputList count={2} />
    </SkeletonFormCart>
  </div>
);

export default SkeletonUpdateProductRight;
