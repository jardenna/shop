import Skeleton from './Skeleton';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonCard = () => (
  <div className="skeleton-card">
    <Skeleton variant="img" />
    <SkeletonParagraph count={1} height="2" width="18" />
    <SkeletonParagraph width="8" count={1} height="1.5" />
    <div className="flex">
      <Skeleton count={3} width="0.75" height="0.75" />
    </div>
  </div>
);

export default SkeletonCard;
