import { ReviewStatsResponse } from '../../../../app/api/apiTypes/adminReviewApiTypes';
import Cart from '../../../../components/carts/Cart';
import { useLanguage } from '../../../language/useLanguage';
import './_review-stats.scss';

interface ReviewStatsProps {
  reviewStats: ReviewStatsResponse;
}

const ReviewStats = ({ reviewStats }: ReviewStatsProps) => {
  const { language } = useLanguage();

  return (
    <section className="review-stats">
      <Cart>
        {language.averageRating}
        Du har {reviewStats.averageRating} anmeldelser i alt
      </Cart>
      <Cart>
        {language.averageRating}
        Du har {reviewStats.averageRating} anmeldelser i alt
      </Cart>
      <Cart>
        {language.averageRating}
        Du har {reviewStats.averageRating} anmeldelser i alt
      </Cart>
    </section>
  );
};

export default ReviewStats;
