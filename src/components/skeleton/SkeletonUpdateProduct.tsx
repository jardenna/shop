import Skeleton from './Skeleton';
import SkeletonAdminPage from './SkeletonAdminPage';
import SkeletonFormCart from './SkeletonFormCart';
import SkeletonInputList from './SkeletonInputList';

const SkeletonUpdateProduct = () => (
  <SkeletonAdminPage variant="large">
    <div className="product-form-container">
      <div className="product-form-left-column">
        <SkeletonFormCart>
          <SkeletonInputList count={1} />
        </SkeletonFormCart>
        <SkeletonFormCart>
          <Skeleton height="2" />
        </SkeletonFormCart>
        <SkeletonFormCart>
          <SkeletonInputList count={3} />
        </SkeletonFormCart>
      </div>
      <div className="product-form-right-column">ss</div>
    </div>
  </SkeletonAdminPage>
);

export default SkeletonUpdateProduct;
