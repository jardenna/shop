import SkeletonAdminPage from './SkeletonAdminPage';
import SkeletonFlexInputList from './SkeletonFlexInputList';
import SkeletonFormCart from './SkeletonFormCart';
import SkeletonImageUpload from './SkeletonImageUpload';

import SkeletonInputList from './SkeletonInputList';

const SkeletonUpdateProduct = () => (
  <SkeletonAdminPage variant="large">
    <div className="product-form-container">
      <div className="product-form-left-column">
        <SkeletonFormCart>
          <SkeletonInputList count={1} />
        </SkeletonFormCart>
        <SkeletonImageUpload />
        <SkeletonFormCart>
          <SkeletonInputList count={2} />
          <SkeletonFlexInputList />
        </SkeletonFormCart>
      </div>
      <div className="product-form-right-column">ss</div>
    </div>
  </SkeletonAdminPage>
);

export default SkeletonUpdateProduct;
