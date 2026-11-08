import { RatingDistribution } from '../../../../app/api/apiTypes/adminReviewApiTypes';

interface RatingDistributionListProps {
  ratingList: RatingDistribution[];
}

const RatingDistributionList = ({
  ratingList,
}: RatingDistributionListProps) => {
  const ratingDistribution = ratingList.map((item) => item.count);

  const highestCount = Math.max(...ratingDistribution);

  return (
    <ul className="rating-distribution">
      {ratingList.map((rating) => (
        <li key={rating.rating} className="rating-distribution-item">
          <span className="rating-distribution-label">{rating.rating}</span>
          <span
            className={`rating-distribution-bar star-${rating.rating}`}
            style={{ width: `${(rating.count / highestCount) * 100}%` }}
          />
          <span className="rating-distribution-count">{rating.count}</span>
        </li>
      ))}
    </ul>
  );
};

export default RatingDistributionList;
