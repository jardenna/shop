import Skeleton from '../Skeleton';
import SkeletonControlList from '../SkeletonControlList';
import SkeletonHeader from '../SkeletonHeader';
import SkeletonParagraph from '../SkeletonParagraph';

const SkeletonSinglePage = () => (
  <div className="single-product-container">
    <div className="width-100">
      <Skeleton variant="img" height="45" />
    </div>
    <div className="flex column">
      <SkeletonParagraph width="4" count={1} />
      <SkeletonHeader hideLink />
      <SkeletonControlList count={4} variant="large" />
      <SkeletonControlList count={5} />
      <Skeleton count={4} />
    </div>
  </div>
);

export default SkeletonSinglePage;
