import type { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import './_reviews.scss';
import ReviewList from './ReviewList';
import ReviewStars from './ReviewStars';
import { getStarsArray } from './reviewsUtil.';

type ReviewsDisplayProps = {
  numOfReviews: number;
  rating: number;
  reviewList: DisplyReviews[];
};

const ReviewsDisplay = ({
  rating,
  reviewList,
  numOfReviews,
}: ReviewsDisplayProps) => (
  <div>
    <div className="review-display">
      <ReviewStars stars={getStarsArray(rating)} rating={rating} />
      <span>antal reviews {numOfReviews}</span>
    </div>
    <ReviewList reviewList={reviewList} />
    {reviewList.map((review, index) => (
      <div key={index}>
        {review.comment}
        <span>{review.rating}</span>
        <p>{review.name}</p>
      </div>
    ))}
  </div>
);

export default ReviewsDisplay;
