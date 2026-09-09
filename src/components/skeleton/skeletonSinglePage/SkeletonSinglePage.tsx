import Skeleton from '../Skeleton';
import SkeletonControlList from '../SkeletonControlList';
import SkeletonHeader from '../SkeletonHeader';
import SkeletonParagraph from '../SkeletonParagraph';
import './_skeleton-single-page.scss';

const SkeletonSinglePage = () => (
  <>
    <Skeleton height="44" className="skeleton-single-product-img" />

    <div className="flex flex-column">
      <SkeletonParagraph width="4" count={1} />
      <SkeletonHeader hideLink />
      <SkeletonControlList count={4} />
      <SkeletonControlList count={5} />
      <Skeleton count={4} />
    </div>
  </>
);

export default SkeletonSinglePage;
