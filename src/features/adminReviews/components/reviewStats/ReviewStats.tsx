import { ErrorBoundary } from 'react-error-boundary';
import { ReviewStatsResponse } from '../../../../app/api/apiTypes/adminReviewApiTypes';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import ReviewStars from '../../../../components/ReviewStars';
import { useLanguage } from '../../../language/useLanguage';
import './_review-stats.scss';
import RatingDistributionList from './RatingDistributionList';
import ReviewStatsCard from './ReviewStatsCard';

interface ReviewStatsProps {
  reviewStats: ReviewStatsResponse;
  onReset: () => void;
}

const ReviewStats = ({ reviewStats, onReset }: ReviewStatsProps) => {
  const { language } = useLanguage();

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
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

        <section className="rating-distribution-container">
          <RatingDistributionList ratingList={reviewStats.ratingDistribution} />
        </section>
      </div>
    </ErrorBoundary>
  );
};

export default ReviewStats;
