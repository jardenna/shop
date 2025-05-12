import Skeleton from './Skeleton';
import SkeletonHeader from './SkeletonHeader';
import SkeletonList from './SkeletonList';
import SkeletonListGrid from './SkeletonListGrid';

const SkeletonThreeCards = () => (
  <div className="skeleton-column">
    <SkeletonHeader />
    <div className="page-card">
      <div className="flex">
        <div className="page-card flex-1">
          <div className="flex column">
            <Skeleton variant="img" />
            <div className="flex">
              <SkeletonList
                className="skeleton-paragraph skeleton-column "
                height="1.5"
                count={1}
              />
              <SkeletonList
                className="skeleton-badge "
                width="6"
                height="1.5"
                count={1}
              />
            </div>
            <SkeletonList
              height="0.8"
              count={3}
              className="skeleton-paragraph skeleton-column"
            />
            <SkeletonList count={2} height="3.5" />
          </div>
        </div>
        <div className="flex column page-card flex-1">
          <SkeletonListGrid />
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
