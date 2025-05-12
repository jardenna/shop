import SkeletonHeader from './SkeletonHeader';
import SkeletonInput from './SkeletonInput';
import SkeletonList from './SkeletonList';

type SkeletonPageProps = {
  className?: string;
  count?: number;
};

const SkeletonForm = ({ className = '', count = 2 }: SkeletonPageProps) => (
  <div className="skeleton-column">
    <SkeletonHeader hideLink />
    <div className="page-card">
      <div className={`skeleton-page skeleton-column  ${className}`}>
        <SkeletonInput count={count} />
        <SkeletonList />
      </div>
    </div>
  </div>
);
export default SkeletonForm;
