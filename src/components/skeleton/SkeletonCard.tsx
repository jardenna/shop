import Skeleton from './Skeleton';
import SkeletonParagraph from './SkeletonParagraph';
import SkeletonControlList from './TempFile';

const SkeletonCard = () => (
  <div className="skeleton-card">
    <Skeleton variant="img" />
    <SkeletonParagraph count={1} height="2" width="18" />
    <SkeletonParagraph width="8" count={1} height="1.5" />
    <SkeletonControlList count={3} variant="mini" />
  </div>
);

export default SkeletonCard;
