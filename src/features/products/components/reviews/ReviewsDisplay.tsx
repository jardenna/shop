import type { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import './_reviews.scss';
import ReviewList from './ReviewList';

type ReviewsDisplayProps = {
  numOfReviews: number;
  reviewList: DisplyReviews[];
};

const ReviewsDisplay = ({ reviewList, numOfReviews }: ReviewsDisplayProps) => (
  <div>
    <div className="review-display">
      <span>antal reviews {numOfReviews}</span>
    </div>
    <ReviewList reviewList={reviewList} />
  </div>
);

export default ReviewsDisplay;
