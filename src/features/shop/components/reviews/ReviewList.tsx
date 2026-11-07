import { ReviewResponse } from '../../../../app/api/apiTypes/shopApiTypes';
import ReviewStars from '../../../../components/ReviewStars';
import { Language } from '../../../../types/types';
import { getReviewAgeLabel } from './reviewsUtil.';

type ReviewListProps = {
  language: Language;
  reviewList: ReviewResponse[];
};

const ReviewList = ({ reviewList, language }: ReviewListProps) => (
  <ul className="review-list">
    {reviewList.map((review, index) => (
      <li key={index} className="review-item">
        <div className="review-header">
          <ReviewStars rating={review.rating} />
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
);

export default ReviewList;
