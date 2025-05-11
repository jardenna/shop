import SkeletonHeader from './SkeletonHeader';
import SkeletonInput from './SkeletonInput';
import SkeletonList from './SkeletonList';

type SkeletonPageProps = {
  className?: string;
};

const SkeletonPage = ({ className = '' }: SkeletonPageProps) => (
  <div className="skeleton-column">
    <SkeletonHeader hideLink />
    <div className="page-card">
      <div className={`skeleton-page skeleton-column  ${className}`}>
        <SkeletonInput count={2} />
        <SkeletonList />
      </div>
    </div>
  </div>
);
export default SkeletonPage;
