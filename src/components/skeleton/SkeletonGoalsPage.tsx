import SkeletonFooter from './SkeletonFooter';
import SkeletonTable from './skeletonTable/SkeletonTable';

const SkeletonGoalsPage = () => (
  <div className="admin-goal-form">
    <SkeletonTable rowCount={3} cellCount={4} height="4" />
    <SkeletonFooter />
  </div>
);

export default SkeletonGoalsPage;
