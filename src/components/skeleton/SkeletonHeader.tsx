import Skeleton from './Skeleton';

type SkeletonHeaderProps = {
  hideLink?: boolean;
};

const SkeletonHeader = ({ hideLink }: SkeletonHeaderProps) => (
  <div className="skeleton-header">
    <Skeleton width="20" height="3" />
    {!hideLink && <Skeleton width="12" height="1" />}
  </div>
);

export default SkeletonHeader;
