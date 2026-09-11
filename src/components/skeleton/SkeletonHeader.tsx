import Skeleton from './Skeleton';

type SkeletonHeaderProps = {
  showLink?: boolean;
};

const SkeletonHeader = ({ showLink }: SkeletonHeaderProps) => (
  <div className="skeleton-header">
    <Skeleton width="20" height="1.7" />
    {showLink && <Skeleton width="12" height="1" />}
  </div>
);

export default SkeletonHeader;
