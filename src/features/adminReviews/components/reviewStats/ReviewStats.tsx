import { ReviewStatsResponse } from '../../../../app/api/apiTypes/adminReviewApiTypes';
import Cart from '../../../../components/carts/Cart';
import { useLanguage } from '../../../language/useLanguage';

interface ReviewStatsProps {
  reviewStats: ReviewStatsResponse;
}

const ReviewStats = ({ reviewStats }: ReviewStatsProps) => {
  const { language } = useLanguage();
  console.log(reviewStats);

  return (
    <section className="review-stats">
      <Cart>
        {language.averageRating}
        Du har {reviewStats.averageRating} anmeldelser i alt
      </Cart>
    </section>
  );
};

export default ReviewStats;
