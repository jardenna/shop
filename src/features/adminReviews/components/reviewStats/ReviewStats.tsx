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
        Du har {reviewStats.averageRating} anmeldelser i alt
      </section>
    </div>
  );
};

export default ReviewStats;
