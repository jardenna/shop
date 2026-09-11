import SkeletonAdminPage from '../SkeletonAdminPage';
import SkeletonFooter from '../SkeletonFooter';
import SkeletonUpdateProductLeft from './SkeletonUpdateProductLeft';
import SkeletonUpdateProductRight from './SkeletonUpdateProductRight';

const SkeletonUpdateProduct = () => (
  <SkeletonAdminPage variant="large">
    <div className="product-form-container">
      <SkeletonUpdateProductLeft />
      <SkeletonUpdateProductRight />
    </div>
    <SkeletonFooter />
  </SkeletonAdminPage>
);

export default SkeletonUpdateProduct;
