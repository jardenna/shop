import { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import useLanguage from '../../../language/useLanguage';
import ReviewStars from './ReviewStars';
import { getReviewAgeLabel, getStarsArray } from './reviewsUtil.';

type ReviewList = {
  reviewList: DisplyReviews[];
  title: string;
  onReset: () => void;
};

const ReviewList = ({ reviewList, title, onReset }: ReviewList) => {
  const { language } = useLanguage();

  return (
    <>
      <span>{title}</span>
      <ul className="review-list">
        {reviewList.map((review, index) => (
          <li key={index} className="review-item">
            <div className="review-header">
              <ReviewStars
                onReset={onReset}
                stars={getStarsArray(review.rating)}
                rating={review.rating}
              />
              <p className="text-small text-italic">
                {getReviewAgeLabel(review.createdAt, language)}
              </p>
            </div>
            <div className="review-content">
              <p>{review.comment}</p>
              <p>{review.name} </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReviewList;
