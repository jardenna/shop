import SkeletonAdminPage from './SkeletonAdminPage';
import SkeletonUpdateProductLeft from './SkeletonUpdateProductLeft';

const SkeletonUpdateProduct = () => (
  <SkeletonAdminPage variant="large">
    <div className="product-form-container">
      <SkeletonUpdateProductLeft />
      <div className="product-form-right-column">ss</div>
    </div>
  </SkeletonAdminPage>
);

export default SkeletonUpdateProduct;
