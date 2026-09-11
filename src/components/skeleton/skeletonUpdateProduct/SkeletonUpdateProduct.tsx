import SkeletonAdminPage from '../SkeletonAdminPage';
import SkeletonUpdateProductLeft from './SkeletonUpdateProductLeft';
import SkeletonUpdateProductRight from './SkeletonUpdateProductRight';

const SkeletonUpdateProduct = () => (
  <SkeletonAdminPage variant="large">
    <div className="product-form-container">
      <SkeletonUpdateProductLeft />
      <SkeletonUpdateProductRight />
    </div>
  </SkeletonAdminPage>
);

export default SkeletonUpdateProduct;
