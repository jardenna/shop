import Skeleton from './Skeleton';
import SkeletonButton from './SkeletonButton';

const SkeletonImageUpload = () => (
  <>
    <div className="upload-img-container">
      <Skeleton width="12" height="6" />
      <div>
        <SkeletonButton width="12" />
      </div>
    </div>
    <Skeleton width="28" height="1" />
  </>
);

export default SkeletonImageUpload;
