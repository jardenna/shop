import { ReviewStatsResponse } from '../../../../app/api/apiTypes/adminReviewApiTypes';
import ReviewStars from '../../../../components/ReviewStars';
import { useLanguage } from '../../../language/useLanguage';
import './_review-stats.scss';
import ReviewStatsCard from './ReviewStatsCard';

interface ReviewStatsProps {
  reviewStats: ReviewStatsResponse;
}

const ReviewStats = ({ reviewStats }: ReviewStatsProps) => {
  const { language } = useLanguage();

  const ratingDistribution = reviewStats.ratingDistribution.map(
    (item) => item.count,
  );

  const highestCount = Math.max(...ratingDistribution);

  return (
    <div className="review-stats-list">
      <ReviewStatsCard
        heading={language.totalReviews}
        text={reviewStats.totalReviews}
      >
        {language.reviews.toLowerCase()}
      </ReviewStatsCard>
      <ReviewStatsCard
        heading={language.averageRating}
        text={reviewStats.averageRating}
      >
        <ReviewStars rating={reviewStats.averageRating} />
      </ReviewStatsCard>

      <section className="review-stats-card">
        <ul className="rating-distribution">
          {reviewStats.ratingDistribution.map((rating) => (
            <li key={rating.rating} className="rating-distribution-item">
              <span>{rating.rating}</span>
              <span
                className="rating-distribution-bar"
                style={{ width: `${(rating.count / highestCount) * 100}%` }}
              />
              <span>{rating.count}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ReviewStats;
