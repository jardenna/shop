import Skeleton from './Skeleton';

type SkeletonPageProps = {
  className?: string;
};

const SkeletonPage = ({ className = '' }: SkeletonPageProps) => (
  <div className={`skeleton-page ${className}`}>
    <Skeleton width="30" variant="secondary" />
    <Skeleton height="40" />
  </div>
);
export default SkeletonPage;
