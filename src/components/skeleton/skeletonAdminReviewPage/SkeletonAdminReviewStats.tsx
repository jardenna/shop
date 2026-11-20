import type { ReactElement } from 'react';
import Skeleton from '../Skeleton';
import SkeletonHeading from '../SkeletonHeading';

const SkeletonAdminReviewStats = ({ children }: { children: ReactElement }) => (
  <div className="review-stats-card">
    <SkeletonHeading />
    <div className="review-stats-info">
      <Skeleton width="2" height="1.5" />
      {children}
    </div>
  </div>
);

export default SkeletonAdminReviewStats;
