import SkeletonControlList from '../SkeletonControlList';
import SkeletonFlexInputList from '../SkeletonFlexInputList';
import SkeletonFormCard from '../SkeletonFormCard';
import SkeletonInputList from '../SkeletonInputList';
import SkeletonPriceItem from '../skeletonPriceList/SkeletonPriceItem';
import SkeletonToggleButton from '../SkeletonToggleButton';

const SkeletonUpdateProductRight = () => (
  <div className="product-form-right-column">
    <SkeletonFormCard>
      <div className="skeleton-column">
        <SkeletonInputList count={1} />
        <SkeletonControlList variant="medium" count={4} />
      </div>
    </SkeletonFormCard>

    <SkeletonFormCard>
      <div className="skeleton-column">
        <SkeletonFlexInputList />
        <SkeletonToggleButton />
      </div>
    </SkeletonFormCard>

    <SkeletonFormCard>
      <div className="skeleton-column">
        <SkeletonInputList count={2} />
        <SkeletonPriceItem count={1} />
      </div>
    </SkeletonFormCard>
  </div>
);

export default SkeletonUpdateProductRight;
