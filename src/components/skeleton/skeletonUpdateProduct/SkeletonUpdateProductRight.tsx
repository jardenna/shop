import SkeletonControlList from '../SkeletonControlList';
import SkeletonFlexInputList from '../SkeletonFlexInputList';
import SkeletonFormCart from '../SkeletonFormCart';
import SkeletonInputList from '../SkeletonInputList';
import SkeletonPriceItem from '../skeletonPriceList/SkeletonPriceItem';
import SkeletonToggleButton from '../SkeletonToggleButton';

const SkeletonUpdateProductRight = () => (
  <div className="product-form-right-column">
    <SkeletonFormCart>
      <div className="skeleton-column">
        <SkeletonInputList count={1} />
        <SkeletonControlList variant="medium" count={4} />
      </div>
    </SkeletonFormCart>

    <SkeletonFormCart>
      <div className="skeleton-column">
        <SkeletonFlexInputList />
        <SkeletonToggleButton />
      </div>
    </SkeletonFormCart>

    <SkeletonFormCart>
      <div className="skeleton-column">
        <SkeletonInputList count={2} />
        <SkeletonPriceItem count={1} />
      </div>
    </SkeletonFormCart>
  </div>
);

export default SkeletonUpdateProductRight;
