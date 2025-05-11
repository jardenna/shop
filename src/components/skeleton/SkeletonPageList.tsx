import Skeleton from './Skeleton';
import SkeletonBadge from './SkeletonBadge';
import SkeletonList from './SkeletonList';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonPageList = () => (
  <div className="page-card">
    <span className="card-top-line" />
    <div className="flex">
      <div className="page-card flex-1">
        <div className="flex column">
          <Skeleton width="11" height="7" />
          <div className="flex">
            <SkeletonParagraph height="1.5" count={1} />
            <SkeletonBadge width="6" height="1.5" />
          </div>
          <SkeletonParagraph height="0.8" />
          <SkeletonList count={2} height="3.5" />
        </div>
      </div>
      <div className="page-card flex-1">Center</div>
      <div className="page-card flex-1" style={{ maxWidth: '25rem' }}>
        Right
      </div>
    </div>
  </div>
);

export default SkeletonPageList;
