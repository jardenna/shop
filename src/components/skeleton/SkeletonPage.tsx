import Skeleton from './Skeleton';
import SkeletonHeader from './SkeletonHeader';

type SkeletonPageProps = {
  className?: string;
  count?: number;
  height?: string;
};

const SkeletonPage = ({
  className = '',
  count = 2,
  height = '',
}: SkeletonPageProps) => (
  <div className="skeleton-column">
    <SkeletonHeader hideLink />
    <div className="page-card">
      <div className={`skeleton-page skeleton-column  ${className}`}>
        <Skeleton count={count} height={height} variant="secondary" />
      </div>
    </div>
  </div>
);
export default SkeletonPage;
