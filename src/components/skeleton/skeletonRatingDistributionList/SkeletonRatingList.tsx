import './_skeleton-rating-list.scss';
import SkeletonRatingRow from './SkeletonRatingRow';

const SkeletonRatingList = () => (
  <div className="skeleton-rating-list">
    <SkeletonRatingRow width={100} />
    <SkeletonRatingRow width={65} />
    <SkeletonRatingRow width={50} />
    <SkeletonRatingRow width={35} />
    <SkeletonRatingRow width={8} />
  </div>
);

export default SkeletonRatingList;
