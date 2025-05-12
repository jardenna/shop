import SkeletonBadge from './SkeletonBadge';
import SkeletonHeader from './SkeletonHeader';
import SkeletonList from './SkeletonList';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonTwoCards = () => (
  <div className="skeleton-column">
    <SkeletonHeader />
    <div className="page-card">
      <div className="flex">
        <div className="page-card flex-1">
          <div
            className="flex column justify-space-between"
            style={{ height: '100%' }}
          >
            <div className="flex">
              <SkeletonParagraph height="1.5" count={1} />
              <SkeletonBadge />
            </div>
            <SkeletonParagraph />
            <SkeletonList count={2} height="3.5" />
          </div>
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

export default SkeletonTwoCards;
