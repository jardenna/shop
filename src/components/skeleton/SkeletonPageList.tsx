import Skeleton from './Skeleton';
import SkeletonBadge from './SkeletonBadge';
import SkeletonList from './SkeletonList';
import SkeletonListGrid from './SkeletonListGrid';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonPageList = () => (
  <div className="skeleton-page-list">
    <div className="skeleton-header">
      <Skeleton width="16" height="3" className="skeleton-headline" />
      <Skeleton width="12" height="1" className="skeleton-headline" />
    </div>
    <div className="page-card">
      <div className="flex">
        <div className="page-card flex-1">
          <div className="flex column">
            <Skeleton variant="img" />
            <div className="flex">
              <SkeletonParagraph height="1.5" count={1} />
              <SkeletonBadge width="6" height="1.5" />
            </div>
            <SkeletonParagraph height="0.8" />
            <SkeletonList count={2} height="3.5" />
          </div>
        </div>
        <div className="flex column page-card flex-1">
          <SkeletonListGrid />
          <Skeleton width="5" height=".75" />
          <SkeletonList width="2" height="2" count={4} />
        </div>
        <div className="page-card flex-1" style={{ maxWidth: '25rem' }}>
          <span
            className="skeleton"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonPageList;
