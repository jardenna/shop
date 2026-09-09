import Skeleton from '../Skeleton';
import SkeletonAccordion from '../skeletonAccordion/SkeletonAccordion';
import SkeletonHeader from '../SkeletonHeader';
import SkeletonParagraph from '../SkeletonParagraph';
import './_skeleton-single-page.scss';
import SkeletonSingleProductInfo from './skeletonSingleProductInfo/SkeletonSingleProductInfo';

const SkeletonSinglePage = () => (
  <>
    <Skeleton height="44" className="skeleton-single-product-img" />

    <div className="flex flex-column">
      <SkeletonParagraph width="4" count={1} />
      <SkeletonHeader hideLink />
      <SkeletonSingleProductInfo />
      <SkeletonAccordion />
    </div>
  </>
);

export default SkeletonSinglePage;
