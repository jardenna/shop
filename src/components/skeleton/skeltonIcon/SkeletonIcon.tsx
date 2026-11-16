import Skeleton from '../Skeleton';
import './_skeleton-icon.scss';

type IconVariant = 'round';

const SkeletonIcon = ({ variant }: { variant?: IconVariant }) => (
  <Skeleton className={`skeleton-icon ${variant ?? ''}`} />
);

export default SkeletonIcon;
