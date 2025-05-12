import Skeleton from './Skeleton';
import SkeletonBadge from './SkeletonBadge';
import SkeletonGrid from './SkeletonGrid';
import SkeletonHeader from './SkeletonHeader';
import SkeletonList from './SkeletonList';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonThreeCards = () => (
  <div className="skeleton-column">
    <SkeletonHeader />
    <div className="page-card">
      <div className="flex">
        <div className="page-card flex-1">
          <div className="flex column">
            <Skeleton variant="img" />
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
          <Skeleton width="5" height=".75" />
          <SkeletonList width="2" height="2" count={4} />
        </div>
        <div className="page-card flex-1" style={{ maxWidth: '25rem' }}>
          <span className="skeleton" style={{ height: '100%' }} />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonThreeCards;
