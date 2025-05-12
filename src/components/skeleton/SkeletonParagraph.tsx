import { CountHeightProps } from './Skeleton';
import SkeletonList from './SkeletonList';

const SkeletonParagraph = ({ count = 3, height = '0.8' }: CountHeightProps) => (
  <SkeletonList
    className="skeleton-paragraph skeleton-column"
    height={height}
    count={count}
  />
);

export default SkeletonParagraph;
