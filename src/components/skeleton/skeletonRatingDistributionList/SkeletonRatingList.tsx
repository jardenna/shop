import './_skeleton-rating-list.scss';
import SkeletonRatingRow from './SkeletonRatingRow';

const ratingWidths = [100, 65, 50, 35, 8];

const SkeletonRatingList = ({
  ratingList = ratingWidths,
}: {
  ratingList?: number[];
}) => (
  <div className="rating-distribution-container skeleton-rating-list">
    {ratingList.map((rating) => (
      <SkeletonRatingRow key={rating} width={rating} />
    ))}
  </div>
);

export default SkeletonRatingList;
