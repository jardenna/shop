import Skeleton from './Skeleton';
import SkeletonControlList from './SkeletonControlList';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonCard = () => (
  <div className="skeleton-card">
    <Skeleton className="img" />
    <SkeletonParagraph count={1} height="2" width="18" />
    <SkeletonParagraph width="8" count={1} height="1.5" />
    <SkeletonControlList count={3} className="mini-item" />
  </div>
);

export default SkeletonCard;
