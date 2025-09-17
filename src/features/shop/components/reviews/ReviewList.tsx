import { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import useLanguage from '../../../language/useLanguage';
import ReviewStars from './ReviewStars';
import { getDaysAgo, getStarsArray } from './reviewsUtil.';

type ReviewList = {
  reviewList: DisplyReviews[];
  title: string;
};

const ReviewList = ({ reviewList, title }: ReviewList) => {
  const { language } = useLanguage();
  return (
    <>
      <span>{title}</span>
      <ul className="review-list">
        {reviewList.map((review, index) => (
          <li key={index} className="review-item">
            <div className="review-header">
              <ReviewStars
                stars={getStarsArray(review.rating)}
                rating={review.rating}
              />
              <p className="text-small text-italic">
                {getDaysAgo(review.createdAt, language)}
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
