import Skeleton from '../Skeleton';
import SkeletonAccordion from '../skeletonAccordion/SkeletonAccordion';
import './_skeleton-single-page.scss';
import SkeletonSingleProductInfo from './skeletonSingleProductInfo/SkeletonSingleProductInfo';

const SkeletonSinglePage = () => (
  <>
    <Skeleton height="44" className="skeleton-single-product-img" />

    <div className="flex flex-column">
      <SkeletonSingleProductInfo />
      Skeleton Accordion
      <SkeletonAccordion />
    </div>
  </>
);

export default SkeletonSinglePage;
