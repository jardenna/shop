import SkeletonAdminPage from './SkeletonAdminPage';
import SkeletonFormCart from './SkeletonFormCart';

const SkeletonUpdateProduct = () => (
  <SkeletonAdminPage variant="large">
    <div className="product-form-container">
      <div className="product-form-left-column">
        <SkeletonFormCart>update</SkeletonFormCart>
      </div>
      <div className="product-form-right-column">ss</div>
    </div>
  </SkeletonAdminPage>
);

export default SkeletonUpdateProduct;
