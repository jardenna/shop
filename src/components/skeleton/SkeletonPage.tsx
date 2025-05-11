import SkeletonHeader from './SkeletonHeader';
import SkeletonInput from './SkeletonInput';

type SkeletonPageProps = {
  className?: string;
};

const SkeletonPage = ({ className = '' }: SkeletonPageProps) => (
  <>
    <SkeletonHeader />
    <div className="page-card">
      <div className={`skeleton-page ${className}`}>
        <SkeletonInput count={2} />
      </div>
    </div>
  </>
);
export default SkeletonPage;
