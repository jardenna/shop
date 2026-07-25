import Skeleton from './Skeleton';
import SkeletonBadge from './SkeletonBadge';
import SkeletonBreadCrumbs from './SkeletonBreadCrumbs';
import SkeletonButton from './SkeletonButton';
import SkeletonHeader from './SkeletonHeader';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonTwoCards = () => (
  <div className="skeleton-column  page-medium">
    <SkeletonBreadCrumbs />
    <SkeletonHeader />
    <div className="page-card">
      <div className="flex">
        <div className="flex-1">
          <div
            className="column flex-justify-space-between"
            style={{ height: '100%' }}
          >
            <div className="flex">
              <SkeletonParagraph height="1.5" count={1} />
              <SkeletonBadge />
            </div>
            <SkeletonParagraph />
            <SkeletonButton />
          </div>
        </div>
        <Skeleton height="22" width="25" />
      </div>
    </div>
  </div>
);

export default SkeletonTwoCards;
