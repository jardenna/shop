import type { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import './_reviews.scss';
import ReviewList from './ReviewList';
import ReviewStars from './ReviewStars';

type ReviewsDisplayProps = {
  numOfReviews: number;
  rating: number;
  reviewList: DisplyReviews[];
};

const ReviewsDisplay = ({
  rating,
  reviewList,
  numOfReviews,
}: ReviewsDisplayProps) => {
  const stars = [...Array(5).keys()].map((star) => {
    const diff = rating - star;
    if (diff > 0.75) {
      return 'full';
    }
    if (diff >= 0.25) {
      return 'half';
    }
    return 'empty';
  });

  return (
    <div>
      <section className="review-display">
        <ReviewStars stars={stars} rating={rating} />
        <span>antal reviews {numOfReviews}</span>
      </section>
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
};

export default ReviewsDisplay;
