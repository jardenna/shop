import Skeleton from './Skeleton';
import SkeletonBadge from './SkeletonBadge';
import SkeletonButton from './SkeletonButton';
import SkeletonControlList from './SkeletonControlList';
import SkeletonGrid from './SkeletonGrid';
import SkeletonHeader from './SkeletonHeader';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonThreeCarts = () => (
  <div className="skeleton-column">
    <SkeletonParagraph count={1} width="24" />
    <SkeletonHeader />
    <div className="page-cart">
      <div className="flex">
        <div className="page-cart flex-1">
          <div className="flex flex-column">
            <Skeleton height="12" />
            <div className="flex">
              <SkeletonParagraph height="1.5" count={1} />
              <SkeletonBadge />
            </div>
            <SkeletonParagraph />
            <SkeletonButton />
          </div>
        </div>
        <div className="flex flex-column page-cart flex-1">
          <SkeletonGrid />
          <SkeletonControlList count={4} />
          <SkeletonControlList count={5} className="medium-item" />
        </div>
        <Skeleton height="27" width="25" />
      </div>
    </div>
  </div>
);

export default SkeletonThreeCarts;
