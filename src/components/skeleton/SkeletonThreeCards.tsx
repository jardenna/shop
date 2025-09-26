import Skeleton from './Skeleton';
import SkeletonBadge from './SkeletonBadge';
import SkeletonControlList from './SkeletonControlList';
import SkeletonGrid from './SkeletonGrid';
import SkeletonHeader from './SkeletonHeader';
import SkeletonList from './SkeletonList';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonThreeCards = () => (
  <div className="skeleton-column">
    <SkeletonParagraph count={1} width="24" />
    <SkeletonHeader />
    <div className="page-card">
      <div className="flex">
        <div className="page-card flex-1">
          <div className="flex column">
            <Skeleton height="12" />
            <div className="flex">
              <SkeletonParagraph height="1.5" count={1} />
              <SkeletonBadge />
            </div>
            <SkeletonParagraph />
            <SkeletonList />
          </div>
        </div>
        <div className="flex column page-card flex-1">
          <SkeletonGrid />
          <SkeletonControlList count={4} />
          <SkeletonControlList count={5} className="medium-item" />
        </div>
        <Skeleton height="27" width="25" />
      </div>
    </div>
  </div>
);

export default SkeletonThreeCards;
