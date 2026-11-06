import { ReviewResponse } from '../../../../app/api/apiTypes/sharedApiTypes';
import { Language } from '../../../../types/types';
import ReviewStars from './ReviewStars';
import { getReviewAgeLabel, getStarsArray } from './reviewsUtil.';

type ReviewListProps = {
  language: Language;
  reviewList: ReviewResponse[];
};

const ReviewList = ({ reviewList, language }: ReviewListProps) => (
  <ul className="review-list">
    {reviewList.map((review, index) => (
      <li key={index} className="review-item">
        <div className="review-header">
          <ReviewStars
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
);

export default ReviewList;
