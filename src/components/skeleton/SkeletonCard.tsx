import SkeletonBadge from './SkeletonBadge';
import SkeletonList from './SkeletonList';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonCard = () => (
  <div className="flex column justify-space-between" style={{ height: '100%' }}>
    <div className="flex">
      <SkeletonParagraph height="1.5" count={1} />
      <SkeletonBadge />
    </div>
    <SkeletonParagraph />
    <SkeletonList />
  </div>
);

export default SkeletonCard;
